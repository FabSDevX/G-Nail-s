import React from 'react';
import { Button } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

export const AdminToolbar = ({ onAddClick }) => (
    <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={onAddClick}>
            Agregar Administrador
        </Button>
    </GridToolbarContainer>
);