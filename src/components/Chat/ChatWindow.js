import Box from "@mui/material/Box";
import React from "react";
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

export default function ChatWindow() {

    const { currentState, currentChatData } = useChat();

    const { loggedInUser } = useAuthentication();

    console.log("state: ", currentChatData);

    if (!currentState || !currentChatData?.length) {

        return (
            <>
                <Box
                    sx={{
                        width: '75%',
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

                        <img src="assets/background-02.png" alt="" className="imgClass" />

                    </Box>
                </Box>
            </>
        );
    }

    return (
        <>
            <Box
                sx={{
                    width: '75%',
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
                    <Avatar
                        sx={{
                            width: 35,
                            height: 35,
                            bgcolor: '#000',
                            mr: 1
                        }}
                        alt=""
                    >
                        <PersonIcon />
                    </Avatar>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'space-around'
                        }}
                    >
                        <Typography variant="string"
                            sx={{
                                fontSize: 15,
                                color: '#ddd'
                            }}>{currentState.name}</Typography>
                        <Typography variant="string"
                            sx={{
                                fontSize: 10,
                                color: '#000'
                            }}>user of chatApp</Typography>

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
                        currentChatData.map((message) => {

                            return (
                                <>
                                    <ChatMessage isSender={message.from.uid === loggedInUser.uid} data={message} />
                                </>
                            );

                        })
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
                        size="small"
                        color="primary"
                        placeholder="Type your message here.."
                    />

                    <IconButton color="primary">
                        <SendIcon />
                    </IconButton>

                </Box>
            </Box>
        </>
    );
}