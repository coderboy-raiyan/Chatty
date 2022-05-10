/* eslint-disable react/self-closing-comp */
/* eslint-disable no-underscore-dangle */
import { isSameUser } from "components/ChatLogic/ChatLogic";
import useAuth from "hooks/useAuth";
import React from "react";
import ScrollableFeed from "react-scrollable-feed";

function ScrollableChat({ messages }: { messages: any[] }) {
    const { user } = useAuth();
    return (
        <ScrollableFeed className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full h-[400px] overflow-y-scroll px-4 py-4 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 ">
            {messages &&
                messages.map((message: any, i: any) => (
                    <div className="flex" key={message._id}>
                        <span
                            className={`${
                                message.sender._id === user._id
                                    ? " bg-blue-500"
                                    : "bg-gray-200 text-black"
                            }  rounded-full py-2 px-3 text-[15px] text-white ${
                                message.sender._id === user._id ? "ml-auto" : "ml-0"
                            } ${isSameUser(messages, message, i) ? "mt-0" : "mt-3"} mb-1`}
                        >
                            {message.content}
                        </span>
                    </div>
                ))}
        </ScrollableFeed>
    );
}

export default ScrollableChat;
