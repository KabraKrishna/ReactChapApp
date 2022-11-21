import React from "react";
import Box from "@mui/system/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import PersonIcon from '@mui/icons-material/Person';

export default function ChatMessage({ isSender, data }) {

    const getSenderMessage = (message) => {

        return (
            <>
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        mt: 2
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Typography variant="string"
                            sx={{
                                fontSize: 12,
                                fontWeight:'bold',
                                color: '#ddd'
                            }}>{message.from.name}</Typography>
                        <Avatar
                            sx={{
                                width: 25,
                                height: 25,
                                marginLeft: '5px',
                                bgcolor: '#000'
                            }}>
                                <PersonIcon />
                            </Avatar>



                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Box
                            sx={{
                                borderBottomLeftRadius: '8px',
                                borderBottomRightRadius: '8px',
                                borderTopLeftRadius: '8px',
                                background: '#00000098',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                textAlign: 'justify',
                                justifyContent: 'center',
                                p: 1,
                                mr: 3
                            }}
                        >
                            <Typography variant="string"
                                sx={{
                                    fontSize: 10,
                                    color: '#ddd',
                                }}> {message.message}</Typography>
                        </Box>
                    </Box>

                </Box>
            </>
        );
    }

    const getReceiverMessage = (message) => {

        return (
            <>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        mt: 2
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 25,
                                height: 25,
                                marginRight: '5px',
                                bgcolor: '#000'
                            }}>
                                <PersonIcon/>
                            </Avatar>

                        <Typography variant="string"
                            sx={{
                                fontSize: 12,
                                fontWeight:'bold',
                                color: '#111'
                            }}>{message.from.name}</Typography>

                    </Box>
                    <Box
                        sx={{
                            borderBottomLeftRadius: '8px',
                            borderBottomRightRadius: '8px',
                            borderTopRightRadius: '8px',
                            background: '#ffffff98',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            textAlign: 'justify',
                            justifyContent: 'flex-start',
                            p: 1,
                            ml: 3
                        }}
                    >
                        <Typography variant="string"
                            sx={{
                                fontSize: 10,
                                color: '#111',
                            }}>{message.message}</Typography>
                    </Box>
                </Box>
            </>
        );
    }

    return isSender ? getSenderMessage(data) : getReceiverMessage(data);
}