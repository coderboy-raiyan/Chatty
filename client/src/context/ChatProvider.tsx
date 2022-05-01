/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-undef */
import React, { createContext, useState } from "react";

export const ChatContext = createContext<IChatContext>({} as IChatContext);

function ChatProvider({ children }: { children: React.ReactNode }) {
    const [selectedChat, setSelectedChat] = useState<any>({} as any);
    const [chats, setChats] = useState<any[]>([] as any[]);
    const [chatLoading, setChatLoading] = useState(false);

    const returnObj: IChatContext = {
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        setChatLoading,
        chatLoading,
    };

    return <ChatContext.Provider value={returnObj}>{children}</ChatContext.Provider>;
}

export default ChatProvider;
