import Box from "@mui/material/Box";
import React from "react";

export default function SideBar() {

    return (
        <>
            <Box
                sx={{
                    width: '20%',
                    heigth: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    background: '#0091',
                    borderRadius: '10px'
                }}
            >
                <Box
                    sx={{
                        width: '98%',
                        heigth: '20px',
                        borderTopLeftRadius: '16px',
                        borderTopRightRadius: '16px',
                        m: 1,
                        background: '#ee3'
                    }}
                >

                </Box>
                <Box
                    sx={{
                        width: '98%',
                        heigth: '70%',
                        m: 1,
                        background: '#e13'
                    }}
                >

                </Box>
                <Box
                    sx={{
                        width: '98%',
                        heigth: '15%',
                        borderBottomLeftRadius: '16px',
                        borderBottomRightRadius: '16px',
                        m: 1,
                        background: '#e13'
                    }}
                >

                </Box>
            </Box>
        </>
    );
}