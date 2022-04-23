/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line react/jsx-props-no-spreading
import AuthProvider from "context/AuthProvider";
import type { AppProps } from "next/app";
import "styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Component {...pageProps} />;
        </AuthProvider>
    );
}

export default MyApp;
