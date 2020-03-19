import R from "./R";

export default class ResponseMessage<T>{
    public requestId = "";// 单次请求requestId
    public response: R = R.ok();


    static failed(): ResponseMessage<any>{
        const response = new ResponseMessage();
        response.response = R.failed();
        return response;
    }

    static ok(): ResponseMessage<any>{
        const response = new ResponseMessage();
        response.response = R.ok();
        return response;
    }
}
