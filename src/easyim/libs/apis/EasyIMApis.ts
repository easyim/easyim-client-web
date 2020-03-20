import SocketIOApi from "./SocketIOApi";
import {
    TOPIC_APP_UPSTREAM,
    TOPIC_APP_UPSTREAM_METHOD,
    TOPIC_APP_USER,
    TOPIC_APP_USER_METHOD,
    TOPIC_CONNECTION,
    TOPIC_CONNECTION_METHOD
} from "../../common/Topic";
import UserAddForm from "../../dto/form/UserAddForm";
import UserLoginForm from "../../dto/form/UserLoginForm";
import ApiCall from "./IApi";
import MessageSendForm from "../../dto/form/MessageSendForm";
import HttpApi from "./HttpApi";


export default class EasyIMApis {
    public static login: ApiCall<UserLoginForm, string> = new SocketIOApi<UserLoginForm, string>(
        TOPIC_CONNECTION.topic_name + "/" + TOPIC_CONNECTION_METHOD.AUTHORITY_REQUEST, "用户登录/请求授权", false);

    public static addUser: ApiCall<UserAddForm, void> = new SocketIOApi<UserAddForm, string>(
        TOPIC_APP_USER.topic_name + "/" + TOPIC_APP_USER_METHOD.ADD, "添加用户", true);

    // public static  sendMessage: ApiCall<MessageSendForm, void> = new HttpApi<MessageSendForm, void>(
    //     TOPIC_APP_UPSTREAM.topic_name + "/" + TOPIC_APP_UPSTREAM_METHOD.SEND,
    //     "APP跟IM用户发送消息", true);

    public static  sendMessage: ApiCall<MessageSendForm, void> = new HttpApi<MessageSendForm, void>(
        TOPIC_APP_UPSTREAM.base_uri + "/" + TOPIC_APP_UPSTREAM_METHOD.SEND,
        "APP跟IM用户发送消息", true);

    // public static listUser: ApiCall<UserAddForm, void> = new HttpApi<UserLoginForm, string>(
    //     TOPIC_APP_USER.topic_name + "/" + TOPIC_APP_USER_METHOD.USER_LIST, "获取用户列表", true);
}


