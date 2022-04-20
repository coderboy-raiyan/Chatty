/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line class-methods-use-this
import axios, { AxiosInstance, AxiosResponse } from "axios";

const axiosConfig = {
    baseURL: "http://localhost:5000",
    timeout: 4000,
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
