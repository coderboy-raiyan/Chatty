/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/react-in-jsx-scope */
import { Dialog, Transition } from "@headlessui/react";
import UserBadge from "components/molecules/UserBedge/UserBadge";
import UserList from "components/molecules/UserList/UserList";
import useAuth from "hooks/useAuth";
import useToast from "hooks/useToast";
import { Fragment, useState } from "react";
import AuthHttpReq from "services/auth.service";
import ChatsHttpReq from "services/chat.service";
import useChat from "../../../hooks/useChat";

function UpdateGroupModal({
    isModelOpen,
    setIsModelOpen,
    closeModal,
}: {
    isModelOpen: boolean;
    closeModal: () => void;
    setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { token, user } = useAuth();
    const [groupChatName, setGroupChatName] = useState("");
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const { success, error: errorToast } = useToast();
    const [searchResults, setSearchResults] = useState([]);
    const { selectedChat, setChatLoading, chatLoading, setSelectedChat } = useChat();

    const handelGroupAdd = async (selectUser: any) => {
        const isAlreadyInGroup = selectedChat.users.find((u: any) => u._id === selectUser._id);
        if (isAlreadyInGroup) {
            errorToast("User already in the group", "top-left");
            return;
        }
        const isAdmin = selectedChat.groupAdmin._id !== user._id;
        if (isAdmin) {
            errorToast("Only admin can add users", "top-left");
            return;
        }
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: token,
                },
            };

            const data = await ChatsHttpReq.addToGroup(
                { userId: selectUser._id, chatId: selectedChat._id },
                config
            );
            success("Successfully added user", "top-left");
            setChatLoading(!chatLoading);
            setSelectedChat(data);
            setIsModelOpen(false);
        } catch (error: any) {
            const { message } = error.response.data;
            errorToast(message, "top-left");
            setLoading(false);
        }
        setLoading(false);
    };

    const handelSearch = async (query: string) => {
        setSearch(query);

        if (!query) {
            errorToast("Please enter something to search", "top-left");
            return;
        }
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: token,
                },
            };

            const { data } = await AuthHttpReq.getUsers(query, config);

            setSearchResults(data);
        } catch (error: any) {
            const { message } = error.response.data;
            errorToast(message);
            setLoading(false);
        }
        setLoading(false);
    };

    const handelRename = async () => {
        if (groupChatName === "") {
            errorToast("Chat name is empty!", "top-left");
            return;
        }
        setLoading(true);
        try {
            const config = {
                "content-type": "application/json",
                headers: { Authorization: token },
            };

            const data = await ChatsHttpReq.renameGroup(
                { chatName: groupChatName, chatId: selectedChat._id },
                config
            );

            setChatLoading(!chatLoading);
            setSelectedChat(data);
            setIsModelOpen(false);
        } catch (error: any) {
            const { message } = error.response.data;
            errorToast(message, "top-left");
            setLoading(false);
        }
        setLoading(false);
    };

    const handelDelete = async (userId: string) => {
        const isExists = selectedChat.users.find((user: any) => user._id === userId);

        if (!isExists) {
            errorToast("User does not exists", "top-left");
            return;
        }
        const isAdmin = selectedChat.groupAdmin._id !== user._id;
        if (isAdmin) {
            errorToast("Only admin can remove users", "top-left");
            return;
        }
        setLoading(true);
        try {
            const config = {
                headers: {
                    Authorization: token,
                },
            };

            const data = await ChatsHttpReq.removeFromGroup(
                { userId, chatId: selectedChat._id },
                config
            );
            if (userId === user._id) {
                success("Successfully leaved the group", "top-left");
                setSelectedChat({});
            } else {
                success("Successfully removed a user", "top-left");
                setSelectedChat(data);
            }

            setChatLoading(!chatLoading);
            setIsModelOpen(false);
        } catch (error: any) {
            const { message } = error.response.data;
            errorToast(message, "top-left");
            setLoading(false);
        }
        setLoading(false);
    };

    return (
        <div>
            <Transition appear show={isModelOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay
                                className={`${isModelOpen && "bg-black opacity-30"} fixed inset-0`}
                            />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="inline-block h-screen align-middle" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="my-8 inline-block transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all lg:w-[500px]">
                                <Dialog.Title
                                    as="h3"
                                    className="text-center text-2xl font-medium leading-6 text-gray-900"
                                >
                                    Create Group Chat
                                </Dialog.Title>

                                {/* users add batch */}

                                <UserBadge
                                    handelDelete={handelDelete}
                                    users={selectedChat?.users}
                                />

                                <form className="space-y-4">
                                    <input
                                        className="w-full rounded border-none ring-2 ring-indigo-500 focus:ring-2"
                                        type="text"
                                        value={search}
                                        onChange={(e) => handelSearch(e.target.value)}
                                        placeholder="Add User here eg. Jhon"
                                    />
                                    {/* update groupName */}
                                    <div className="flex space-x-3">
                                        <input
                                            className="w-full rounded border-none ring-2 ring-indigo-500 focus:ring-2"
                                            type="text"
                                            onChange={(e) => setGroupChatName(e.target.value)}
                                            defaultValue={selectedChat.chatName}
                                            placeholder="Chat name"
                                        />
                                        <button
                                            disabled={loading}
                                            onClick={handelRename}
                                            className="rounded bg-green-500 px-4 text-white"
                                            type="button"
                                        >
                                            Update
                                        </button>
                                    </div>
                                    {/* render users */}
                                    {searchResults.length > 0 && (
                                        <div className="h-[300px] overflow-y-auto">
                                            {loading
                                                ? "loading"
                                                : searchResults.map((user: any) => (
                                                      <UserList
                                                          key={user._id}
                                                          user={user}
                                                          handelFunc={() => handelGroupAdd(user)}
                                                      />
                                                  ))}
                                        </div>
                                    )}

                                    <button
                                        className="w-full rounded bg-red-500 py-2 text-white"
                                        type="button"
                                        disabled={loading}
                                        onClick={() => handelDelete(user._id!)}
                                    >
                                        Leave
                                    </button>
                                </form>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}

export default UpdateGroupModal;
