/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import LoadingBtn from "components/custom/LoadingBtn";
import UnAuthenticatedLayout from "components/Layouts/UnAuthenticatedLayout";
import useAuth from "hooks/useAuth";
import useToast from "hooks/useToast";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const inputs: ILoginInputs[] = [
    {
        id: "email",
        placeholder: "Enter your email address",
        key: "email",
        type: "email",
        label: "Email Address",
    },
    {
        id: "Password",
        placeholder: "Enter Password",
        key: "password",
        type: "password",
        label: "Password",
    },
];

function login() {
    const { register, handleSubmit, reset } = useForm<ILogin>();
    const { login, authLoading } = useAuth();
    const { error: errorToast } = useToast();

    const handelLogin = async (data: ILogin): Promise<void | string | number> => {
        if (data.password.length < 6) {
            errorToast("Password must be at least 6 characters");
            return;
        }

        await login(data);

        reset();
    };

    return (
        <UnAuthenticatedLayout title="Welcome Back - Chatty">
            <div
                // style={{ backgroundImage: `url("${bgImage.src}")` }}
                className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500 bg-cover bg-center bg-no-repeat px-4 py-10"
            >
                {/* header */}
                <div className="mb-6 w-full rounded-lg bg-white py-6 text-center text-3xl text-gray-700 shadow-lg lg:w-2/5">
                    <h1 className="font-medium drop-shadow-lg">Chatty</h1>
                </div>
                {/* form starts here */}
                <form
                    className="flex w-full flex-col items-center justify-center space-y-4 rounded-lg bg-white py-10 px-8 shadow-lg transition hover:shadow-2xl lg:w-2/5"
                    onSubmit={handleSubmit(handelLogin)}
                >
                    {inputs.map((input, i) => (
                        <label key={i} className="w-full" htmlFor={input.id}>
                            <p className="mb-2 text-sm font-semibold">
                                {input.label} <span className="text-red-500">*</span>
                            </p>
                            <input
                                className="w-full rounded-lg border-gray-300 py-3"
                                id={input.id}
                                type={input.type}
                                required
                                placeholder={input.placeholder}
                                {...register(`${input.key}`)}
                            />
                        </label>
                    ))}

                    {authLoading ? (
                        <LoadingBtn
                            className="mr-2  inline-flex w-full items-center justify-center rounded-lg bg-indigo-500 py-2 text-sm  font-semibold text-white"
                            text="Please wait..."
                        />
                    ) : (
                        <>
                            <button
                                disabled={authLoading}
                                className="w-full rounded-lg bg-indigo-500 py-3 text-sm font-semibold text-white"
                                type="submit"
                            >
                                Login
                            </button>
                            <button
                                disabled={authLoading}
                                className="w-full rounded-lg bg-red-500 py-3 text-sm font-semibold text-white"
                                type="button"
                            >
                                Get guest user credentials
                            </button>
                        </>
                    )}

                    <p className="text-sm font-semibold">
                        Don't have an account?{" "}
                        <Link href="/register">
                            <a className="text-indigo-500">Sign up</a>
                        </Link>
                    </p>
                </form>
            </div>
        </UnAuthenticatedLayout>
    );
}

export default login;
