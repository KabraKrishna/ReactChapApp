import React from "react";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import Avatar from '@mui/material/Avatar';
import Typography from "@mui/material/Typography";
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import { useGroup } from "../../Hooks/useGroup";
import { FETCH_SELECTED_GROUP_CHAT } from "../../Constants";

export default function ListElement({ listEntry, isMyGroup }) {

    const { currentState, dispatch, joinNewGroupFunction } = useGroup();

    const handleListitemClick = (groupItem) => {

        if(!isMyGroup) return;

        dispatch({
            ...currentState,
            type: FETCH_SELECTED_GROUP_CHAT,
            groupId: groupItem.groupId,
            groupName: groupItem.groupName,
            isFetchedSelectedGroup: true
        })
    }

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
                width: 28,
                height: 28,
                bgcolor: stringToColor(inputText),
                color: '#000'
            },
            children: `${inputText.split('')[0][0].toUpperCase()}`
        }
    }

    const handleJoinGroup = async (event) => {
         
        event.preventDefault();

        await joinNewGroupFunction(listEntry);
        
    }

    if (!listEntry || !listEntry.groupId) return '';

    return (

        <>
            <ListItem
                key={listEntry.groupId}
                disablePadding
                alignItems="flex-start"

            >
                <ListItemButton sx={{ px: 0 }}
                    onClick={() => { handleListitemClick(listEntry) }}
                >
                    <Box
                        sx={{
                            width: '80%',
                            ml: 3,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <Avatar {...getIconText(listEntry.groupName)} />

                        <Box
                            sx={{
                                display: 'flex',
                                width: '75%',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                ml: 1
                            }}
                        >
                            <Typography variant="string"
                                sx={{
                                    fontSize: 15,
                                    color: '#111'
                                }}>{listEntry.groupName}</Typography>
                            {/* //{ <Typography variant="string"
                            //                        sx={{
                            //                            fontSize: 10,
                            //                            color: '#000'
                            //                        }}>{value.email}</Typography> } */}
                        </Box>

                        {
                            isMyGroup ? '' : (
                                <IconButton
                                    onClick={(e) => handleJoinGroup(e)}
                                    aria-label="Join Group" 
                                    
                                >
                                    <GroupAddRoundedIcon />
                                </IconButton>
                            )
                        }

                    </Box>
                </ListItemButton>
            </ListItem>
        </>
    );
}