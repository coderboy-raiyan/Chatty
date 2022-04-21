/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import httpReq from "./http.service";

class AuthReq {
    async register(payload: any) {
        const { data } = await httpReq.post("/api/user/register", payload).then((data) => data);
        return data;
    }
}

const AuthHttpReq = new AuthReq();

export default AuthHttpReq;
