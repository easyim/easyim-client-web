import SocketIOApi from "./SocketIOApi";
import {TOPIC_APP_USER, TOPIC_APP_USER_METHOD, TOPIC_CONNECTION, TOPIC_CONNECTION_METHOD} from "../../common/Topic";
import UserAddForm from "../../dto/form/UserAddForm";
import UserLoginForm from "../../dto/form/UserLoginForm";
import IApi from "./IApi";


export default class EasyIMApis {
    public static login: IApi<UserLoginForm, string> = new SocketIOApi<UserLoginForm, string>(
        TOPIC_CONNECTION.topic_name + "/" + TOPIC_CONNECTION_METHOD.AUTHORITY_REQUEST, "用户登录/请求授权", false);

    public static addUser: IApi<UserAddForm, void> = new SocketIOApi<UserAddForm, string>(
        TOPIC_APP_USER.topic_name + "/" + TOPIC_APP_USER_METHOD.ADD, "添加用户", true);

    // public static listUser: IApi<UserAddForm, void> = new HttpApi<UserLoginForm, string>(
    //     TOPIC_APP_USER.topic_name + "/" + TOPIC_APP_USER_METHOD.USER_LIST, "获取用户列表", true);
}


