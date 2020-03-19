import fetch from "isomorphic-fetch";
import ProtocolMessage from "../../dto/protocol/ProtocolMessage";
import IApi from "./IApi";
import {easyIMSDK} from "../sdk/EasyIMSDK";
import ApiResponse from "./ApiResponse";
import Beans from "../utils";

export default class HttpApi<K extends ProtocolMessage, V> implements IApi<K,V> {
    url: string | undefined;
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

        let url = 'http://' + this.getHost() + '/' + this.url;
        let requestMethod = this.method === undefined ? 'POST' : this.method;
        // TODO: handler needAuth
        console.log(`==> [${requestMethod}] ${url} call with params:` + Beans.json(params));
        const request: any = {method: requestMethod, body: params};
        return fetch(url as string, request).then(response =>{
            return response.json();
        }).then(res =>{
            console.log(`==> [${requestMethod}] ${url} back:` + Beans.json(res));
            return Promise.resolve(res);
        });

    }

    getHost: () => string = function(){
        return easyIMSDK.getState().host;
    }
    getPort: () => number = function(){
        return 80;
    }
}
