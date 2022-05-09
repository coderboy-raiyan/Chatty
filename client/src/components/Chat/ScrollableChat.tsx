/* eslint-disable react/self-closing-comp */
/* eslint-disable no-underscore-dangle */
import {
    isLastMessage,
    isSameSender,
    isSameSenderMergin,
    isSameUser,
} from "components/ChatLogic/ChatLogic";
import useAuth from "hooks/useAuth";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";

function ScrollableChat({ messages }: { messages: any[] }) {
    const { user } = useAuth();
    return (
        <ScrollableFeed>
            {messages &&
                messages.map((message: any, i) => (
                    <div className="flex  items-center" key={message._id}>
                        {(isSameSender(messages, message, i, user._id) ||
                            isLastMessage(messages, i, user._id)) && (
                            <div>
                                <img
                                    title={message.sender.name}
                                    className="h-8 w-8 rounded-full"
                                    src={message.sender.pic}
                                    alt=""
                                />
                            </div>
                        )}
                        <span
                            className={`${
                                message.sender._id === user._id
                                    ? "bg-blue-500"
                                    : "bg-gray-200 text-black"
                            } rounded-full py-2 px-3 text-[15px] text-white  ${isSameSenderMergin(
                                messages,
                                message,
                                i,
                                user._id
                            )} ${isSameUser(messages, message, i) ? "mt-3" : "mt-4"}`}
                        >
                            {message.content}
                        </span>
                    </div>
                ))}
        </ScrollableFeed>
    );
}

export default ScrollableChat;
