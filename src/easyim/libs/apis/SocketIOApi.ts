import ProtocolMessage from "../../dto/protocol/ProtocolMessage";
import ApiResponse from "./ApiResponse"
import RequestMessage from "../../dto/protocol/RequestMessage";
import Logger from "../log/Logger";
import ResponseMessage from "../../dto/protocol/ResponseMessage";
import UserLoginForm from "../../dto/form/UserLoginForm";
import EasyIMApis from "./EasyIMApis";
import {easyIMSDK} from "../sdk/EasyIMSDK";
import {ISocket, socket} from "../sdk/Socket";
import IApi from "./IApi";
import {jwtCache} from "../cache/jwt"
import Beans from "../utils";

const  LOG_TAG = 'SocketIOApi';
const  CONNECT_TIMEOUT_MS  = 10*1000; // apiSocket 连接超时
const  READ_TIMEOUT_MS  = 10*1000; // apiSocket 读取超时

// 缓存的数字签名
// let JWT = '';
export default class SocketIOApi<K extends ProtocolMessage, V> implements IApi<K,V> {
    public host = '';
    public needAuth = false;
    public url = '';
    public fullUrl = '';
    public name = '';
    // public method= '';
    public apiSocket: ISocket | undefined;
    public connected = false;
    // public  final Object connectLock = new Object();



    constructor(url:string, name:string, needAuth:boolean) {
        this.url = url;
        this.name = name;
        this.needAuth = needAuth;
    }

    public callUrl(fullUrl:string, params:K): Promise<ApiResponse<V>>{
        this.fullUrl = fullUrl;
        return this.call(params);
    }

    public call(params: K): Promise<ApiResponse<V>> {
        let url = "";
        // the apiSocket init by easyIM sdk
        if(!easyIMSDK.getState().socketConnected){
            throw Error("Socket not connected yet, please run easyIMSDK.init first");
        }
        if(!socket){
            throw Error("socket transport not create yet.");
        }
        this.apiSocket = socket;
        if(this.fullUrl){
            url = this.fullUrl;
        }
        else {
            this.host = this.getHost();
            url = this.url;
        }
        const request: RequestMessage<K> = this.buildRequest(url, params);
        Logger.info("==> Ready to call:["+ request.topic + "]  method:" + request.method + " with params:" + Beans.json(request.protocolMessage));
        // 使用数字签名
        if(this.needAuth && !jwtCache.jwt){
            let self = this;
            return new Promise<ApiResponse<V>>(function (resolve, reject) {
                const form = new UserLoginForm();
                form.auid = 'admin';
                form.token = 'admin';
                form.sdkid = 'TSDKTEST00001';
                const tokenResponse: Promise<ApiResponse<string>> = EasyIMApis.login.call(form);
                tokenResponse.then((res) => {
                    // resolve(res);
                    if(res.isSucceed()){
                        if(!res.data){
                            throw Error('server not return jwt yet.');
                        }
                        jwtCache.jwt = res.data!.toString();
                        // return res.data.data;
                        // re-call again
                        const apiResponse: Promise<ApiResponse<K>> = self.call(params);
                        apiResponse.then((res) => {
                            resolve(res);
                        }).catch(e => {
                            reject(e);
                        })
                    }
                    else {
                        throw Error('get jwt failed.');
                    }

                }).catch((e) =>{
                    Logger.info(`auto login failed, url=${self.url}`);
                    reject(e);
                })
            });
        }

        const self = this;
        return new Promise<ApiResponse<V>>(function(resolve, reject){
            if(!request.topic){
                return ResponseMessage.failed();
            }
            const requestId:string = request.requestId;
            request.requestId = requestId;
            let responseFetched = false;
            self.apiSocket!.emit(request.topic, request.protocolMessage, (ack:any) => {
                responseFetched = true;
                if(!ack || ack.length == 0){
                    reject(` not ack for: ${self.url}`);
                    return;
                }
                // ResponseMessage<V> responseMessage = Beans.beans(ack[0].toString(), ResponseMessage.class);
                const responseMessage:ResponseMessage<V> = Beans.to(ack);
                if(requestId !== responseMessage.requestId){
                    Logger.error(" requestId 不一致, 数据可能被篡改了.");
                }
                const apiResponse:ApiResponse<V> = self.response2ApiResponse(responseMessage);
                Logger.info("==> Ready to back:["+ request.topic + "]  method:" + request.method +
                    " raw:" + apiResponse.raw  +
                    "ERROR_MESSAGE:" + apiResponse.errorMessage +
                    " request id:" + responseMessage.requestId);
                resolve(apiResponse);
            });
            setTimeout(() => {
                if (!responseFetched) {
                    reject(`socket fetch:${self.url}   timeout.`);
                }
            }, READ_TIMEOUT_MS); // set call timeout
        });
    }

    public response2ApiResponse( responseMessage: ResponseMessage<V>): ApiResponse<V> {
        const apiResponse: ApiResponse<V> = new ApiResponse<V>(true);
        apiResponse.data = responseMessage.response.data;
        apiResponse.errorCode = responseMessage.response.code;
        apiResponse.errorMessage = responseMessage.response.msg;
        apiResponse.raw = responseMessage.response ? Beans.json(responseMessage.response) : '';

        return apiResponse;
    }


    public buildRequest(url: string, params:K ): RequestMessage<K>{
        const requestMessage:RequestMessage<K> = new RequestMessage<K>();
        requestMessage.topic = url.substring(0, url.indexOf("/"));
        requestMessage.method = url.substring(url.indexOf("/")+1);
        requestMessage.requestId = "request_" + new Date().getTime();
        params.requestId = requestMessage.requestId;
        params.timestamp = new Date().getTime();
        params.method = requestMessage.method;
        requestMessage.protocolMessage = params;
        if (this.needAuth){
            requestMessage.protocolMessage.jwt = jwtCache.jwt;
        }
        return requestMessage;
    }

    getHost: () => string = function(){
        return easyIMSDK.getState().host;
    }
    getPort: () => number = function(){
        return easyIMSDK.getState().port;;
    }
}

