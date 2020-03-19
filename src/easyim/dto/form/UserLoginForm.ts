import ProtocolMessage from '../protocol/ProtocolMessage';

export default class UserLoginForm extends ProtocolMessage {
    public sdkid = ""; // sdkid
    public auid = ""; // 用户登录ID
    public token = ""; // 用户登录token, 可以理解为密码
}
