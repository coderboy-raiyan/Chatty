import React, { createContext } from "react";

export const ChatContext = createContext({});

function ChatProvider({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
}

export default ChatProvider;
