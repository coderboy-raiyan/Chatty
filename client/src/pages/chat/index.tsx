/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import ChatsHttpReq from "pages/services/chat.service";
import React, { useEffect, useState } from "react";

function chat() {
    const [chats, setChats] = useState([]);
    useEffect(() => {
        const getAllChats = async () => {
            const getChats = await ChatsHttpReq.getChats();
            setChats(getChats);
        };
        getAllChats();
    }, []);

    return <div>chat</div>;
}

export default chat;
