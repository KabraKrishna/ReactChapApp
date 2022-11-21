import { useEffect, useState } from "react";
import { getChatList } from "../services/firbaseChat";
import { useAuthentication } from "./useAuthentication";

export function useUserList() {

    const [userList, setUserList] = useState([]);

    const { loggedInUser } = useAuthentication();

    const uid = loggedInUser ? loggedInUser.uid : '';

    useEffect(() => {
        async function fetchData(uid) {
            const unsubscribe = await getChatList(uid);
            return unsubscribe;
        }
        fetchData(uid).then((chatList) => setUserList(chatList));
    }, [uid]);

    return { userList, setUserList };
}