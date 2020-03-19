import io from "socket.io-client";
import Logger from "../log/Logger";

export interface ISocket {
    connect(url: String):void;
    emit(topic: string, ...args:any[]):void
    listen(topic: string, func:(args:any) => void):void
}

class SocketIO implements ISocket{
    public socket: SocketIOClient.Socket | undefined;

    connect(url: String): void {
        this.socket = io.connect(url+"");
    }

    emit(topic: string, ...args: any[]): void {
        if(!this.socket){
            Logger.info(`socket not init yet!`);
            return;
        }
        this.socket.emit(topic, ...args);
    }

    listen(topic: string, func: (args: any) => void): void {
        if(!this.socket){
            Logger.info(`socket not init yet!`);
            return;
        }
        const self = this;
        this.socket.on(topic, function(data:any, resultObjectClz:any, callbackArg:any){
            if(callbackArg){
                self.emit('topic.clientack', callbackArg); // 使用 topic.clientack 发送回执.
            }
            func(data);
        });
    }
}

export const socket:ISocket = new SocketIO();

