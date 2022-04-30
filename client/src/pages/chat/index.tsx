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
            <Sidebar setToggleSideBar={setToggleSideBar} toggleSideBar={toggleSideBar} />
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    setToggleSideBar(false);
                }}
                className=" bg-white"
            >
                {toggleSideBar && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 z-[100] bg-[rgba(0,0,0,.3)]" />
                )}
                <Head>
                    <title>Start Chatting - Chatty</title>
                </Head>

                <Header setToggleSideBar={setToggleSideBar} />

                {/* main chats board */}

                <div className="grid h-screen gap-x-4  lg:mx-4 lg:max-w-full lg:grid-cols-12">
                    <div className="col-span-3 border-r px-2 ">
                        <MyChat />
                    </div>

                    <div className="col-span-9">
                        <ChatBox />
                    </div>
                </div>
            </div>
        </>
    );
}

export default chat;
