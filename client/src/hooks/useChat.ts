import { ChatContext } from "context/ChatProvider";
import { useContext } from "react";

const useChat = () => useContext(ChatContext);

export default useChat;
