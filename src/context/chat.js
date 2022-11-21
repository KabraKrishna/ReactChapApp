import {
    createContext,
    useReducer,
} from "react";

const ChatContext = createContext();

const ChatContextProvider = (props) => {

    const initialState = {
        chatData: [],
        chatId: '',
        uid: '',
        name: ''
    };

    const chatReducer = (state, action) => {
        switch (action.type) {
            case true:
                return {
                    chatId: action.chatId,
                    uid: action.uid,
                    name: action.name
                };

            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, initialState);

    const value = { currentState: state, dispatch };

    return (
        <ChatContext.Provider value={value} {...props} />
    );
};

export { ChatContext, ChatContextProvider }
