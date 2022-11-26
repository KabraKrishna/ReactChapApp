import { useContext, useState } from "react";
import { ChatContext } from "../context/chat";
import { 
    createNewChatGroup, 
    getMyGroups, 
    getSelectedGroup, 
    getAllGroups,
    sendMessage,
    joinNewGroup
 } from "../services/firbaseChat";
import { useAuthentication } from "./useAuthentication";

export function useGroup() {

    const { currentState, dispatch } = useContext(ChatContext);

    const [selectedGroupData, setSelectedGroupData] = useState([]);
    const [allGroupsData, setAllGroupsData] = useState([]);
    const [myGroupsData, setMyGroupsData] = useState([]);

    const { loggedInUser } = useAuthentication();

    const uid = loggedInUser ? loggedInUser.uid : '';

    const createNewGroupFunction = async (data) => {
        await createNewChatGroup(data, uid);
    }

    const getMyGroupsFunction = async () => {
        await getMyGroups(uid, setMyGroupsData);
    }

    const getSelectedGroupFunction = async (groupId) => {
        await getSelectedGroup(groupId, setSelectedGroupData);
    }

    const getAllGroupsFunction = async () => {
        await getAllGroups(uid, setAllGroupsData);
    }

    const sendMessageFunction = async (messageObject) => {
        await sendMessage(currentState.groupId, messageObject);
    }

    const joinNewGroupFunction = async (group) => {
        await joinNewGroup(uid, loggedInUser.name, group.groupId, group.groupName)
    }

    return {
        selectedGroupData,
        allGroupsData,
        myGroupsData,
        createNewGroupFunction,
        getMyGroupsFunction,
        getSelectedGroupFunction,
        getAllGroupsFunction,
        sendMessageFunction,
        joinNewGroupFunction,
        currentState,
        dispatch
    };
}