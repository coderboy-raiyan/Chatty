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
}

const ChatsHttpReq = new ChatReq();

export default ChatsHttpReq;