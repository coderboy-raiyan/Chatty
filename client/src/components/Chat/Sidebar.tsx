import React from "react";

function Sidebar({ toggleSideBar }: { toggleSideBar: boolean }) {
    return (
        <div
            className={`${
                toggleSideBar ? "left-0" : "-left-full"
            } fixed top-0 z-[101] h-screen bg-white  shadow-xl transition-all lg:w-[280px]`}
        >
            <h1 className="border-b py-3 px-4 text-xl font-semibold text-gray-900">Search Users</h1>
        </div>
    );
}

export default Sidebar;
