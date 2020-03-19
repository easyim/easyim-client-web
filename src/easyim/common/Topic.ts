
/**
 * @author kong <androidsimu@163.com>
 * create by 2019/2/21 9:28
 **/

export class TOPIC_ERROR{
    static topic_name = 'topic.error';
    static base_uri = 'error';
}

export class TOPIC_ERROR_METHOD{
}

export class TOPIC_CONNECTION{
    static topic_name = 'topic.connection';
    static base_uri = 'connection';
}

export class TOPIC_CONNECTION_METHOD{
    static CONNECTED = 'connection/connected';
    static DISCONNECTED = 'connection/disconnected';
    static AUTHORITY_REQUEST = 'authority/request';
}


export class TOPIC_APP_USER{
    static topic_name = 'topic.user';
    static base_uri = 'user';
}

export class TOPIC_APP_USER_METHOD{
    // static USER_ADD = 'user/add';
    static ADD = 'add';
    static UPDATE = 'update';
    static LIST = 'list';
    static UPDATE_TOKEN = 'update_token';
    static REFRESH_TOKEN = 'refresh_token';

}

export const ALL_TOPICS = [TOPIC_ERROR.name, TOPIC_CONNECTION.name, TOPIC_APP_USER.name];


