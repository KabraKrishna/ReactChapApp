import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import PersonIcon from '@mui/icons-material/Person';
import ChatMessage from "./ChatMessage";
import { useChat } from "../../Hooks/useChat";
import { useAuthentication } from "../../Hooks/useAuthentication";
import './ChatWindow.css';
import { useGroup } from "../../Hooks/useGroup";
//import { FETCH_SELECTED_GROUP_CHAT } from "../../Constants";

export default function ChatWindow() {

    const { selectedGroupData, currentState, getSelectedGroupFunction, sendMessageFunction } = useGroup();
    const { loggedInUser } = useAuthentication();
    const [isCallComplete, setIscallComplete] = useState(false);

    useEffect(() => {

        if (currentState.isFetchedSelectedGroup) {
            getSelectedGroupFunction(currentState.groupId).then(() => { setIscallComplete(true);})
        }

    }, [currentState])

    const stringToColor = (inpt) => {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < inpt.length; i += 1) {
            hash = inpt.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }

    const getIconText = (inputText) => {

        return {
            sx: {
                width: 35,
                height: 35,
                bgcolor: stringToColor(inputText),
                color: '#000'
            },
            children: `${inputText.split('')[0][0].toUpperCase()}`
        }
    }

    const sendMessage = async () => {

        let messageBox = document.getElementsByName('messageTextBox')[0];

        if(messageBox.value) {

            let messageObject = {
                from: {...loggedInUser},
                type: 0,
                fileURL: '',
                message: messageBox.value
            }

            await sendMessageFunction(messageObject);

            messageBox.value = '';
            
        }
    }

    if (isCallComplete || selectedGroupData.length) {

        return (
            <>
                <Box
                    sx={{
                        width: '50%',
                        heigth: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        background: '#0091',
                        borderRadius: '10px',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            minHeight: '3rem',
                            maxHeight: '3rem',
                            borderTopLeftRadius: '10px',
                            borderTopRightRadius: '10px',
                            //background: '#ee3'
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            p: 2,
                            borderBottom: '1px solid #0002'
                        }}
                    >
                        <Avatar {...getIconText(currentState.groupName)} />

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'space-around',
                                ml: 1
                            }}
                        >
                            <Typography variant="string"
                                sx={{
                                    fontSize: 15,
                                    color: '#ddd'
                                }}>{currentState.groupName}</Typography>
                            {/* <Typography variant="string"
                                sx={{
                                    fontSize: 10,
                                    color: '#000'
                                }}>Group Created On 10/11/2022</Typography> */}

                        </Box>

                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            flex: 1,
                            px: 2,
                            py: 1,
                            overflowY: 'scroll'
                            //background: '#019'
                        }}
                    >
                        {
                            selectedGroupData.length ? selectedGroupData.map((message) => {
                                return (<><ChatMessage isSender={message.from.uid === loggedInUser.uid} data={message} /></>);
                            }) : ''
                        }

                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            minHeight: '3rem',
                            maxHeight: '3rem',
                            borderBottomLeftRadius: '10px',
                            borderBottomRightRadius: '10px',
                            //background: '#e93',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            borderTop: '1px solid #0001'
                        }}
                    >
                        <OutlinedInput
                            sx={{
                                width: '90%',
                                height: '2rem',
                                fontSize: 13,
                                borderRadius: '32px'
                            }}
                            id="search-box"
                            name="messageTextBox"
                            size="small"
                            color="primary"
                            placeholder="Type your message here.."
                        />

                        <IconButton color="primary" onClick={sendMessage}>
                            <SendIcon />
                        </IconButton>

                    </Box>
                </Box>
            </>
        );
    }

    return (
        <>
            <Box
                sx={{
                    width: '50%',
                    heigth: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    background: '#0091',
                    borderRadius: '10px',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        px: 2,
                        py: 1,
                        //background: '#019'
                    }}
                >
                    <img src="assets/backgroun-02.png" alt="" className="imgClass" />

                </Box>
            </Box>
        </>
    );
}