/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { css } from "@emotion/react";
import useAuth from "hooks/useAuth";
import useChat from "hooks/useChat";
import React, { useState } from "react";
import GridLoader from "react-spinners/GridLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
`;

function SingleChat() {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useAuth();
    const { selectedChat, setSelectedChat } = useChat();

    const sendMessages = (e: any) => {
        if (e.key === "Enter" && newMessage !== "") {
            console.log({ newMessage });
        }
    };
    const typingHandler = (e: any) => {
        setNewMessage(e.target.value);
    };

    return (
        <section>
            {loading ? (
                <div className="my-20 flex items-center justify-center">
                    <GridLoader color="#1262FF" css={override} size={40} />
                </div>
            ) : (
                <section className="bg-gray-100">
                    <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full h-[400px] overflow-y-scroll scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 ">
                        <h1 className="h-[800px]">All messages</h1>
                    </div>

                    <div className="bg-white py-4 px-4 shadow-lg">
                        <input
                            required
                            className="w-full rounded border-gray-400"
                            value={newMessage}
                            onChange={typingHandler}
                            onKeyDown={sendMessages}
                            type="text"
                            placeholder="Aa"
                        />
                    </div>
                </section>
            )}
        </section>
    );
}

export default SingleChat;
