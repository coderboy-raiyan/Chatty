import React from "react";

function Sidebar({ toggleSideBar }: { toggleSideBar: boolean }) {
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
                    placeholder="John Doe"
                    required
                />
                <button className="w-[20%] rounded bg-gray-100 font-semibold" type="button">
                    Go
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
