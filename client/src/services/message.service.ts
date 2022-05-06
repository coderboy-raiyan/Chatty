/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
import httpReq from "./http.service";

class MessageHttp {
    async sendMessages(url: string, payload: any, config: any) {
        const { data } = await httpReq.post(url, payload, config).then((data) => data);
        return data;
    }

    async allMessages(url: string, config: any) {
        const { data } = await httpReq.get(url, config).then((data) => data);
        return data;
    }
}

const MessageHttpReq = new MessageHttp();

export default MessageHttpReq;
