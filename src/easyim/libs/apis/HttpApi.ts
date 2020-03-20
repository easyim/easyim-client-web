import fetch from "isomorphic-fetch";
import ProtocolMessage from "../../dto/protocol/ProtocolMessage";
import IApi from "./IApi";
import {easyIMSDK} from "../sdk/EasyIMSDK";
import ApiResponse from "./ApiResponse";
import Beans from "../utils";
import ResponseMessage from "../../dto/protocol/ResponseMessage";
import R from "../../dto/protocol/R";

export default class HttpApi<K extends ProtocolMessage, V> implements IApi<K,V> {
    url: string;
    name: string | undefined;
    needAuth: boolean | undefined;
    method: string | undefined;


    constructor(url = "", name: string, needAuth?: boolean, method?:string) {
        this.url = url;
        this.name = name;
        this.needAuth = needAuth;
        this.method = method;
    }


    call(params?: K): Promise<ApiResponse<V>> {
        if(params === undefined){
            params = new ProtocolMessage() as K;
        }

        let url = 'http://' + this.getHost() + ':' +  this.getPort() +  (this.url.startsWith("/") ? this.url : "/" + this.url);
        let requestMethod = this.method === undefined ? 'POST' : this.method;
        // TODO: handler needAuth
        console.log(`==> [${requestMethod}] ${url} call with params:` + Beans.json(params));
        // const request: any = {method: requestMethod, body: params};
        const request: any = {method: requestMethod, headers:{'Content-Type':'application/json'}, body: Beans.json(params)};
        return fetch(url as string, request).then(response =>{
            return response.json();
        }).then(res =>{
            console.log(`==> [${requestMethod}] ${url} back:` + Beans.json(res));
            return Promise.resolve(this.response2ApiResponse(res));
        });

    }

    public response2ApiResponse( response: R): ApiResponse<V> {
        const apiResponse: ApiResponse<V> = new ApiResponse<V>(true);
        apiResponse.data = response.data;
        apiResponse.errorCode = response.code;
        apiResponse.errorMessage = response.msg;
        apiResponse.raw = response ? Beans.json(response) : '';

        return apiResponse;
    }


    getHost: () => string = function(){
        return easyIMSDK.getState().host;
    }
    getPort: () => number = function(){
        return easyIMSDK.getState().httpPort;
    }
}
