import React, { useEffect, useReducer, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { Divider, ListItemText } from "@mui/material";
import { useAuthentication } from "../../Hooks/useAuthentication";
import { useAllUserList } from "../../Hooks/useAllUserList";
import { useGroup } from "../../Hooks/useGroup";

export default function NewGroupForm() {

    const [selectedmemberList, setSelectedMemberList] = useState([]);
    const [isFormHidden, setIsFormHidden] = useState(true);
    //const [groupNameError, setGroupNameError] = useState(null);

    const { loggedInUser } = useAuthentication();
    const { allUserList } = useAllUserList();
    const { createNewGroupFunction } = useGroup();

    const handleFormShown = () => {
        setIsFormHidden(!isFormHidden);
    }

    const handleToggle = (value) => {

        const currentIndex = selectedmemberList.findIndex((m) => m.uid === value.uid );
        const newChecked = [...selectedmemberList];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setSelectedMemberList(newChecked);
    };


    const handleCreateNewGroup = async () => {

        const groupName = document.getElementsByName('groupName')[0].value;

        const groupObject = {
            name: groupName,
            members: [...selectedmemberList],
            admin: {
                uid: loggedInUser?.uid,
                name: loggedInUser?.name
            }
        }

        createNewGroupFunction(groupObject).then(() => {
            handleFormShown();
        })

    }

    function stringToColor(inpt) {
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

    if (isFormHidden) {

        return (
            <>
                <Button
                    variant="contained"
                    size="small"
                    color="success"
                    sx={{ m: 1, borderRadius: '32px' }}
                    startIcon={<AddIcon />}
                    onClick={handleFormShown}
                >
                    New Group
                </Button>
            </>
        );
    }


    return (
        <>
            <Box
                component="form"
                sx={{
                    width: '98%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                }}
                onSubmit={() => { }}
                noValidate>
                <Typography component="h6" variant="h6">
                    Create New Group
                </Typography>
                <TextField
                    margin="normal"
                    id="outlined-size-small"
                    required
                    fullWidth
                    size="small"
                    placeholder="Enter Group Name"
                    name="groupName"
                // onChange={(e) => { handleValueChange(e) }}
                // error={errorValues['email'] ? true : false}
                // helperText={errorValues['email']}

                />

                <List
                    dense
                    sx={{
                        width: '96%',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 300,
                    }}
                >
                    <ListItem
                        key="kdlsflkjsdlkjf1233"
                        disablePadding
                        alignItems="flex-start" >
                        <ListItemText
                            primary="Select Members"
                            primaryTypographyProps={{
                                fontSize: 15,
                                fontWeight: 'medium',
                                letterSpacing: 0,
                                color: '#111'
                            }} />
                    </ListItem>
                    <Divider sx={{ color: '#002' }} />
                    {allUserList.map((value) => {

                        return (
                            <ListItem
                                key={value.uid}
                                disablePadding
                                alignItems="flex-start"
                                secondaryAction={
                                    <Checkbox
                                        edge="end"
                                        onChange={() => { handleToggle(value)}}
                                        color="default"
                                        checked={
                                            selectedmemberList.find((m) => m.uid === value.uid) ? true : false
                                        }
                                    // inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                }

                            >
                                <ListItemButton sx={{ px: 0 }}>
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
                                        <Avatar {...getIconText(value.name)} />

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
                                                }}>
                                                {value.name}
                                            </Typography>
                                        </Box>

                                    </Box>
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>

                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            size="small"
                            type="submit"
                            sx={{ mt: 2, mb: 2 }}
                            onClick={handleFormShown}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="contained"
                            size="small"
                            color="success"
                            sx={{ mt: 2, mb: 2 }}
                            onClick={handleCreateNewGroup}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );

}