/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
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

const inputs: IRegisterInputs[] = [
    {
        id: "Name",
        placeholder: "Enter your Name",
        key: "name",
        type: "text",
        label: "Name",
    },
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
    {
        id: "Confirm Password",
        placeholder: "Confirm password",
        key: "confirmPassword",
        type: "password",
        label: "Confirm Password",
    },
    {
        id: "Upload",
        key: "pic",
        type: "file",
        label: "Upload your profile picture",
    },
];

function Register() {
    const { register, handleSubmit, reset } = useForm<IRegister>();
    const { register: signUp, authLoading } = useAuth();
    const { error: errorToast } = useToast();

    const handelLogin = async (data: IRegister): Promise<void | string | number> => {
        if (data.password.length < 6) {
            errorToast("Password must be at least 6 characters");
            return;
        }

        if (data.password !== data.confirmPassword) {
            errorToast("Invalid confirm password");
            return;
        }

        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("name", data.name);
        formData.append("image", data.pic[0]);
        // console.log(data.pic[0]);

        await signUp(formData);

        reset();
    };

    return (
        <UnAuthenticatedLayout title="Welcome - Chatty">
            <div className="flex h-full flex-col items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500 bg-cover bg-center bg-no-repeat px-4 py-10">
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
                                required={input.type !== "file"}
                                type={input.type}
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
                        <button
                            disabled={authLoading}
                            className="w-full rounded-lg bg-indigo-500 py-3 text-sm font-semibold text-white"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    )}
                    <p className="text-sm font-semibold">
                        Already have an account?{" "}
                        <Link href="/login">
                            <a className="text-indigo-500">Sign in</a>
                        </Link>
                    </p>
                </form>
            </div>
        </UnAuthenticatedLayout>
    );
}

export default Register;
