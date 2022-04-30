/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import httpReq from "./http.service";

class ChatReq {
    async accessChat(userId: string | undefined, config: any) {
        const { data } = await httpReq.post("/api/chat", { userId }, config).then((data) => data);
        return data;
    }

    async fetchChats(config: any) {
        const { data } = await httpReq.get("/api/chat", config).then((data) => data);
        return data;
    }

    async createGroupChat(payload: any, config: any) {
        const { data } = await httpReq
            .post("/api/chat/group", payload, config)
            .then((data) => data);
        return data;
    }
}

const ChatsHttpReq = new ChatReq();

export default ChatsHttpReq;
