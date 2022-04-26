/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import UserList from "components/UserList/UserList";
import React, { useState } from "react";
import { toast } from "react-toastify";
import AuthHttpReq from "services/auth.service";

function Sidebar({ toggleSideBar }: { toggleSideBar: boolean }) {
    const [search, setSearch] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);
    const [users, setUsers] = useState<IUser[]>([] as IUser[]);

    const handelSearch = async (): Promise<string | undefined | number> => {
        if (!search) {
            return toast.error(`Please enter something in search !!!`, {
                position: "bottom-center",
                containerId: "global",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setSearchLoading(true);

        try {
            const { data } = await AuthHttpReq.getUsers(search);
            console.log(data);
            setUsers(data);
        } catch (error: any) {
            setSearchLoading(false);
            const { message } = error.response.data;
            console.log(message);
        }
        setSearchLoading(false);

        setSearch("");
    };

    // handel accessChat
    const accessChat = (userId: string | undefined) => {
        console.log(userId);
    };

    return (
        <div
            className={`${
                toggleSideBar ? "left-0" : "-left-full"
            } fixed top-0 z-[101] h-screen bg-white  shadow-xl transition-all lg:w-[300px]`}
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
            {searchLoading
                ? "Loading"
                : users.map((user) => (
                      <div key={user._id}>
                          <UserList user={user} accessChat={() => accessChat(user._id)} />
                      </div>
                  ))}
        </div>
    );
}

export default Sidebar;
