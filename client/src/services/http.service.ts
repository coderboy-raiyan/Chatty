/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line class-methods-use-this
import axios, { AxiosInstance, AxiosResponse } from "axios";

const axiosConfig = {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
};

const instance: AxiosInstance = axios.create(axiosConfig);

class Requests {
    async get(url: string, config?: any): Promise<AxiosResponse> {
        const data = await instance.get(url, config).then((data) => data);
        return data;
    }

    async post(url: string, body: any, config?: any): Promise<AxiosResponse> {
        const data = await instance.post(url, body, config).then((data) => data);
        return data;
    }

    async put(url: string, body: any, config?: any): Promise<AxiosResponse> {
        const { data } = await instance.put(url, body, config).then((data) => data);
        return data;
    }

    async delete(url: string, config?: any): Promise<AxiosResponse> {
        const data = await instance.delete(url, config).then((data) => data);
        return data;
    }
}

const httpReq = new Requests();

export default httpReq;
