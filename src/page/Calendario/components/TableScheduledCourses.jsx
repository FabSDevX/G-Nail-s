import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Alert, AlertTitle, Snackbar, Typography, useMediaQuery } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';import { alignProperty } from '@mui/material/styles/cssUtils';
import AddIcon from '@mui/icons-material/Add';
import { getAllDocuments, getDocumentById } from '../../../utils/firebaseDB';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteScheduledCourses, fetchScheduledCourses } from '../../../store/slices/ScheduledCoursesSlice';
import { ConfirmationDialog } from '../../../component/ConfirmationDialog';
import { promiseToast } from '../../../utils/toast';
import { toast } from 'sonner';

const rows = [
  { id: 1, curso: 'Matemáticas', grupo: 'A',cupo:4, fechas: ['10/08/2024', '15/12/2024', '10/08/2024', '15/12/2024'] },
  { id: 2, curso: 'Ciencias', grupo: 'B',cupo:4, fechas: ['12/08/2024', '20/12/2024'] },
  { id: 3, curso: 'Historia', grupo: 'A',cupo:4, fechas: ['11/08/2024', '18/12/2024'] },
  { id: 4, curso: 'Geografía', grupo: 'C', cupo:4,fechas: ['09/08/2024', '14/12/2024'] },
  { id: 5, curso: 'Física', grupo: 'B',cupo:4, fechas: ['13/08/2024', '21/12/2024'] },
];

const textConfirmationModal = "¿Está seguro de eliminar el curso agendado?"

const getCourseName = async (courseUID) => {
  const course = await getDocumentById("Course", courseUID);
  return course.name;
}

export default function QuickFilteringGrid({onAction}) {
  const isMobile = useMediaQuery('(max-width:1090px)');
  const [rows, setRows] = React.useState([])
  const [handleDialog, setHandleDialog] = React.useState(false);
  const [uidSelected, setUidSelected] = React.useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { scheduledCourses, status, error } = useSelector((state) => state.scheduledCourses);

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchScheduledCourses()); // Cargar reservas al montar el componente
    }
  }, [status, dispatch]);

  React.useEffect(() => {
    const getData = async() => {
      const tempRows = await Promise.all(scheduledCourses.map(async (e, i) => {
        let name = e.courseUID;
        try {
          name = await getCourseName(e.courseUID); // Espera la promesa
        } catch (error) {
          console.log(error);
        }
        return {
          id: i + 1,
          uid: e.id,
          curso: name,
          grupo: e.group,
          cupo: e.cupo,
          fechas: e.dates
        };
      }));
      
      setRows(tempRows)
    }
    getData();
  },[scheduledCourses]  )

  // Función para manejar la acción de editar
  const handleEditClick = (id) => {
    console.log(`Editando curso con ID: ${id}`);
    navigate('./course/'+id);
    // Aquí puedes agregar la lógica para redirigir a un formulario de edición, por ejemplo
  };

  // Función para manejar la acción de eliminar
  const handleDeleteClick = (id) => {
    setUidSelected(id);
    console.log(`Eliminando curso con ID: ${id}`);
    setHandleDialog(true)
  };

  const deleteRow = () => {
    const id = uidSelected
    dispatch(deleteScheduledCourses(id)).then(() => {
      dispatch(fetchScheduledCourses());
      onAction();

    });
    handleShowAlert();
  }

  const handleNewCourse = () => {
    navigate('./course/');
  };

  const [showAlert, setShowAlert] = React.useState(false);
  const handleShowAlert = () => {
    setShowAlert(true);
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 40 },
    { field: 'curso', headerName: 'Curso', width: 200 },
    { field: 'grupo', headerName: 'Grupo', width: 60 },
    { field: 'cupo', headerName: 'Cupo', width: 60 },
    {
      field: 'fechas',
      headerName: 'Fechas',
      width: 108,
      renderCell: (params) => (
        <Box>
        {params.value.map((fecha, index) => (
          <Typography key={index}>
            {fecha.date}
          </Typography>
        ))}
      </Box>
      ),
    },
    {
      field: 'editar',
      headerName: 'Editar',
      width: 80,
      renderCell: (params) => (
        <Box margin={'auto'}>
          <Button variant="contained" sx={{bgcolor:'orange','&:hover': {backgroundColor: 'darkorange'}}} onClick={() => handleEditClick(params.row.uid)}>
              <EditIcon sx={{color:'black'}} fontSize='large'/>
          </Button>
        </Box>
      ),
    },
    {
      field: 'eliminar',
      headerName: 'Eliminar',
      width: 80,
      renderCell: (params) => (
        <Box margin={'auto'}>
          <Button variant="contained" sx={{bgcolor:'red','&:hover': {backgroundColor: '#bb0000'}}} onClick={() => handleDeleteClick(params.row.uid)}>
            <DeleteOutlinedIcon sx={{color:'black'}} fontSize='large'/>
          </Button>
        </Box>
      ),
    },
    ];

  return (
    <Box sx={{maxWidth:642, margin:isMobile?'25px auto ':'25px auto'}}>
      <Button sx={{mb:'10px'}} startIcon={<AddIcon/>} variant="contained" onClick={handleNewCourse}>Agendar curso</Button>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disableColumnMenu
        disableColumnSorting
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        autoHeight
        getRowHeight={() => 'auto'}
      />
      <ConfirmationDialog
        agreedFuntion={deleteRow}
        state={[handleDialog, setHandleDialog]}
        modalTitle={textConfirmationModal}
      />
      <Snackbar open={showAlert} autoHideDuration={4000} onClose={handleCloseAlert}>
        <Alert severity="success">
          Agenda eliminada con éxito
        </Alert>          
      </Snackbar>

    </Box>
  );
}
