/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { css } from "@emotion/react";
import useAuth from "hooks/useAuth";
import useChat from "hooks/useChat";
import useToast from "hooks/useToast";
import React, { useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import MessageHttpReq from "services/message.service";
import ScrollableChat from "./ScrollableChat";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
`;

function SingleChat() {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const { token } = useAuth();
    const { selectedChat } = useChat();
    const { error: errorHandler } = useToast();

    const fetchMessages = async () => {
        if (!selectedChat) return;
        setLoading(true);
        try {
            const config = {
                headers: {
                    authorization: token,
                },
            };

            const { data } = await MessageHttpReq.allMessages(
                `/api/messages/${selectedChat._id}`,
                config
            );
            setMessages(data);
        } catch (error: any) {
            if (error.response.data) {
                const { message } = error.response.data;
                errorHandler(message);
                console.log(message);
            }
            setLoading(false);
        }
        setLoading(false);
    };

    const sendMessages = async (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && newMessage !== "") {
            try {
                const config = {
                    "content-type": "application/json",
                    headers: {
                        authorization: token,
                    },
                };
                const { message } = await MessageHttpReq.sendMessages(
                    "/api/messages",
                    { content: newMessage, chatId: selectedChat._id },
                    config
                );

                setMessages([...messages, message]);
                setNewMessage("");
            } catch (error: any) {
                if (error.response.data) {
                    const { message } = error.response.data;
                    errorHandler(message);
                    console.log(message);
                }
            }
        }
    };

    // fetch all the messages
    useEffect(() => {
        fetchMessages();
    }, [selectedChat]);

    console.log(messages);
    const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    {/* show the messages */}
                    <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full h-[400px] overflow-y-scroll px-4 py-4 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 ">
                        <ScrollableChat messages={messages} />
                    </div>

                    {/* input field */}
                    <div className="bg-white py-4 px-4 shadow-lg">
                        <input
                            required
                            className="w-full rounded border-none shadow-xl ring-2 ring-indigo-400 focus:ring-2"
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
