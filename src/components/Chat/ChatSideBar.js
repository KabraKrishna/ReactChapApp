import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import NewGroupForm from "./NewGroupForm";

export default function ChatSideBar() {

    return (
        <>
            <Box
                sx={{
                    width: '25%',
                    heigth: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    borderRadius: '10px',
                    background: '#0091',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    px: 1
                }}
            >
                <NewGroupForm />
            </Box>
        </>
    );
}