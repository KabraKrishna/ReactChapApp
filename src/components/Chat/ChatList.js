import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import StarsIcon from '@mui/icons-material/Stars';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import ListElement from "./ListElement";
import { useGroup } from "../../Hooks/useGroup";


export default function ChatList() {

    const { myGroupsData, getMyGroupsFunction, allGroupsData, getAllGroupsFunction } = useGroup();
    const [isListExpanded, setIsListExpanded] = useState({ listOne: false, listTwo: false });

    useEffect(() => {

        if (isListExpanded.listOne) getMyGroupsFunction().then(() => {  });
        if (isListExpanded.listTwo) getAllGroupsFunction().then(() => {  });

    }, [isListExpanded, getMyGroupsFunction, getAllGroupsFunction])

    const handleExpand = (clickedItem) => {

        const updatedState = {
            ...isListExpanded,
            listOne: clickedItem === 1 ? !isListExpanded.listOne : isListExpanded.listOne ? false : isListExpanded.listOne,
            listTwo: clickedItem === 2 ? !isListExpanded.listTwo : isListExpanded.listTwo ? false : isListExpanded.listTwo
        }

        setIsListExpanded(updatedState);
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

                <List dense sx={{ width: '95%', color: '#000' }}>
                    <ListItemButton onClick={() => { handleExpand(1); }} >
                        <ListItemIcon>
                            <StarsIcon />
                        </ListItemIcon>
                        <ListItemText primary="My Groups" />
                        {isListExpanded.listOne ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={isListExpanded.listOne} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {myGroupsData.length ? myGroupsData.map((value) => {
                                return (<><ListElement listEntry={value} isMyGroup={true} /></>);
                            }) : ''}
                        </List>
                    </Collapse>

                    <ListItemButton onClick={() => { handleExpand(2); }} sx={{ borderTop: '1px solid #0002' }}>
                        <ListItemIcon>
                            <PeopleAltRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="All Groups" />
                        {isListExpanded.listTwo ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={isListExpanded.listTwo} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {allGroupsData.length ? allGroupsData.map((value) => {
                                return (<><ListElement listEntry={value} isMyGroup={false} /></>);
                            }) : ''}
                        </List>
                    </Collapse>
                </List>

            </Box>
        </>
    );
}