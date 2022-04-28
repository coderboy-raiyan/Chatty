import { toast } from "react-toastify";

const useToast = () => {
    const success = (message: string) => {
        toast.success(`${message}`, {
            position: "bottom-center",
            containerId: "global",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const error = (message: string) => {
        toast.error(`${message} !!!`, {
            position: "bottom-center",
            containerId: "global",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const info = (message: string) => {
        toast.info(`${message}`, {
            position: "bottom-center",
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
