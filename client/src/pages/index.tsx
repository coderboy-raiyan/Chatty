import { useRouter } from "next/router";
import React, { useEffect } from "react";

function index() {
    const router = useRouter();
    useEffect(() => {
        router.replace("/login");
    }, []);

    return <div>index</div>;
}

export default index;
