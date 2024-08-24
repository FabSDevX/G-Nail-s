import { useState, useEffect } from 'react';
import { GridRowModes } from '@mui/x-data-grid';
import {
    setDocumentByCollection,
    getAllDocuments,
    updateDocumentById,
    deleteDocumentById
} from '../../utils/firebaseDB';

export const useAdminDataHandling = () => {
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [originalRows, setOriginalRows] = useState({});

    useEffect(() => {
        const fetchAdmins = async () => {
            const adminsList = await getAllDocuments('allowedUsers');
            setRows(adminsList);
        };
        fetchAdmins();
    }, []);

    const handleAddClick = () => {
        const id = Math.random().toString(36).substr(2, 9);
        setRows((oldRows) => [{ id, name: '', gmail: '', isNew: true }, ...oldRows]); // Agregar al inicio
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };
    
    

    const handleEditClick = (id) => () => {
        const originalRow = rows.find((row) => row.id === id);

        if (!originalRow) {
            console.error(`No se encontró la fila con el id: ${id}`);
            return;
        }

        // Almacena la fila original antes de la edición
        setOriginalRows((prev) => ({ ...prev, [id]: { ...originalRow } }));

        // Inicia el modo de edición
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };


    const handleSaveClick = (id) => async () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        setSnackbarState({
            open: true,
            message: 'Usuario guardado con éxito',
            severity: 'success'
        });
    };

    const handleDeleteClick = (id) => async () => {
        try {
            await deleteDocumentById('allowedUsers', id);
            setRows(rows.filter((row) => row.id !== id));
            setSnackbarState({
                open: true,
                message: 'Usuario eliminado con éxito',
                severity: 'success'
            });
        } catch (error) {
            console.error('Error al eliminar el documento:', error);
            setSnackbarState({
                open: true,
                message: 'Error al eliminar el usuario',
                severity: 'error'
            });
        }
    };

    const handleCancelClick = (id) => () => {
        // Verifica si la fila es nueva o si ya existía
        const isNewRow = !originalRows[id];
    
        if (isNewRow) {
            // Para nuevas filas, salir del modo de edición y eliminar la fila
            setRowModesModel((prevModel) => ({
                ...prevModel,
                [id]: { mode: GridRowModes.View, ignoreModifications: true },
            }));
    
            setTimeout(() => {
                setRows((prevRows) => prevRows.filter((row) => row.id !== id));
                setRowModesModel((prevModel) => {
                    const updatedModel = { ...prevModel };
                    delete updatedModel[id];
                    return updatedModel;
                });
            }, 100); // Retraso para permitir que el DataGrid procese la salida del modo de edición
        } else {
            // Si la fila existi restaurar al estado original
            setRows((prevRows) =>
                prevRows.map((row) => (row.id === id ? originalRows[id] : row))
            );
    
            // Elimina la copia del estado original
            setOriginalRows((prev) => {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            });
    
            // Sale del modo de edición sin guardar cambios
            setRowModesModel((prevModel) => ({
                ...prevModel,
                [id]: { mode: GridRowModes.View, ignoreModifications: true },
            }));
        }
    };
    


    const processRowUpdate = async (newRow) => {
        try {
            const updatedRow = { ...newRow, isNew: false };
            if (newRow.isNew) {
                const docRef = await setDocumentByCollection('allowedUsers', updatedRow);
                updatedRow.id = docRef.id;
            } else {
                await updateDocumentById('allowedUsers', newRow.id, updatedRow);
            }
            setRows((prevRows) => prevRows.map((row) => (row.id === newRow.id ? updatedRow : row)));
            return updatedRow;
        } catch (error) {
            console.error('Error al actualizar el documento:', error);
            throw new Error('Error al guardar los cambios en Firebase.');
        }
    };

    return {
        rows,
        rowModesModel,
        setRowModesModel,
        handleAddClick,
        handleEditClick,
        handleSaveClick,
        handleDeleteClick,
        handleCancelClick,
        processRowUpdate,
        snackbarState,
        setSnackbarState,
    };
};
