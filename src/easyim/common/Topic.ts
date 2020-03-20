
/**
 * @author kong <androidsimu@163.com>
 * create by 2019/2/21 9:28
 **/
export class PREFIX{
    static topic = 'topic.';
    static http = '/v1/';
}



export class TOPIC_CONNECTION{
    static topic_name = PREFIX.topic + 'connection';
    static base_uri = PREFIX.http + 'connection';
}

export class TOPIC_CONNECTION_METHOD{
    static CONNECTED = 'connection/connected';
    static DISCONNECTED = 'connection/disconnected';
    static AUTHORITY_REQUEST = 'authority/request';
}


export class TOPIC_APP_USER{
    static topic_name = PREFIX.topic + 'user';
    static base_uri = PREFIX.http + 'user';
}

export class TOPIC_APP_USER_METHOD{
    // static USER_ADD = 'user/add';
    static ADD = 'add';
    static UPDATE = 'update';
    static LIST = 'list';
    static UPDATE_TOKEN = 'update_token';
    static REFRESH_TOKEN = 'refresh_token';

}



export class TOPIC_APP_UPSTREAM{
    static topic_name = PREFIX.topic + 'upstream_message';
    static base_uri = PREFIX.http + 'upstream_message';
}

export class TOPIC_APP_UPSTREAM_METHOD{
    // static USER_ADD = 'user/add';
    static SEND = 'send';
    static BATCH_SEND = 'batch_send';
    static SEND_ACK_TO_SERVER = 'sendack_toserver';

}

export class TOPIC_APP_DOWNSTREAM{
    static topic_name = PREFIX.topic + 'downstream_message';
    static base_uri = PREFIX.http + 'downstream_message';
}

export class TOPIC_APP_DOWNSTREAM_METHOD{
    // static USER_ADD = 'user/add';
    static SEND_MESSAGE_TO_CLIENT = 'sendmessage_toclient';
}



export const ALL_TOPICS = [TOPIC_CONNECTION.name, TOPIC_APP_USER.name];


