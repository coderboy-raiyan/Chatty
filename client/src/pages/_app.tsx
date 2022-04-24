/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line react/jsx-props-no-spreading
import AuthenticatedLayout from "components/Layouts/AuthenticatedLayout";
import AuthProvider from "context/AuthProvider";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "styles/globals.css";

const noAuthRequired = ["/", "/login", "/register"];

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    return (
        <AuthProvider>
            {noAuthRequired.includes(router.pathname) ? (
                <Component {...pageProps} />
            ) : (
                <AuthenticatedLayout>
                    <Component {...pageProps} />;
                </AuthenticatedLayout>
            )}
        </AuthProvider>
    );
}

export default MyApp;
