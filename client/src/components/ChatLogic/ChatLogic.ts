/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
export const getSenderName = (loggedUser: any, users: any) => {
    if (users) {
        const name = users?.filter((user: any) => user?.email !== loggedUser?.email);
        if (name) {
            return name[0].name;
        }
        return name[1].name;
    }
};
export const getSenderImage = (loggedUser: any, users: any) => {
    if (users) {
        const name = users?.filter((user: any) => user?.email !== loggedUser?.email);
        if (name) {
            return name[0].pic;
        }
        return name[1].pic;
    }
};
