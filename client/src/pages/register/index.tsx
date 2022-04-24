/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import useAuth from "hooks/useAuth";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

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

    const handelLogin = async (data: IRegister): Promise<void | string | number> => {
        if (data.password.length < 6) {
            return toast.error(`Password must be at least 6 characters !!!`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        if (data.password !== data.confirmPassword) {
            return toast.error(`Invalid confirm password !!!`, {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
        <section>
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
                                type={input.type}
                                required
                                placeholder={input.placeholder}
                                {...register(`${input.key}`)}
                            />
                        </label>
                    ))}

                    <button
                        disabled={authLoading}
                        className="w-full rounded-lg bg-indigo-500 py-3 text-sm font-semibold text-white"
                        type="submit"
                    >
                        Sign Up
                    </button>
                    <p className="text-sm font-semibold">
                        Already have an account?{" "}
                        <Link href="/login">
                            <a className="text-indigo-500">Sign in</a>
                        </Link>
                    </p>
                </form>
            </div>
            <ToastContainer
                className="w-[400px]"
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </section>
    );
}

export default Register;
