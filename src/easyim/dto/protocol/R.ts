
export default class R {
    /**
     * 业务错误码
     */
    public code = 0;
    /**
     * 结果集
     */
    public data: any = {};
    /**
     * 描述
     */
    public msg = '';
    static ok(): R {
        return new R();
    }
    static failed(): R {
        const r:R = new R();
        r.code = -1;
        return r;
    }
}
