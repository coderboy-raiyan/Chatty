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
    return (
        <div>
            <div className="mx-4 my-4 flex cursor-pointer items-center space-x-4 rounded-lg bg-gray-100 py-4 px-4 hover:bg-gray-200">
                {/* avatar */}
                <div>
                    <img className="h-10 w-10 rounded-full object-cover" src={user.pic} alt="" />
                </div>

                {/* user name and email */}
                <div>
                    <h1>{user.name}</h1>
                    <h1 className="text-sm font-medium text-gray-500">
                        <span className="font-semibold text-gray-800">Email</span> : {user.email}
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default UserList;
