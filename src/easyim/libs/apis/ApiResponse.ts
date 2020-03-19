import R from "../../dto/protocol/R";

const HTTP_RESPONSE_FAILED = 0;
const HTTP_RESPONSE_SUCCEED = 200;
const HTTP_RESPONSE_UNAUTHORIZED = 401;
const HTTP_RESPONSE_PAGE_NOT_FOUND = 404;

export default class ApiResponse<T> {
    public responseCode = HTTP_RESPONSE_FAILED;
    public raw = '';
    public errorCode = -1;
    public errorMessage = '';
    public data: R = R.ok();

    constructor(succeed = false) {
        if(succeed){
            this.errorCode = 0;
            this.responseCode = HTTP_RESPONSE_SUCCEED;
        }
        else {
            this.errorCode = -1;
            this.responseCode = 0;
        }
    }

    public isSucceed(): boolean {
        return this.errorCode === 0 && this.responseCode === HTTP_RESPONSE_SUCCEED;
    }

    public isFailed(): boolean{
        return !this.isSucceed();
    }

}
