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
    user: {};
    authLoading: boolean;
    error: null;
    register: (payload: any) => Promise<void>;
    login: (payload: any) => Promise<void>;
    logout: (payload: any) => void;
}
