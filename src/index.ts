import {easyIMSDK, EasyIMSDK, EasyIMSDKConfig} from "./easyim/libs/sdk/EasyIMSDK";
import Logger from "./easyim/libs/log/Logger";
import Beans from "./easyim/libs/utils";
import {TOPIC_APP_DOWNSTREAM, TOPIC_APP_DOWNSTREAM_METHOD} from "./easyim/common/Topic";
import EasyIMApis from "./easyim/libs/apis/EasyIMApis";
import MessageSendForm from "./easyim/dto/form/MessageSendForm";
import ApiResponse from "./easyim/libs/apis/ApiResponse";

/**
 *  easyIMSDK DEMO
 * */

let str: string = '这是一个 TypeScript 编写的easyIMSDK WEB DEMO';
document.querySelectorAll('.app')[0].innerHTML = str;
console.log("run application here");

function appendContent(text: string){
    const content = document.getElementById("content");
    // @ts-ignore
    content.innerText +=  text + '\n'
}

let host = "localhost";
let socketPort = 9091;
let httpPort = 8081;


let loginAuid = "admin";
let loginToken = "admin";
let toUser = "";

function initEasyIMSDK(): Promise<EasyIMSDK> {
    return new Promise<EasyIMSDK>(function (resolve, reject) {
        const config:EasyIMSDKConfig = new EasyIMSDKConfig();
        config.host = host;
        config.socketPort = socketPort;
        config.httpPort = httpPort;
        config.key = 'TSDKTEST00001';
        config.secret = '';
        config.apiTransport = 'HTTP';
        config.loginAuid = loginAuid;
        config.loginToken = loginToken;
        easyIMSDK.init(config, function (sdk:EasyIMSDK) {
            if(sdk){
                Logger.info('easyIMSDK 成功连接, 可以使用 EasyIMApis 请求数据了.');
                appendContent('easyIMSDK 成功连接, 可以使用 EasyIMApis 请求数据了.');
                resolve(sdk);
            }
            else {
                throw Error("easyIMSDK 初始化失败");
            }

        })
    });
}

async function sdkInitReceiveMessage() {
    const sdk = await initEasyIMSDK()
        .then((sdk:EasyIMSDK) => {
            // Logger.info(`response:${JSON.stringify(msg)}`);
            return sdk;
        })
        .catch((e) => {
            Logger.error(e);
            appendContent(e);
        });

    (sdk as EasyIMSDK).getSocket().listen(TOPIC_APP_DOWNSTREAM.topic_name, function(ack){
        console.log('TOPIC_APP_DOWNSTREAM RECEIVE:' + Beans.json(ack));
        appendContent('TOPIC_APP_DOWNSTREAM RECEIVE:' + Beans.json(ack));
    });
}





// @ts-ignore
document.getElementById("init-btn").onclick = function (e) {
    // @ts-ignore
    loginAuid = document.getElementById("auid").value;
    // @ts-ignore
    loginToken = document.getElementById("token").value;
    // @ts-ignore
    toUser = document.getElementById("toUser").value;
    // @ts-ignore
    host = document.getElementById("host").value;
    // @ts-ignore
    socketPort = document.getElementById("port").value;
    if(!loginAuid || !loginToken){
        console.error("请输入登录auid,token");
        appendContent("请输入登录auid,token");
        return;
    }
    if(!toUser){
        console.error("请输入目标用户的auid");
        appendContent("请输入目标用户的auid");
        return;
    }

    sdkInitReceiveMessage().then((res:void)=>{
        console.log("sdk init ok");
        appendContent("sdk init ok");


        setInterval(()=>{
            const messageForm = new MessageSendForm();
            messageForm.body = "web_msg_" + new Date().getTime();
            messageForm.formUser = loginAuid;
            messageForm.toTarget = toUser;
            messageForm.way = "P2P";
            messageForm.type = "TEXT";

            EasyIMApis.sendMessage.call(messageForm).then((res: ApiResponse<void>) => {
                if(res.isFailed()){
                    console.log(" send message:" + messageForm.body + " failed.");
                }
            }).catch(e => {
                console.error(e);
            })
        }, 10*1000);

    }).catch((e)=>{
        console.error(e);
    });
};

