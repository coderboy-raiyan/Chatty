/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-shadow */
import useToast from "hooks/useToast";
import React, { createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AuthHttpReq from "services/auth.service";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser>({} as IUser);
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);
    const [error, setError] = useState(null);
    const { success, error: errorToast } = useToast();

    // login
    const login = async (payload: any) => {
        setAuthLoading(true);
        try {
            const user = await AuthHttpReq.login(payload);
            setError(null);
            if (user.success) {
                localStorage.setItem("user", JSON.stringify(user.data));
                success("Logged in successfully");
            }
        } catch (error: any) {
            const { message } = error.response.data;
            setError(message);
            errorToast(message);
            setAuthLoading(false);
        }
        setAuthLoading(false);
    };

    // register

    const register = async (payload: any) => {
        setAuthLoading(true);
        try {
            const user = await AuthHttpReq.register(payload);
            setError(null);
            if (user.success) {
                localStorage.setItem("user", JSON.stringify(user.data));
                success("Registration successful");
            }
        } catch (error: any) {
            const { message } = error.response.data;
            setError(message);
            errorToast(message);
            setAuthLoading(false);
        }
        setAuthLoading(false);
    };

    // logout
    const logout = () => {
        setAuthLoading(true);
        localStorage.setItem("user", JSON.stringify({}));
        setUser({} as IUser);
        success("Logged out successfully");
        setAuthLoading(false);
    };

    // track the user
    useEffect(() => {
        const getUser: any = localStorage.getItem("user");
        if (getUser) {
            const user = JSON.parse(getUser);
            setToken(user?.token);
            setUser(user);
        } else {
            localStorage.setItem("user", JSON.stringify({}));
        }
        setLoading(false);
    }, [authLoading]);

    const returnObj: IAuthContext = {
        user,
        authLoading,
        error,
        token,
        register,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={returnObj}>
            {loading ? "loading..." : children}
            <ToastContainer
                style={{ width: "400px" }}
                enableMultiContainer
                containerId="global"
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
        </AuthContext.Provider>
    );
}

export default AuthProvider;
