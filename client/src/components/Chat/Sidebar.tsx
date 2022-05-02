/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import UserList from "components/molecules/UserList/UserList";
import useAuth from "hooks/useAuth";
import useChat from "hooks/useChat";
import useToast from "hooks/useToast";
import React, { useState } from "react";
import AuthHttpReq from "services/auth.service";
import ChatsHttpReq from "services/chat.service";

function Sidebar({
    toggleSideBar,
    setToggleSideBar,
}: {
    toggleSideBar: boolean;
    setToggleSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { token } = useAuth();
    const { setSelectedChat, chats, setChats } = useChat();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<IUser[]>([] as IUser[]);
    const { error: errorToast } = useToast();

    const handelSearch = async (): Promise<string | undefined | number> => {
        if (!search) {
            errorToast("Please enter something in search");
            return;
        }
        setLoading(true);

        const config = {
            headers: {
                Authorization: token,
            },
        };

        try {
            const { data } = await AuthHttpReq.getUsers(search, config);
            setUsers(data);
        } catch (error: any) {
            setLoading(false);
            const { message } = error.response.data;
            errorToast(message);
        }
        setLoading(false);

        setSearch("");
    };

    // handel accessChat
    const accessChat = async (userId: string | undefined) => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            };
            const data: any = await ChatsHttpReq.accessChat(userId, config);

            const isAlreadyInChat = chats.find((chat: any) => chat._id === data._id);
            if (!isAlreadyInChat) {
                setChats([data, ...chats]);
            }

            console.log(data);
            setSelectedChat(data);
            setToggleSideBar(false);
        } catch (error: any) {
            setLoading(false);
            const { message } = error.response.data;
            errorToast(message);
        }
        setLoading(false);
    };

    return (
        <div
            className={`${
                toggleSideBar ? "left-0" : "-left-full"
            } fixed top-0 z-[101] h-screen overflow-y-auto bg-white  shadow-xl transition-all lg:w-[300px]`}
        >
            <h1 className="border-b py-3 px-4 text-xl font-semibold text-gray-900">Search Users</h1>

            {/* search users */}
            <div className="my-8 flex space-x-3 px-2">
                <input
                    type="text"
                    className="w-[80%] rounded border border-gray-400 text-sm"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    required
                />
                <button
                    onClick={handelSearch}
                    className="w-[20%] rounded bg-gray-100 font-semibold"
                    type="button"
                >
                    Go
                </button>
            </div>

            {/* show search results */}

            {loading
                ? "Loading"
                : users.map((user) => (
                      <UserList user={user} handelFunc={() => accessChat(user._id)} />
                  ))}

            {loading && "Chat loading..."}
        </div>
    );
}

export default Sidebar;
