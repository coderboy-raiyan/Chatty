/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-undef */
import React, { createContext, useState } from "react";

export const ChatContext = createContext<IChatContext>({} as IChatContext);

function ChatProvider({ children }: { children: React.ReactNode }) {
    const [selectedChat, setSelectedChat] = useState({});
    const [chats, setChats] = useState<any>([]);

    const returnObj: IChatContext = {
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
    };

    return <ChatContext.Provider value={returnObj}>{children}</ChatContext.Provider>;
}

export default ChatProvider;
