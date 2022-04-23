/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-shadow */
import React, { createContext, useState } from "react";
import AuthHttpReq from "services/auth.service";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);
    const [error, setError] = useState(null);

    // login
    // const login = async (payload: any) => {
    //     setAuthLoading(true);
    //     try {
    //         const user = await AuthHttpReq.register(payload);
    //         setError(null);
    //         console.log(user);
    //         setUser(user);
    //     } catch (error: any) {
    //         const { message } = error.response.data;
    //         setError(message);
    //         setAuthLoading(false);
    //     }
    //     setAuthLoading(false);
    // };

    // register

    const register = async (payload: any) => {
        setAuthLoading(true);
        try {
            const user = await AuthHttpReq.register(payload);
            setError(null);
            console.log(user);
            setUser(user);
        } catch (error: any) {
            const { message } = error.response.data;
            setError(message);
            console.log(message);
            setAuthLoading(false);
        }
        setAuthLoading(false);
    };

    const returnObj: IAuthContext = {
        user,
        authLoading,
        error,
        register,
    };

    return (
        <AuthContext.Provider value={returnObj}>
            {loading ? "loading..." : children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
