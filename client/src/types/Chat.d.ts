/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
interface IChatContext {
    selectedChat: any;
    chats: any;
    setChats: React.Dispatch<React.SetStateAction<any>>;
    setSelectedChat: React.Dispatch<React.SetStateAction<any>>;
    setChatLoading: React.Dispatch<React.SetStateAction<boolean>>;
    chatLoading: boolean;
}
