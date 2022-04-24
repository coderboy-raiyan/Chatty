/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import ChatsHttpReq from "services/chat.service";

function chat() {
    const [chats, setChats] = useState([]);
    useEffect(() => {
        const getAllChats = async () => {
            const getChats = await ChatsHttpReq.getChats();
            setChats(getChats);
        };
        getAllChats();
    }, []);

    console.log(chats);

    return (
        <div>
            <h1 className="my-4 text-center text-2xl">Chats</h1>
        </div>
    );
}

export default chat;
