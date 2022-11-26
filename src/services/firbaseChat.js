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
    addDoc,
    updateDoc,
    arrayUnion,
    onSnapshot,
    deleteDoc,
    serverTimestamp
} from 'firebase/firestore';
import {
    getStorage, ref, uploadBytes
} from "firebase/storage";

import { USERS_COLLECTION, GROUPS_COLLECTION, MESSAGE_COLLECTION } from "../Constants"

const app = getFirebaseApp();
const db = getFirestore(app);
const storageBucket = getStorage(app);

const getChatListItems = async (chatId, uid) => {

    const docRef = (await getDoc(doc(db, 'CHATS', chatId))).data();

    return docRef.users[0].uid === uid ? { ...docRef.users[1], chatId } : { ...docRef.users[0], chatId };

}


export async function getAllUserList(uid) {

    const userList = [];

    const dbQueryRef = query(collection(db, USERS_COLLECTION), where('uid', '!=', uid));

    const documentSnapShot = (await getDocs(dbQueryRef));

    documentSnapShot.forEach((doc) => {

        const user = doc.data();

        userList.push({
            uid: user.uid,
            name: user.name
        })
    })

    return userList;
}

export async function createNewChatGroup(groupObject, uid) {

    try {

        const dbQueryRef = query(collection(db, GROUPS_COLLECTION));

        const documentSnapShot = await addDoc(dbQueryRef, { ...groupObject, timestamp: serverTimestamp() });

        if (documentSnapShot) {

            // const messageQueryRef = query(collection(db, GROUPS_COLLECTION, documentSnapShot.id, MESSAGE_COLLECTION));

            // await addDoc(messageQueryRef, { timeStamp: serverTimestamp()});

            await updateDoc(doc(db, USERS_COLLECTION, uid), {
                myGroups: arrayUnion({
                    groupId: documentSnapShot.id,
                    groupName: groupObject.name,
                    isAdmin: true,
                    requests: []
                })
            })

            for (let index = 0; index < groupObject.members.length; index++) {

                const member = groupObject.members[index];

                await updateDoc(doc(db, USERS_COLLECTION, member.uid), {
                    myGroups: arrayUnion({
                        groupId: documentSnapShot.id,
                        groupName: groupObject.name,
                        isAdmin: false,
                        requests: []
                    })
                })

            }
        }

    } catch (error) {

        console.log("Create Group Error: ", error);
    }


}

export async function getMyGroups(uid, callback) {

    return onSnapshot(
        query(
            collection(db, USERS_COLLECTION),
            where('uid', '==', uid)
        ),
        (querySnapShot) => {

            const myGroups = [];

            querySnapShot.docs.forEach((doc) => {

                const element = doc.data();
                element.myGroups.forEach((group) => {
                    myGroups.push({
                        groupId: group.groupId,
                        groupName: group.groupName,
                        isAdmin: group.isAdmin
                    })
                })

            })

            callback(myGroups);
        }
    );
}

export async function getSelectedGroup(groupId, callback) {

    return onSnapshot(
        query(
            collection(db, GROUPS_COLLECTION, groupId, MESSAGE_COLLECTION),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {

            const messageList = querySnapshot.docs.map((x) => ({
                id: x.id,
                ...x.data(),
            }));

            callback(messageList);
        }
    );
}

export function deleteGroup(groupId) {

    const groupQueryRef = query(collection(db, GROUPS_COLLECTION, groupId));
}

export async function sendMessage(groupId, messageObject) {

    const dbQueryRef = query(collection(db, GROUPS_COLLECTION, groupId, 'MESSAGES'));

    if (messageObject.type === 0) {

        await addDoc(dbQueryRef, { ...messageObject, timestamp: serverTimestamp() });

    } else {

        const folderRef = messageObject.type === 1 ? ref(storageBucket, 'Images') : ref(storageBucket, 'Files');

        const uploadResponse = uploadBytes(folderRef, messageObject.message);

        await addDoc(dbQueryRef, { ...messageObject, timestamp: serverTimestamp() });

    }
}

export async function deleteMessage(groupId, messageId) {

    const docRef = doc(db, GROUPS_COLLECTION, groupId, 'MESSAGES', messageId);

    const resp = await deleteDoc(doc);

}

export async function getAllGroups(uid, callback) {

    return onSnapshot(
        query(collection(db, GROUPS_COLLECTION), where('admin.uid', '!=', uid)),
        (querySnapshot) => {

            const allGroupList = querySnapshot.docs.map((doc) => {

                const element = doc.data();

                let found = element.members.find((m) => m.uid === uid)

                if (!found) {
                    return {
                        groupName: element.name,
                        groupId: doc.id
                    }
                }
            });

            const filtered = allGroupList.filter((e) => e);


            console.log("In firebase all: ", filtered);

            callback(filtered);
        }
    );

}

export async function joinNewGroup(uid, name, groupId, groupName) {


    try {

        await updateDoc(doc(db, GROUPS_COLLECTION, groupId), {
            members: arrayUnion({
                name, uid
            })
        });

        await updateDoc(doc(db, USERS_COLLECTION, uid), {
            myGroups: arrayUnion({
                groupId, groupName,
                isAdmin: false,
                requests: []
            })
        })

    }catch(error){

    }

}

export async function getChatList(uid) {

    const currentUserRef = await getDoc(doc(db, USERS_COLLECTION, uid));
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

    const searchQuery = query(collection(db, USERS_COLLECTION), where('name', '==', param));

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