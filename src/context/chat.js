import {
    createContext,
    useReducer,
} from "react";
import { CREATE_NEW_GROUP, FETCH_MY_GROUPS, FETCH_SELECTED_GROUP_CHAT } from "../Constants";

const ChatContext = createContext();

const ChatContextProvider = (props) => {

    const initialState = {
        groupId: '',
        actionType: ''
    }

    const reducerFunction = (state, action) => {

        const newState = { ...state, actionType: action.type }

        switch(action.type) {

            case CREATE_NEW_GROUP:
                return {
                    ...newState,
                    newGroupObject: action.newGroupObject,
                    uid: action.uid
                }
            
            case FETCH_MY_GROUPS:
                return {
                    ...newState,
                    uid: action.uid,
                    isFetchMyGroups: true
                }

            case FETCH_SELECTED_GROUP_CHAT:
                return {
                    ...newState,
                    groupId: action.groupId,
                    groupName: action.groupName,
                    isFetchedSelectedGroup: action.isFetchedSelectedGroup
                }

            default:
                return state;

        }
    }

    // const initialState = { isFetchSelectedGroup: true
    //     chatData: [],
    //     chatId: '',
    //     uid: '',
    //     name: ''
    // };

    // const chatReducer = (state, action) => {
    //     switch (action.type) {
    //         case true:
    //             return {
    //                 chatId: action.chatId,
    //                 uid: action.uid,
    //                 name: action.name
    //             }; 

    //         default:
    //             return state;
    //     }
    // };

    const [state, dispatch] = useReducer(reducerFunction, initialState);

    const value = { currentState: state, dispatch };

    return (
        <ChatContext.Provider value={value} {...props} />
    );
};

export { ChatContext, ChatContextProvider }
