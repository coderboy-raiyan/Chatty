/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
import { toast } from "react-toastify";

const useToast = () => {
    const success = (
        message: string,
        position?:
            | "top-right"
            | "top-center"
            | "top-left"
            | "bottom-right"
            | "bottom-center"
            | "bottom-left"
            | "top-right"
    ) => {
        toast.success(`${message}`, {
            position: `${position ? position : "bottom-center"}`,
            containerId: "global",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const error = (
        message: string,
        position?:
            | "top-right"
            | "top-center"
            | "top-left"
            | "bottom-right"
            | "bottom-center"
            | "bottom-left"
            | "top-right"
    ) => {
        toast.error(`${message} !!!`, {
            position: `${position ? position : "bottom-center"}`,
            containerId: "global",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const info = (
        message: string,
        position?:
            | "top-right"
            | "top-center"
            | "top-left"
            | "bottom-right"
            | "bottom-center"
            | "bottom-left"
            | "top-right"
    ) => {
        toast.info(`${message}`, {
            position: `${position ? position : "bottom-center"}`,
            containerId: "global",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return {
        success,
        info,
        error,
    };
};

export default useToast;
