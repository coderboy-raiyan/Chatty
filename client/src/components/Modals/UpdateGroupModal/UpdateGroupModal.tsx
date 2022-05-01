/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/react-in-jsx-scope */
import { Dialog, Transition } from "@headlessui/react";
import UserList from "components/UserList/UserList";
import useAuth from "hooks/useAuth";
import useToast from "hooks/useToast";
import { Fragment, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
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
    const { token } = useAuth();
    const [groupChatName, setGroupChatName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { success, info, error: errorToast } = useToast();
    const { setChats, chats } = useChat();

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
            console.log(data);
            setSearchResults(data);
        } catch (error: any) {
            const { message } = error.response.data;
            errorToast(message);
            setLoading(false);
        }
        setLoading(false);
    };

    // form submit button
    const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (groupChatName !== "" && selectedUsers.length > 0) {
            setLoading(true);
            try {
                const config = {
                    headers: {
                        Authorization: token,
                    },
                };
                const usersId = selectedUsers.map((user) => user._id);

                const grpData = {
                    name: groupChatName,
                    users: JSON.stringify(usersId),
                };
                const data = await ChatsHttpReq.createGroupChat(grpData, config);
                setChats([data, ...chats]);
                success("Group has been created successfully");
                setIsModelOpen(false);
            } catch (error: any) {
                const { message } = error.response.data;
                errorToast(message);
                setLoading(false);
            }
            setLoading(false);
        } else {
            info("Please fill the necessary fields", "top-left");
        }
    };

    // handel group add
    const handelGroupAdd = (user: any) => {
        if (selectedUsers.includes(user)) {
            errorToast("User already added", "top-left");
            return;
        }
        setSelectedUsers([...selectedUsers, user]);
    };

    // handel delete
    const handelDelete = (userId: string) => {
        const deleted = selectedUsers.filter((user) => user._id !== userId);
        setSelectedUsers(deleted);
    };

    console.log(selectedUsers);

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

                                {/* input boxes */}
                                <form onSubmit={handelSubmit} className="my-5 space-y-4">
                                    <input
                                        className="w-full rounded border-none ring-2 ring-indigo-500 focus:ring-2"
                                        type="text"
                                        value={groupChatName}
                                        onChange={(e) => setGroupChatName(e.target.value)}
                                        placeholder="Chat Name"
                                        required
                                    />
                                    <input
                                        className="w-full rounded border-none ring-2 ring-indigo-500 focus:ring-2"
                                        type="text"
                                        value={search}
                                        onChange={(e) => handelSearch(e.target.value)}
                                        placeholder="Add User here eg. Jhon"
                                    />
                                    {/* users add batch */}
                                    <div className="flex  space-x-2">
                                        {selectedUsers.map((user) => (
                                            <div
                                                className="w-46 relative rounded bg-indigo-400 px-4 py-1 text-white"
                                                key={user._id}
                                            >
                                                <p className="text-sm font-semibold">
                                                    {user.name.slice(0, 10)}
                                                </p>
                                                <span
                                                    onClick={() => handelDelete(user._id)}
                                                    className="absolute -top-3 right-1 w-3 cursor-pointer text-lg"
                                                >
                                                    <AiFillCloseCircle className="inline" />
                                                </span>
                                            </div>
                                        ))}
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
                                        className="w-full rounded bg-indigo-500 py-2 text-white"
                                        type="submit"
                                    >
                                        Create Chat
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
