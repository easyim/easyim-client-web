
export default class Beans {
    public static to(target:any):any{
        return JSON.parse(JSON.stringify(target));
    }

    public static copy(target:any):any{
        return Beans.to(target);
    }

    public static json(target:any):any{
        return JSON.stringify(target)
    }

    public static  strEmpty(s:string):boolean{
        return !!s;
    }

    public static  strNotEmpty(s:string):boolean{
        return !s;
    }

}
