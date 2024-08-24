import React from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchField = ({ value, onChange }) => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '90%',
            mb: 2,
            px: 2,
        }}
    >
        <TextField
            variant="outlined"
            placeholder="Buscar usuarios..."
            value={value}
            onChange={onChange}
            sx={{
                width: '100%',
                maxWidth: '600px',
                '@media (max-width: 600px)': {
                    maxWidth: '100%',
                    fontSize: '0.9rem', // Ajustar el tamaño de fuente en pantallas pequeñas
                },
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    </Box>
);