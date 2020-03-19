import {easyIMSDK, EasyIMSDK, EasyIMSDKConfig} from "./easyim/libs/sdk/EasyIMSDK";
import Logger from "./easyim/libs/log/Logger";
import Beans from "./easyim/libs/utils";

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
let port = 9091;

let loginAuid = "admin";
let loginToken = "admin";

function initEasyIMSDK(): Promise<EasyIMSDK> {
    return new Promise<EasyIMSDK>(function (resolve, reject) {
        const config:EasyIMSDKConfig = new EasyIMSDKConfig();
        config.host = host;
        config.port = port;
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

    (sdk as EasyIMSDK).getSocket().listen('topic.message', function(ack){
        console.log('topic.message ack:' + Beans.json(ack));
        appendContent('topic.message ack:' + Beans.json(ack));
    });
}





// @ts-ignore
document.getElementById("init-btn").onclick = function (e) {
    // @ts-ignore
    loginAuid = document.getElementById("auid").value;
    // @ts-ignore
    loginToken = document.getElementById("token").value;
    // @ts-ignore
    host = document.getElementById("host").value;
    // @ts-ignore
    port = document.getElementById("port").value;
    if(!loginAuid || !loginToken){
        console.error("请输入登录auid,token");
        appendContent("请输入登录auid,token");
        return;
    }

    sdkInitReceiveMessage().then((res:void)=>{
        console.log("sdk init ok");
        appendContent("sdk init ok");
    }).catch((e)=>{
        console.error(e);
    });
};

