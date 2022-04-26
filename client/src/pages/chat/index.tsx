/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import ChatBox from "components/Chat/ChatBox";
import MyChat from "components/Chat/MyChat";
import Sidebar from "components/Chat/Sidebar";
import Header from "components/common/Header";
import Head from "next/head";
import React, { useState } from "react";

function chat() {
    const [toggleSideBar, setToggleSideBar] = useState(false);

    return (
        <>
            <Sidebar toggleSideBar={toggleSideBar} />
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    setToggleSideBar(false);
                }}
                className="h-screen bg-gray-100"
            >
                {toggleSideBar && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 z-[100] bg-[rgba(0,0,0,.3)]" />
                )}
                <Head>
                    <title>Start Chatting - Chatty</title>
                </Head>

                <Header setToggleSideBar={setToggleSideBar} />

                {/* main chats board */}
                <div>
                    <ChatBox />

                    <MyChat />
                </div>
            </div>
        </>
    );
}

export default chat;
