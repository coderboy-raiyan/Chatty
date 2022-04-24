/* eslint-disable react/require-default-props */
import useAuth from "hooks/useAuth";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

function AuthenticatedLayout({ children, title }: { children: React.ReactNode; title?: string }) {
    const router = useRouter();
    const { user } = useAuth();

    if (!user.email) {
        router.replace("/login");
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <section>{user.email ? children : null}</section>
        </>
    );
}

export default AuthenticatedLayout;
