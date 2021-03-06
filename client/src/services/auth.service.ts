/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import httpReq from "./http.service";

class AuthReq {
    async register(payload: any) {
        const { data } = await httpReq.post("/api/user/register", payload).then((data) => data);
        return data;
    }

    async login(payload: any) {
        const { data } = await httpReq.post("/api/user/login", payload).then((data) => data);
        return data;
    }

    async getUsers(search: string, config: any) {
        const { data } = await httpReq
            .get(`/api/user?search=${search}`, config)
            .then((data) => data);
        return data;
    }
}

const AuthHttpReq = new AuthReq();

export default AuthHttpReq;
