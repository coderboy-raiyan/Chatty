/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/react-in-jsx-scope */
import { Dialog, Transition } from "@headlessui/react";
import UserList from "components/UserList/UserList";
import useAuth from "hooks/useAuth";
import useToast from "hooks/useToast";
import { Fragment, useState } from "react";
import AuthHttpReq from "services/auth.service";

function GroupChatModel({
    isModelOpen,
    closeModal,
}: {
    isModelOpen: boolean;
    closeModal: () => void;
}) {
    const { token } = useAuth();
    const [groupChatName, setGroupChatName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { success, error: errorToast } = useToast();

    const handelSearch = async (query: string) => {
        setSearch(query);

        if (!query) {
            errorToast("Please enter something to search");
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
        }
        setLoading(false);
    };

    // form submit button
    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    // handel group add
    const handelGroupAdd = (userId: string) => {
        if (selectedUsers.includes(userId)) {
            errorToast("User already added");
            return;
        }
        setSelectedUsers([...selectedUsers, userId]);
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
                                        onChange={(e) => handelSearch(e.target.value)}
                                        placeholder="Add User here eg. Jhon"
                                        required
                                    />

                                    <button
                                        className="w-full rounded bg-indigo-500 py-2 text-white"
                                        type="submit"
                                    >
                                        Create Chat
                                    </button>
                                </form>

                                {/* render users */}
                                {loading
                                    ? "loading"
                                    : searchResults
                                          .slice(0, 4)
                                          .map((user: any) => (
                                              <UserList
                                                  user={user}
                                                  handelFunc={() => handelGroupAdd(user)}
                                              />
                                          ))}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}

export default GroupChatModel;
