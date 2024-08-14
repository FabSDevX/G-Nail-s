import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    IconButton,
    Box,
    Typography,
    TablePagination,
    useMediaQuery,
    useTheme,
    Grid,
    Card,
    CardContent,
    CardActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { setDocumentByCollection, getAllDocuments, deleteDocumentById } from '../../../utils/firebaseDB';

export const AdminManagement = () => {
    const [admins, setAdmins] = useState([]);
    const [newAdmin, setNewAdmin] = useState({ name: '', gmail: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [currentAdminId, setCurrentAdminId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchAdmins = async () => {
            const adminsList = await getAllDocuments("allowedUsers");
            setAdmins(adminsList);
        };

        fetchAdmins();
    }, []);

    const handleAddAdmin = async () => {
        if (!newAdmin.name || !newAdmin.gmail) return;
        if (isEditing) {
            await updateDocumentById("allowedUsers", currentAdminId, newAdmin);
            setIsEditing(false);
            setCurrentAdminId(null);
        } else {
            await setDocumentByCollection("allowedUsers", newAdmin);
        }
        setNewAdmin({ name: '', gmail: '' });
        window.location.reload();
    };

    const handleEditAdmin = (admin) => {
        setIsEditing(true);
        setNewAdmin({ name: admin.name, gmail: admin.gmail });
        setCurrentAdminId(admin.id);
    };

    const handleDeleteAdmin = async (id) => {
        await deleteDocumentById("allowedUsers", id);
        window.location.reload();
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredAdmins = admins.filter((admin) =>
        admin.name.toLowerCase().includes(searchQuery) || admin.gmail.toLowerCase().includes(searchQuery)
    );

    const renderAdminList = () => {
        if (isMobile) {
            return (
                <Grid container spacing={2}>
                    {filteredAdmins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((admin) => (
                        <Grid item xs={12} key={admin.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{admin.name}</Typography>
                                    <Typography variant="body2">{admin.gmail}</Typography>
                                </CardContent>
                                <CardActions>
                                    <IconButton onClick={() => handleEditAdmin(admin)} size="small" color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteAdmin(admin.id)} size="small" color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            );
        } else {
            return (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Nombre</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Editar</strong></TableCell>
                                <TableCell><strong>Eliminar</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredAdmins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((admin) => (
                                <TableRow key={admin.id}>
                                    <TableCell>{admin.name}</TableCell>
                                    <TableCell>{admin.gmail}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEditAdmin(admin)} sx={{ color: 'orange' }}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDeleteAdmin(admin.id)} sx={{ color: 'red' }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }
    };

    return (
        <Box sx={{
            width: '100%',
            maxWidth: '900px',
            margin: 'auto',
            padding: '20px',
            boxSizing: 'border-box'
        }}>
            <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>
                Gestión de Administradores
            </Typography>

            <TextField
                label="Buscar"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearch}
                sx={{ width: '100%', marginBottom: '20px' }}
            />

            {renderAdminList()}

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredAdmins.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Mostrar"
                sx={{ paddingTop: '20px' }}
            />

            <Box
                sx={{
                    marginTop: '20px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '8px'
                }}
            >
                <Typography variant="h6">
                    {isEditing ? "Editar Administrador" : "Agregar Nuevo Administrador"}
                </Typography>
                <TextField
                    label="Nombre"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                    sx={{ width: '100%' }}
                />
                <TextField
                    label="Email"
                    value={newAdmin.gmail}
                    onChange={(e) => setNewAdmin({ ...newAdmin, gmail: e.target.value })}
                    sx={{ width: '100%' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddAdmin}
                    sx={{ width: '100%' }}
                >
                    {isEditing ? "Guardar Cambios" : "Agregar Admin"}
                </Button>
            </Box>
        </Box>
    );
};