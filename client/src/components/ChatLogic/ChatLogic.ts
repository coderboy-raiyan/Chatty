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
export const getSenderFull = (loggedUser: any, users: any) => {
    if (users) {
        const full = users?.filter((user: any) => user?.email !== loggedUser?.email);
        if (full) {
            return full[0];
        }
        return full[1];
    }
};

export const isSameSender = (messages: any[], m: any, i: any, userId: any) => {
    if (messages) {
        return (
            i < messages.length - 1 &&
            (messages[i + 1].sender._id !== m.sender._id ||
                messages[i + 1].sender._id === undefined) &&
            messages[i].sender._id !== userId
        );
    }
};

export const isLastMessage = (messages: any, i: any, userId: any) => {
    if (messages) {
        return (
            i === messages.length - 1 &&
            messages[messages.length - 1].sender._id !== userId &&
            messages[messages.length - 1].sender._id
        );
    }
};

// export const isSameSenderMergin = (messages: any, m: any, i: any, userId: any) => {
//     if (messages) {
//         // console.log(i === messages.length - 1);

//         if (
//             i < messages.length - 1 &&
//             messages[i + 1].sender._id === m.sender._id &&
//             messages[i].sender._id !== userId
//         )
//             return "ml-33";
//         if (
//             (i < messages.length - 1 &&
//                 messages[i + 1].sender._id !== m.sender._id &&
//                 messages[i].sender._id !== userId) ||
//             (i === messages.length - 1 && messages[i].sender._id !== userId)
//         )
//             return 0;
//         return "ml-auto";
//     }
// };

export const isSameUser = (messages: any, m: any, i: any) =>
    i > 0 && messages[i - 1].sender._id === m.sender._id;
