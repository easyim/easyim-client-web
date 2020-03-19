import ProtocolMessage from "./ProtocolMessage";

export default class RequestMessage<T extends ProtocolMessage> {
    public topic = "";
    public requestId = "";
    public method = "";
    public protocolMessage: T | any = new ProtocolMessage();
    public bodyJson = "{}";
}
