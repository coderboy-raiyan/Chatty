/* eslint-disable react/self-closing-comp */
/* eslint-disable no-underscore-dangle */
import React from "react";
import ScrollableFeed from "react-scrollable-feed";

function ScrollableChat({ messages }: { messages: any[] }) {
    return (
        <ScrollableFeed>
            {messages &&
                messages.map((message: any) => (
                    <div key={message._id}>
                        <h1>hello</h1>
                    </div>
                ))}
        </ScrollableFeed>
    );
}

export default ScrollableChat;
