/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
import useAuth from "hooks/useAuth";
import useChat from "hooks/useChat";
import React, { useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";
import ChatsHttpReq from "services/chat.service";

function MyChat() {
    const { token, user } = useAuth();
    const { selectedChat, setSelectedChat, setChats, chats } = useChat();

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: token,
                },
            };

            const data = await ChatsHttpReq.fetchChats(config);
            console.log(data);
            setChats(data);
        } catch (error: any) {
            const { message } = error.response.data;
            console.log(message);
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);

    const getSender = (loggedUser: any, users: any) =>
        users[0]._id === loggedUser._id ? users[1].name : users[0].name;

    return (
        <section>
            {/* my chat header */}
            <div className="my-4 flex justify-between">
                <h1 className="text-2xl">My chats</h1>
                <button
                    type="button"
                    className="rounded bg-gray-100 py-2 px-3 text-sm hover:bg-gray-200"
                >
                    New Group Chat <BsPlusLg className=" inline text-sm text-gray-500" />{" "}
                </button>
            </div>

            {/* chats user */}

            <div>
                {chats ? (
                    chats.map((chat: any) => (
                        <div
                            className={`${
                                selectedChat === chat ? "bg-indigo-500 text-white" : " bg-gray-100"
                            } my-3 cursor-pointer rounded px-4 py-4 transition`}
                            onClick={() => setSelectedChat(chat)}
                            key={chat._id}
                        >
                            <p>{!chat.isGroupChat ? getSender(user, chat.users) : chat.chatName}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </section>
    );
}

export default MyChat;
