/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
export const getSender = (loggedUser: any, users: any, isGroupChat: boolean) => {
    if (!isGroupChat) {
        console.log("form logic");
        const name = users?.filter((user: any) => user?.email !== loggedUser?.email);
        return name[0].name;
    }
};
