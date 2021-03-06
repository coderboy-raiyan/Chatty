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
            <Head>
                <title>Start Chatting - Chatty</title>
            </Head>

            <div
                onClick={(e) => {
                    e.stopPropagation();
                    setToggleSideBar(false);
                }}
                className=" bg-white scrollbar-hide"
            >
                {toggleSideBar && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 z-[100] bg-[rgba(0,0,0,.3)]" />
                )}

                <Header setToggleSideBar={setToggleSideBar} />

                {/* main chats board */}

                <div className="grid grid-cols-12 lg:max-w-full lg:grid-cols-12">
                    <div className="col-span-2 border-r px-2  md:col-span-3 lg:col-span-3 ">
                        <MyChat />
                    </div>

                    <div className="col-span-10 md:col-span-9 lg:col-span-9">
                        <div>
                            <ChatBox />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default chat;
