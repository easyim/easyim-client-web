export default class ProtocolMessage {
    // public clientId = ''; // 长连接sessionId
    public requestId = ''; // 单次请求requestId
    public timestamp = 0; // 消息时间撮
    public method = ''; // 消息类型
    public jwt = ''; // token
}
