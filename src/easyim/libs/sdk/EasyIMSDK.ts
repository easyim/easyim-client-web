/**
 *  EasyIMSDK .
 *  config:{
 *      host: easyIM 服务器
 *      key: sdk key
 *      secret: sdk secret.
 *      apiTransport: API 通讯方式(SOCKET|HTTP)
 *  }
 *
 * */
import {ISocket, socket} from "./Socket";
import Logger from "../log/Logger";
import UserLoginForm from "../../dto/form/UserLoginForm";
import ApiResponse from "../apis/ApiResponse";
import EasyIMApis from "../apis/EasyIMApis";
import {jwtCache} from "../cache/jwt"

export class EasyIMSDKConfig {
    host:string = "";
    socketPort:number = 9091;
    httpPort:number = 80;
    key:string = "";
    secret:string = "";
    apiTransport:string = "";
    loginAuid:string = "";
    loginToken:string = "";
}


export class EasyIMSDKState extends EasyIMSDKConfig{
    socketConnected: boolean = false;
    transport: string = 'HTTP';
}

export class EasyIMSDK {


    /**
     *  EasyIMSDK .
     *  config:{
     *      host: easyIM 服务器
     *      key: sdk key
     *      secret: sdk secret.
     *      apiTransport: API 通讯方式(SOCKET|HTTP)
     *
     *  }
     *
     *  export apiSocket, http.
     * */

    config: EasyIMSDKConfig = new EasyIMSDKConfig();
    socketConnected: boolean = false;
    transport: string = 'HTTP';

    init(config:EasyIMSDKConfig, callback: (sdk:EasyIMSDK) => void): EasyIMSDK {
        const self = this;
        self.config.host = config.host ? config.host : 'localhost';
        self.config.socketPort = config.socketPort ? config.socketPort : 80;
        self.config.httpPort = config.httpPort ? config.httpPort : 80;
        self.transport = config.apiTransport ? config.apiTransport : 'HTTP';
        self.config.key = config.key;
        self.config.secret = config.secret;
        self.config.loginToken = config.loginToken;
        self.config.loginAuid = config.loginAuid;
        // TODO: verify sdk with key,secret.
        Logger.info(`ready to connect:${'http://' + self.config.host + ':' + self.config.socketPort}`);

        // handler default event for apiSocket.
        let firstInit: boolean = false;// 第一次初始化
        socket.connect('http://' + self.config.host + ':' + self.config.socketPort);
        socket.listen('connect', function(msg: any) {
            Logger.info('apiSocket.io connected!');
            self.socketConnected = true;
            if(!firstInit){
                callback(self);
                firstInit = true;
            }
            self.autoLogin(); // 连接时自动登录
        });
        socket.listen('disconnect', function(msg: any) {
            Logger.info('apiSocket.io disconnected!');
            self.socketConnected = false;
        });


        return this;
    }

    // when socket connect with the server, auto login
    public autoLogin(): void {
        if(!this.config.key || !this.config.loginAuid || !this.config.loginToken){
            return;
        }

        const form = new UserLoginForm();
        form.auid = this.config.loginAuid;
        form.token = this.config.loginToken;
        form.appKey = this.config.key;
        EasyIMApis.login.call(form).then((res:ApiResponse<string>)=>{
            Logger.info('auto Login ok');
            if(res.isSucceed()){
                if(!res.data){
                    throw Error('server not return jwt yet.');
                }
                jwtCache.jwt = res.data!.toString();
            }
            else {
                throw Error('get jwt failed.');
            }
        }).catch((e:any)=>{
            Logger.info('apiSocket.io disconnected!');
        });
    }

    public getState(): EasyIMSDKState | any{
        if(!this.config){
            throw Error('EasyIMSDK not config yet.');
        }

        //return this.config!;
        return {
            socketConnected: this.socketConnected,
            transport: this.transport,
            ...this.config
        }
    }
    public getSocket(): ISocket{
        return socket;
    }
}

export const easyIMSDK = new EasyIMSDK();


