import ProtocolMessage from "../../dto/protocol/ProtocolMessage";
import ApiResponse from "./ApiResponse";

export default interface IApi<K extends ProtocolMessage, V>  extends IHttpConfig{
    call(params: K): Promise<ApiResponse<V>>;
}
