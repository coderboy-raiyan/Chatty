/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
import { getSenderImage, getSenderName } from "components/ChatLogic/ChatLogic";
import GroupChatModel from "components/Modals/GroupChatModel/GroupChatModel";
import useAuth from "hooks/useAuth";
import useChat from "hooks/useChat";
import useToast from "hooks/useToast";
import React, { useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import ChatsHttpReq from "services/chat.service";

function MyChat() {
    const { token, user } = useAuth();
    const { selectedChat, setSelectedChat, setChats, chats, chatLoading } = useChat();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const { error: errorToast } = useToast();

    // fetch chats
    useEffect(() => {
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
                errorToast(message);
                console.log(message);
            }
        };
        fetchChats();
    }, [chatLoading, chats.length]);

    const closeModal = () => {
        setIsModelOpen(false);
    };

    return (
        <section>
            <GroupChatModel
                setIsModelOpen={setIsModelOpen}
                isModelOpen={isModelOpen}
                closeModal={closeModal}
            />
            {/* my chat header */}
            <div className="my-4 flex  justify-between">
                <h1 className="hidden text-2xl font-semibold md:inline-flex lg:inline-flex">
                    chats
                </h1>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsModelOpen(true);
                    }}
                    type="button"
                    className="hidden rounded bg-gray-100 py-2 px-3 text-sm hover:bg-gray-200 md:inline-flex lg:inline-flex"
                >
                    New Group Chat <BsPlusLg className=" inline text-sm text-gray-500" />{" "}
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsModelOpen(true);
                    }}
                    type="button"
                    className="mx-auto rounded bg-gray-100 py-2 px-3 text-sm hover:bg-gray-200 md:hidden lg:hidden "
                >
                    <BsPlusLg className=" inline text-sm text-gray-500" />{" "}
                </button>
            </div>

            {/* chats user */}

            <div className="h-[450px] overflow-y-auto scrollbar-hide">
                {chats ? (
                    chats.map((chat: any) => (
                        <div
                            className={`${
                                selectedChat === chat ? "bg-[#EAF3FF] text-gray-900" : " bg-white"
                            } my-3 cursor-pointer rounded px-2 py-4 transition hover:bg-[#F2F2F2]`}
                            onClick={() => setSelectedChat(chat)}
                            key={chat._id}
                        >
                            <div className="flex items-center space-x-2 text-ellipsis ">
                                {!chat.isGroupChat && (
                                    <img
                                        className="mx-auto flex h-12 w-12 rounded-full object-cover md:mx-0 md:h-10 md:w-10 lg:mx-0 lg:h-10 lg:w-10"
                                        src={
                                            chat.isGroupChat ? "" : getSenderImage(user, chat.users)
                                        }
                                        alt=""
                                    />
                                )}

                                <div
                                    className={`text-[15px] ${
                                        chat.isGroupChat ? "visible" : "hidden md:block lg:block"
                                    }`}
                                >
                                    <p>
                                        {chat.isGroupChat
                                            ? chat.chatName
                                            : getSenderName(user, chat.users)}
                                    </p>
                                    <p className="text-xs text-gray-500">You : Hey husky</p>
                                </div>
                            </div>
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
