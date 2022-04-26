/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";

function UserList({
    user,
    accessChat,
}: {
    user: IUser;
    accessChat: (userId: string | undefined) => void;
}) {
    return <div>UserList</div>;
}

export default UserList;
