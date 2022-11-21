import { getFirebaseApp } from './firebaseAuth';
import {
    doc,
    getFirestore,
    collection,
    query,
    getDoc,
    orderBy,
    getDocs,
    where,
    startAt
} from 'firebase/firestore';

const app = getFirebaseApp();
const db = getFirestore(app);

const getChatListItems = async (chatId, uid) => {

    const docRef = (await getDoc(doc(db, 'CHATS', chatId))).data();

    return docRef.users[0].uid === uid ? { ...docRef.users[1], chatId } : { ...docRef.users[0], chatId };

}

export async function getUserDetails(uid) {

    const userRef = await getDoc(doc(db, `USERS`, uid));
    const user = userRef.data();

    return {
        uid,
        name: user.name,
        email: user.email
    }
}


export async function getChatList(uid) {

    const currentUserRef = await getDoc(doc(db, `USERS`, uid));
    const currentUser = currentUserRef.data();

    const chatList = [];

    if (currentUser.myChats.length) {

        for (let index = 0; index < currentUser.myChats.length; index++) {

            const chatId = currentUser.myChats[index];

            chatList.push(await getChatListItems(chatId, uid));

        }
    }

    return chatList;

}

export async function getChat(chatId) {

    const messageList = [];

    const chatUsers = (await getDoc(doc(db, 'CHATS', chatId))).data();

    const queryRef = query(collection(db, 'CHATS', chatId, 'MESSAGES'), orderBy('timestamp', 'asc'));

    const documentSnapShot = (await getDocs(queryRef));

    documentSnapShot.forEach((doc) => {

        const element = doc.data();

        const userIds = doc.id.split("-");

        messageList.push({
            from: chatUsers.users.find((u) => u.uid === userIds[0]),
            timeStamp: new Date(element.timestamp.seconds * 1000),
            message: element.message,
            type: element.type
        });
    })

    return messageList;
}

export async function searchNewUser(param, uid) {

    const userList = [];

    const searchQuery = query(collection(db, 'USERS'), where('name', '==', param));

    const foundUsers = await getDocs(searchQuery);

    console.log(foundUsers);

    foundUsers.forEach(async (doc) => {

        const user = doc.data();
        userList.push({
            uid: user.uid,
            name: user.name,
            email: user.email
        })
    });

    return userList;
}