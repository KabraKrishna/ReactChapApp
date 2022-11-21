import React from "react";
import Box from "@mui/material/Box";
import './home.css';
import ChatList from "../components/Chat/ChatList";
import ChatWindow from "../components/Chat/ChatWindow";
import SideBar from "../components/Chat/SideBar";
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { IconButton, Typography } from "@mui/material";
import { useAuthentication } from '../Hooks/useAuthentication';
import { useNavigate } from "react-router-dom";

export default function Home() {

    const { loggedInUser, setLoggedInUser } = useAuthentication();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                height: '100vh',
                width: '100%',
                margin: 'auto'
            }}
            className="background-class"
        >
            <Box
                sx={{
                    width: '90%',
                    height: '7%',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>

                <Box
                    sx={{
                        width: '17%',
                        height: '85%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        borderRadius: '32px',
                        background: '#0008'

                    }}
                >
                    <img src="assets/app-logo.png" className="app-logo" alt="" />
                    <Typography variant="string"
                        sx={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#fff'
                        }}>ChatApp</Typography>

                </Box>
                <Box
                    sx={{
                        width: '25%',
                        height: '85%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >

                    <Box
                        key={loggedInUser?.uid}
                        sx={{
                            width: '80%',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            mx: 1
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 30,
                                height: 30,
                                bgcolor: '#000'
                            }}
                            alt={`${loggedInUser?.name}`}
                        >
                            <PersonIcon />
                        </Avatar>

                        <Box
                            sx={{
                                display: 'flex',
                                width: '75%',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'space-evenly',
                                mx: 1
                            }}
                        >
                            <Typography variant="string"
                                sx={{
                                    fontSize: 14,
                                    fontWeight: '700',
                                    color: '#ddd'
                                }}>{loggedInUser ? loggedInUser.name : 'Test User'}</Typography>
                            <Typography variant="string"
                                sx={{
                                    fontSize: 12,
                                    color: '#ccc'
                                }}>{loggedInUser ? loggedInUser.email : 'testemail@test.co.in'}</Typography>
                        </Box>

                    </Box>

                    <IconButton color="error" size="small" sx={{
                        mx:1,
                        background: '#fff'
                    }}
                    onClick={() => {
                        setLoggedInUser(null);
                        navigate("/login");
                    }}
                    >
                        <PowerSettingsNewIcon />
                    </IconButton>

                </Box>

            </Box>

            <Box
                sx={{
                    width: '90%',
                    height: '89%',
                    background: '#0001',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    py: 1
                }}
                className="chat-window-background"
            >
                <ChatList />
                <ChatWindow />

            </Box>

        </Box>
    );
}