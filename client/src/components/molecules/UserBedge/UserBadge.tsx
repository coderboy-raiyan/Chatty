/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function UserBadge({
    users,
    handelDelete,
}: {
    users: any[];
    handelDelete?: ((userId: string) => void) | undefined | any;
}) {
    return (
        <div
            className={`${
                users?.length > 4
                    ? "flex-wrap justify-evenly space-y-2 space-x-0"
                    : "flex-nowrap space-x-4 space-y-0"
            } my-4 flex `}
        >
            {users?.map((user: any) => (
                <div
                    className="w-46 relative rounded bg-indigo-400 px-4 py-1 text-white"
                    key={user?._id}
                >
                    <p className="text-sm font-semibold">{user?.name?.slice(0, 10)}</p>
                    <span
                        onClick={() => handelDelete(user?._id)}
                        className="absolute -top-3 right-1 w-3 cursor-pointer text-lg"
                    >
                        <AiFillCloseCircle className="inline" />
                    </span>
                </div>
            ))}
        </div>
    );
}

export default UserBadge;
