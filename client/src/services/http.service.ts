/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line class-methods-use-this
import axios, { AxiosInstance, AxiosResponse } from "axios";

let token;

if (typeof window !== "undefined") {
    const getToken: any = localStorage.getItem("user");
    token = JSON.parse(getToken);
}

const axiosConfig = {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        Authorization: token ? token.token : "",
    },
};

const instance: AxiosInstance = axios.create(axiosConfig);

class Requests {
    async get(url: string): Promise<AxiosResponse> {
        const data = await instance.get(url).then((data) => data);
        return data;
    }

    async post(url: string, body: any): Promise<AxiosResponse> {
        const data = await instance.post(url, body).then((data) => data);
        return data;
    }

    async put(url: string, body: any): Promise<AxiosResponse> {
        const { data } = await instance.put(url, body).then((data) => data);
        return data;
    }

    async delete(url: string): Promise<AxiosResponse> {
        const data = await instance.delete(url).then((data) => data);
        return data;
    }
}

const httpReq = new Requests();

export default httpReq;
