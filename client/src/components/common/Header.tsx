/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import useAuth from "hooks/useAuth";
import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { MdNotifications } from "react-icons/md";

function Header({
    setToggleSideBar,
}: {
    setToggleSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { user, logout } = useAuth();
    return (
        <header className="border-b bg-white shadow">
            <div className="mx-4 py-2 md:max-w-6xl lg:mx-auto lg:max-w-7xl">
                <nav className="flex items-center justify-between space-x-4">
                    {/* user search input */}

                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            setToggleSideBar(true);
                        }}
                        className="flex cursor-pointer justify-center  rounded py-2 px-2 transition-all hover:bg-gray-100 md:w-[20%] lg:w-[20%]"
                    >
                        <button type="button" className="text-2xl">
                            <BiSearchAlt />
                        </button>
                        <input
                            className="hidden cursor-pointer border-none bg-transparent text-sm font-semibold placeholder:text-gray-900 md:inline lg:inline"
                            placeholder="Search User"
                            disabled
                            type="text"
                        />
                    </div>

                    <div className="flex w-[60%] flex-shrink-0  items-center justify-center md:w-[60%] lg:w-[60%]">
                        <img
                            className="h-16 w-48 object-cover"
                            src="https://res.cloudinary.com/dayleukzg/image/upload/v1650957053/Chatty/Modern_Blue_And_Yellow_Education_Tech_Startup_Logo_2_tdyewa.svg"
                            alt=""
                        />
                    </div>

                    <ul className="flex w-[20%] flex-shrink-0 items-center justify-end space-x-4 md:w-[20%] lg:w-[20%]">
                        <li className="text-2xl">
                            <MdNotifications />
                        </li>

                        <li onClick={logout}>
                            <div>
                                <img
                                    className="h-10 w-10  cursor-pointer rounded-full object-cover"
                                    src={user?.pic}
                                    alt=""
                                />
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
