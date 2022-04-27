/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
interface ILoginInputs {
    id: string;
    placeholder: string;
    type: string;
    key: "email" | "password";
    label: string;
}

interface ILogin {
    email: string;
    password: string;
}

interface IRegisterInputs {
    id: string;
    placeholder?: string;
    type: string;
    key: "email" | "password" | "name" | "confirmPassword" | "pic";
    label: string;
}

interface IRegister {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
    pic: string;
}

// Auth context interface

interface IAuthContext {
    user: IUser;
    authLoading: boolean;
    error: null;
    token: string;
    register: (payload: any) => Promise<void>;
    login: (payload: any) => Promise<void>;
    logout: (payload: any) => void;
}

// users value interface
interface IUser {
    _id?: string | undefined;
    email: string;
    name: string;
    pic: string;
    token: string;
}
