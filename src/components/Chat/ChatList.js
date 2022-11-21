import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Typography from "@mui/material/Typography";
import { useUserList } from "../../Hooks/useUserList";
import { useChat } from "../../Hooks/useChat";
import { searchNewUser } from "../../services/firbaseChat";


export default function ChatList() {

    const { userList, setUserList } = useUserList();
    const { dispatch } = useChat();
    const [searchParam, setSearchParam] = useState('');
    const [searchedList, setSearchedList] = useState([]);

    useEffect(() => {

        async function searchUser(searchParam) {

            const foundUserList = await searchNewUser(searchParam);
            setSearchedList(foundUserList);
        }

        if (searchParam) {
            searchUser(searchParam);
        } else {
            setSearchedList([]);
        }

    }, [searchParam]);

    const handleSearchedItemClick = (searchedUser) => {

        console.log('searched: ',searchedUser);
    }

    const handleListitemClick = (chatUser) => {

        dispatch({
            type: true,
            chatId: chatUser.chatId,
            uid: chatUser.uid,
            name: chatUser.name
        })
    }

    const handleSearch = async (event) => {

        const param = event.target.value;
        param.length ? setSearchParam(param) : setSearchParam('');
    }

    return (
        <>
            <Box
                sx={{
                    width: '23%',
                    heigth: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    background: '#0091',
                    borderRadius: '10px'
                }}
            >
                <OutlinedInput
                    sx={{
                        mt: 2,
                        mx: 1,
                        borderRadius: '32px'
                    }}
                    id="search-box"
                    size="small"
                    color="primary"
                    placeholder="Search Here..."
                    startAdornment={<InputAdornment position="start">
                        <SearchIcon color="primary" />
                    </InputAdornment>}
                    onChange={(e) => { handleSearch(e) }}
                />
                {
                    searchedList.length === 0 ? '' : (
                        <List dense sx={{ width: '95%', color: '#000', borderBottom: '1px solid #0002' }}>
                            {searchedList.map((value) => {
                                return (
                                    <>
                                        <ListItem
                                            key={value.uid}
                                            disablePadding
                                            alignItems="flex-start"
                                        >
                                            <ListItemButton sx={{ px: 0 }}
                                                onClick={() => handleSearchedItemClick(value)}
                                            >
                                                <Box
                                                    sx={{
                                                        width: '100%',
                                                        mx: 1,
                                                        mt: 1,
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-evenly',
                                                    }}
                                                >
                                                    <Avatar
                                                        sx={{
                                                            width: 30,
                                                            height: 30,
                                                            bgcolor: '#000'
                                                        }}
                                                        alt={`${value.name}`}
                                                    >
                                                        <PersonIcon />
                                                    </Avatar>

                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            width: '75%',
                                                            flexDirection: 'column',
                                                            alignItems: 'flex-start',
                                                            justifyContent: 'space-between',
                                                        }}
                                                    >
                                                        <Typography variant="string"
                                                            data-chat-id={value.chatId}
                                                            sx={{
                                                                fontSize: 15,
                                                                color: '#111'
                                                            }}>{value.name}</Typography>
                                                        {/* <Typography variant="string"
                                                    sx={{
                                                        fontSize: 10,
                                                        color: '#000'
                                                    }}>{value.email}</Typography> */}
                                                    </Box>

                                                </Box>
                                            </ListItemButton>
                                        </ListItem>
                                    </>
                                );
                            })}
                        </List>
                    )
                }
                <List dense sx={{ width: '95%', color: '#000' }}>
                    {userList.map((value) => {
                        return (
                            <>
                                <ListItem
                                    key={value.uid}
                                    disablePadding
                                    alignItems="flex-start"
                                >
                                    <ListItemButton sx={{ px: 0 }}
                                        onClick={() => handleListitemClick(value)}
                                    >
                                        <Box
                                            sx={{
                                                width: '100%',
                                                mx: 1,
                                                mt: 1,
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-evenly',
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    width: 30,
                                                    height: 30,
                                                    bgcolor: '#000'
                                                }}
                                                alt={`${value.name}`}
                                            >
                                                <PersonIcon />
                                            </Avatar>

                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    width: '75%',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <Typography variant="string"
                                                    data-chat-id={value.chatId}
                                                    sx={{
                                                        fontSize: 15,
                                                        color: '#111'
                                                    }}>{value.name}</Typography>
                                                {/* <Typography variant="string"
                                                    sx={{
                                                        fontSize: 10,
                                                        color: '#000'
                                                    }}>{value.email}</Typography> */}
                                            </Box>

                                        </Box>
                                    </ListItemButton>
                                </ListItem>
                            </>
                        );
                    })}
                </List>
            </Box>
        </>
    );
}