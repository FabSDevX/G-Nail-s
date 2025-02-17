import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export const StatusSnackbar = ({ open, message, severity, onClose }) => (
    <Snackbar 
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
        <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>
);