import { useEffect, useState, useContext } from "react";
import { ChatContext } from "../context/chat";
import { getChat } from "../services/firbaseChat";

export function useChat() {

    const { currentState, dispatch } = useContext(ChatContext);
    const [currentChatData, setCurrentChatData] = useState([]);

    useEffect(() => {
        async function fetchData(chatId) {

            if (chatId) {
                const unsubscribe = await getChat(chatId);
                return unsubscribe;
            }
        }
        if (currentState) {
            fetchData(currentState.chatId)
                .then((chatList) => {

                    const newState = {
                        ...currentState,
                        chatData: chatList
                    }

                    dispatch(newState);
                    setCurrentChatData(chatList);

                }).catch((error) => {
                    console.log("Error in useChat: ", error);
                });
        }
    }, [currentState]);

    return { currentState, dispatch, currentChatData };
}