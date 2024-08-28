import React, { useState } from 'react';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AdminToolbar } from '../../../component/managementAdmin/AdminToolbar';
import { useAdminColumns } from '../../../component/managementAdmin/useAdminColumns';
import { useAdminDataHandling } from '../../../component/managementAdmin/useAdminDataHandling';
import { ConfirmDialog } from '../../../component/managementAdmin/ConfirmDialog';
import { StatusSnackbar } from '../../../component/managementAdmin/StatusSnackbar';
import { SearchField } from '../../../component/managementAdmin/SearchField';
import { GridRowModes } from '@mui/x-data-grid';

const AdminManagement = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 5,
        page: 0,
    });

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const {
        rows,
        rowModesModel,
        setRowModesModel,
        handleAddClick,
        handleEditClick,
        handleSaveClick,
        handleCancelClick, 
        handleDeleteClick,
        processRowUpdate,
        snackbarState,
        setSnackbarState,
    } = useAdminDataHandling();
    
    const columns = useAdminColumns({
        rowModesModel,
        handleSaveClick,
        handleCancelClick,
        handleEditClick,
        setOpenDialog,
        setDeleteId,   
    });
    
    const confirmDelete = async () => {
        await handleDeleteClick(deleteId)();
        setOpenDialog(false);
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredRows = rows.filter((row) =>
        row && Object.values(row).some(
            (value) =>
                value &&
                value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const handleAddClickAndGoToFirstPage = () => {
        handleAddClick();  
        setPaginationModel((prevModel) => ({
            ...prevModel,
            page: 0, 
        }));
    };

    return (
        <Box
            sx={{
                height: 'auto',
                width: '100%',
                maxWidth: isSmallScreen ? '100%' : '70%',  // Limitar el ancho en pantallas grandes
                margin: 'auto',
                display: 'flex',
                flexDirection: 'column',
                mt: 5,
                px: isSmallScreen ? 2 : 0,  // Padding en pantallas pequeñas
                alignItems: 'center',
            }}
        >
            <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
                <Grid item xs={12}>
                    <SearchField value={searchText} onChange={handleSearchChange} />
                </Grid>
                <Grid item xs={12}>
                    <DataGrid
                        rows={filteredRows}
                        columns={columns}
                        editMode="row"
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                        processRowUpdate={processRowUpdate}
                        slots={{
                            toolbar: () => <AdminToolbar onAddClick={handleAddClickAndGoToFirstPage} />,
                        }}
                        pageSizeOptions={[5, 10, 25]}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        disableRowSelectionOnClick
                        autoHeight  // Ajuste de altura automática
                        onProcessRowUpdateError={(error) => {
                            console.error('Error al procesar la actualización de la fila:', error);
                            setSnackbarState({
                                open: true,
                                message: 'Error al actualizar el usuario',
                                severity: 'error'
                            });
                        }}
                        onRowEditStop={(params, event) => {
                            if (params.reason !== 'enterKeyDown' && params.reason !== 'buttonClick') {
                                event.defaultMuiPrevented = true; 
                                setRowModesModel((prevModel) => ({
                                    ...prevModel,
                                    [params.id]: { mode: GridRowModes.Edit }, 
                                }));
                            }
                        }}
                    />
                </Grid>
            </Grid>
            <StatusSnackbar
                open={snackbarState.open}
                message={snackbarState.message}
                severity={snackbarState.severity}
                onClose={() => setSnackbarState(prev => ({ ...prev, open: false }))}
            />
            <ConfirmDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onConfirm={confirmDelete}
                title="Confirmar eliminación"
                content="¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."
            />
        </Box>
    );
};

export default AdminManagement;
