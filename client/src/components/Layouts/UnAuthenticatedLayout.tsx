/* eslint-disable react/require-default-props */
import useAuth from "hooks/useAuth";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

function UnAuthenticatedLayout({ children, title }: { children: React.ReactNode; title?: string }) {
    const router = useRouter();
    const { user } = useAuth();

    if (user.email) {
        router.replace("/chat");
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <section>{user.email ? null : children}</section>
        </>
    );
}

export default UnAuthenticatedLayout;
