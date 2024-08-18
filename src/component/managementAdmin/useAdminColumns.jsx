import React from 'react';
import { GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

export const useAdminColumns = ({
    rowModesModel,
    handleSaveClick,
    handleCancelClick,
    handleEditClick,
    setOpenDialog,     //  prop para abrir el diálogo
    setDeleteId,       //  prop para establecer el ID del usuario a eliminar
}) => [
    { field: 'name', headerName: 'Nombre', width: 250, editable: true },
    { field: 'gmail', headerName: 'Email', width: 250, editable: true },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Acciones',
        width: 150,
        cellClassName: 'actions',
        getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
                return [
                    <GridActionsCellItem
                        icon={<SaveIcon />}
                        label="Guardar"
                        onClick={handleSaveClick(id)}
                    />,
                    <GridActionsCellItem
                        icon={<CancelIcon />}
                        label="Cancelar"
                        onClick={handleCancelClick(id)}
                        color="inherit"
                    />,
                ];
            }

            return [
                <GridActionsCellItem
                    icon={<EditIcon sx={{ color: "black", backgroundColor: "#FFFF99", padding: "8px", borderRadius: "4px" }} />}
                    label="Editar"
                    onClick={handleEditClick(id)}
                    sx={{ color: "#FFFF99" }}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon sx={{ color: "black", backgroundColor: "#f54021", padding: "8px", borderRadius: "4px" }} />}
                    label="Eliminar"
                    onClick={() => {
                        setDeleteId(id); // Establecer el ID del usuario a eliminar
                        setOpenDialog(true); 
                    }}
                    sx={{ color: "#FFFF99" }}
                />,
            ];
        },
    },
];
