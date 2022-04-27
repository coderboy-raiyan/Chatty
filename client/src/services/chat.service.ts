/* eslint-disable class-methods-use-this */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import httpReq from "./http.service";

class ChatReq {
    async getChats() {
        const {
            data: { chats },
        } = await httpReq.get("/api/chats").then((data) => data);
        return chats;
    }

    async accessChat(userId: string | undefined, config: any) {
        const { data } = await httpReq.post("/api/chat", { userId }, config).then((data) => data);
        return data;
    }

    async fetchChats(config: any) {
        const { data } = await httpReq.get("/api/chat", config).then((data) => data);
        return data;
    }
}

const ChatsHttpReq = new ChatReq();

export default ChatsHttpReq;
