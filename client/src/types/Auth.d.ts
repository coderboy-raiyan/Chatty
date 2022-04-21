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
