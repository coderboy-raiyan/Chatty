/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { css } from "@emotion/react";
import useAuth from "hooks/useAuth";
import useChat from "hooks/useChat";
import useToast from "hooks/useToast";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import GridLoader from "react-spinners/GridLoader";
import MessageHttpReq from "services/message.service";
import { io } from "socket.io-client";
import animationData from "../../animations/typing.json";
import ScrollableChat from "./ScrollableChat";

const ENDPOINT: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;
let socket: any;
let selectedCompare: any;

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
`;

const defaultOptions: any = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};

function SingleChat() {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const { token, user } = useAuth();
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
            socket.emit("join_chat", selectedChat._id);
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
            setTyping(false);
            socket.emit("stop_typing", selectedChat, user);
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
                socket.emit("new_message", message);
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

    const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);
        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat, user);
        }
        const lastTime = new Date().getTime();
        const timeLimitLength = 3000;
        setTimeout(() => {
            const currentTime = new Date().getTime();
            const timeDiff = currentTime - lastTime;

            if (timeDiff >= timeLimitLength && typing) {
                setTyping(false);
                socket.emit("stop_typing", selectedChat, user);
            }
        }, timeLimitLength);
    };

    // fetch all the messages
    useEffect(() => {
        fetchMessages();
        selectedCompare = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
        socket = io(ENDPOINT!);
        socket.emit("setup", user);
        socket.on("connection", () => {
            setSocketConnected(true);
        });
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop_typing", () => setIsTyping(false));
    }, []);

    useEffect(() => {
        socket.on("message_received", (newMessageReceived: any) => {
            if (!selectedCompare && selectedCompare._id !== newMessageReceived.chat._id) {
                // console.log("Give notification");
            } else {
                setMessages([...messages, newMessageReceived]);
            }
        });
    });

    return (
        <section>
            {loading ? (
                <div className="my-20 flex items-center justify-center">
                    <GridLoader color="#1262FF" css={override} size={40} />
                </div>
            ) : (
                <section className="bg-gray-100">
                    {/* show the messages */}
                    <div className="h-[390px]">
                        <ScrollableChat messages={messages} />
                    </div>

                    {/* input field */}
                    {isTyping && (
                        <div className=" w-10">
                            <Lottie
                                options={defaultOptions}
                                width={70}
                                style={{ height: "40px" }}
                            />
                        </div>
                    )}
                    <div className="bg-white py-4 px-4 ">
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
