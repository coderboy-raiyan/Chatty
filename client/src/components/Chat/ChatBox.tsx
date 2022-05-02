/* eslint-disable jsx-a11y/control-has-associated-label */
import { getSenderImage, getSenderName } from "components/ChatLogic/ChatLogic";
import UpdateGroupModal from "components/Modals/UpdateGroupModal/UpdateGroupModal";
import useAuth from "hooks/useAuth";
import useChat from "hooks/useChat";
import React, { useState } from "react";
import { BsFillCameraVideoFill, BsFillTelephoneFill, BsInfoCircleFill } from "react-icons/bs";
import SingleChat from "./SingleChat";

function ChatBox() {
    const { selectedChat } = useChat();
    const { user } = useAuth();
    const [isModelOpen, setIsModelOpen] = useState(false);

    const closeModal = () => {
        setIsModelOpen(false);
    };

    console.log(selectedChat);
    return (
        <div>
            <UpdateGroupModal
                closeModal={closeModal}
                isModelOpen={isModelOpen}
                setIsModelOpen={setIsModelOpen}
            />
            {/* chat head */}
            {selectedChat?.chatName && (
                <div className="flex items-center justify-between border-b bg-white py-4 px-4 shadow-sm">
                    <div className="flex space-x-2 ">
                        {!selectedChat.isGroupChat && (
                            <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={
                                    selectedChat.isGroupChat
                                        ? ""
                                        : getSenderImage(user, selectedChat.users)
                                }
                                alt=""
                            />
                        )}
                        <h1 className="text-lg font-semibold">
                            {selectedChat.isGroupChat
                                ? selectedChat.chatName
                                : getSenderName(user, selectedChat.users)}
                        </h1>
                    </div>

                    <div className="space-x-2">
                        <button
                            type="button"
                            className="rounded-full px-2 py-2 text-xl text-indigo-500 hover:bg-gray-100"
                        >
                            <BsFillTelephoneFill />
                        </button>
                        <button
                            type="button"
                            className="rounded-full  px-2 py-2 text-xl text-indigo-500 hover:bg-gray-100"
                        >
                            <BsFillCameraVideoFill />
                        </button>
                        {selectedChat.isGroupChat && (
                            <button
                                onClick={() => setIsModelOpen(true)}
                                type="button"
                                className="rounded-full  px-2 py-2 text-xl text-indigo-500 hover:bg-gray-100"
                            >
                                <BsInfoCircleFill />
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* chat body */}
            <div>
                {selectedChat.chatName ? (
                    <SingleChat selectedChat={selectedChat} />
                ) : (
                    <div className="my-20 flex h-screen justify-center">
                        <h1 className="text-xl font-semibold text-gray-400 lg:text-2xl">
                            Click on a user and Start chatting
                        </h1>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatBox;
