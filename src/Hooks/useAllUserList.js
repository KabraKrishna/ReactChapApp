import { useEffect, useState } from "react";
import { getAllUserList } from "../services/firbaseChat";
import { useAuthentication } from "./useAuthentication";

export function useAllUserList() {

    const [allUserList, setAllUserList] = useState([]);

    const { loggedInUser } = useAuthentication();

    const uid = loggedInUser ? loggedInUser.uid : '';

    useEffect(() => {
        async function fetchData(uid) {
            const unsubscribe = await getAllUserList(uid);
            return unsubscribe;
        }
        fetchData(uid).then((chatList) => setAllUserList(chatList));
    }, [uid]);

    return { allUserList, setAllUserList };
}