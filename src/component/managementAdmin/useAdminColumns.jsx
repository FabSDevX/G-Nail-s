import React from 'react';
import { GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useMediaQuery, useTheme } from '@mui/material';

export const useAdminColumns = ({
    rowModesModel,
    handleSaveClick,
    handleCancelClick,
    handleEditClick,
    setOpenDialog,     //  prop para abrir el diálogo
    setDeleteId,       //  prop para establecer el ID del usuario a eliminar
}) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return [
        { 
            field: 'name', 
            headerName: 'Nombre', 
            width: isSmallScreen ? 150 : 250,  // ancho en pantallas pequeñas
            editable: true 
        },
        { 
            field: 'gmail', 
            headerName: 'Email', 
            width: isSmallScreen ? 150 : 250,  //en pantallas pequeñas
            editable: true 
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Acciones',
            width: isSmallScreen ? 100 : 150,  // Reducir el tamaño de las acciones en pantallas pequeñas
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Guardar"
                            onClick={handleSaveClick(id)}
                            sx={{
                                fontSize: isSmallScreen ? 'small' : 'default',
                                padding: isSmallScreen ? '4px' : '8px',
                            }} 
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancelar"
                            onClick={handleCancelClick(id)}
                            sx={{
                                fontSize: isSmallScreen ? 'small' : 'default',
                                padding: isSmallScreen ? '4px' : '8px',
                            }} 
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon sx={{ 
                            color: "black", 
                            backgroundColor: "#FFFF99", 
                            padding: isSmallScreen ? '4px' : '8px', 
                            borderRadius: "4px", 
                            fontSize: isSmallScreen ? 'small' : 'default' }} 
                        />}
                        label="Editar"
                        onClick={handleEditClick(id)}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon sx={{ 
                            color: "black", 
                            backgroundColor: "#f54021", 
                            padding: isSmallScreen ? '4px' : '8px', 
                            borderRadius: "4px", 
                            fontSize: isSmallScreen ? 'small' : 'default' }} 
                        />}
                        label="Eliminar"
                        onClick={() => {
                            setDeleteId(id); // Establecer el ID del usuario a eliminar
                            setOpenDialog(true); 
                        }}
                    />,
                ];
            },
        },
    ];
};
