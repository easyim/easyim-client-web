import ProtocolMessage from "../protocol/ProtocolMessage";

export default class MessageSendForm extends ProtocolMessage {
    public  formUser = ""; // 用户auid
    public  toTarget = ""; // 用户auid/ 群uid
    public  way = "";// 消息发送方式(P2P:点对点;P2G:点对多)
    public  type = "";//TEXT,IMAGE,AUDIO,VIDEO,POSITION,FILE,NOTIFY,CUSTOM
    public  body = "";//消息体,json格式
    public  msgOption = "";//消息选项设置
    public  at_users = "";//消息要AT的用户,json 数组格式
}
