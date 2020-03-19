import ProtocolMessage from '../protocol/ProtocolMessage';

export default class UserAddForm extends ProtocolMessage {
    public auid = ""; // 要添加的用户uid
    public name = ""; // 账号昵称
    public avatar = ""; // 用户头像
    public token = ""; // 用户登录token
    public sign = ""; // 用户签名
    public email = ""; // 用户email
    public birth = ""; // 用户生日
    public mobile = ""; // 用户mobile
    public gender = 0; // 用户性别，0表示未知，1表示男，2女表示女
    public ex = ""; // 用户扩展字段
}
