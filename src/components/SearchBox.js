
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

export default function SearchBox() {

    return (
        <>
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
                onChange={(e) => { }}
            />
        </>
    );
}