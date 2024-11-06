import { Alert, Autocomplete, Box, Button, IconButton, Snackbar, TextField, Typography, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDocuments, getDocumentById } from "../../utils/firebaseDB";
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from "react-redux";
import { fetchScheduledCourses, updateScheduledCourses } from "../../store/slices/ScheduledCoursesSlice";
import Calendar from "./components/Calendar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { esES } from "@mui/x-date-pickers/locales";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
export function FormAgenda(){
    const [coursesNames, setCoursesNames] = useState([]);
    const [courseSelected, setCourseSelected] = useState(null);
    const [courseEditing, setCourseEditing] = useState(null);
    const [grupo, setGrupo] = useState('');
    const [cupo, setCupo] = useState('');
    const [hours, setHours] = useState([])
    const [datesOfCourse, setDatesOfCourse] = useState([]);
    const isMobile = useMediaQuery('(max-width:680px)');
    const [data, setData] = useState([]);
    const [dates, setDates] = useState([]); 
    const [alertInfo, setAlertInfo] = useState(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { scheduledCourses, status, error } = useSelector((state) => state.scheduledCourses);
    // Obtener los parámetros de la URL
    const { id } = useParams();

    const  getData = async () => {
      const tempData = []
      const tempDates = []
      const querySnapshot = await getDocs(collection(db, "Calendar"));
      querySnapshot.forEach((doc) => {
        tempData.push({'date':doc.id, ...doc.data()})
        let [day, month, year] = doc.id.split("-");
        const dateObject = new Date(year, month - 1, day);
        let count = doc.data().scheduledCoursesUids.length;
        tempDates.push({date:dateObject, count});
      });
      setData(tempData);
      setDates(tempDates);
    }

    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchScheduledCourses()); // Cargar reservas al montar el componente
      }
    }, [status, dispatch]);

    useEffect(() => {
        getData();
      }, []);

    useEffect(() => {
        const getData = async () => {
            const infoBusiness = await getDocumentById("Contact info", "Information");
            setHours(infoBusiness.lessonSchedule);

            let UidCourse;
            scheduledCourses.map((e)=> {
              if (e.id == id){
                UidCourse = e.courseUID;
                setGrupo(e.group)
                setCupo(e.cupo)
                setDatesOfCourse(e.dates)
              }
            })   

            let courses = await getAllDocuments('Course');
            courses = courses.map((e)=>{
                if(id && e.id == UidCourse){
                    setCourseEditing(e.name);
                    setCourseSelected({label:e.name, value:e.id})
                }
                return {label:e.name, value:e.id}
            })
            setCoursesNames(courses);
        }
        getData();
    },[scheduledCourses])

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes procesar los datos del formulario
    const newReserva = {
        courseUID: courseSelected.value,
        group: grupo,
        cupo: cupo,
        dates: datesOfCourse
    };
    if(id){
      dispatch(updateScheduledCourses({id, data:newReserva})).then(() => {
          dispatch(fetchScheduledCourses());
          getData();
      });
      setAlertInfo({type:"success", message:"Curso editado con éxito"})
    }
    else{
      dispatch(updateScheduledCourses({id:null, data:newReserva})).then(() => {
          dispatch(fetchScheduledCourses());
          getData();
      });
      setAlertInfo({type:"success", message:"Curso agendado con éxito"})
    }
    handleShowAlert()
    if(id){
      setTimeout(()=>{
        navigate('../admin/calendar')
      }, 1500);
    }
    else{
      setGrupo('')
      setCupo('')
      setCourseSelected(null)
      setDatesOfCourse([])
    }
  };

  const handleDeleteDate = (index) => {
    const newDates= datesOfCourse.filter((_, i)=>{return i != index})
    setDatesOfCourse(newDates)
  };

  // Función que se llamará cuando el botón del componente hijo se pulse
  const handleChildButtonClick = (schedule, date) => {
    setDatesOfCourse((prevActivities) => {
      // Revisa si la fecha y hora ya se registro
      console.log("Agregando la fecha: ", date)
      const exists = prevActivities.some(
        (activity) => activity.hours === hours.indexOf(schedule) && activity.date === date
      );
  
      if (!exists) {
        // Si no se ha registrado, se agrega
        const newActivities = [
          ...prevActivities,
          { hours: hours.indexOf(schedule), date: date }
        ];
  
        // Ordenar la lista de fechas por fecha
        return newActivities.sort((a, b) => {
          const [dayA, monthA, yearA] = a.date.split('-');
          const [dayB, monthB, yearB] = b.date.split('-');
          
          const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
          const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
          
          return dateA - dateB;
        });
      }
      else{
        // Si el elemento existe, no lo agrega y muestra alerta
        setAlertInfo({type:"error", message:"La fecha y horario seleccionado ya fue agregado anteriormente"})
        handleShowAlert()
        return prevActivities;
      }

    });
  };

  const [showAlert, setShowAlert] = useState(false);
  const handleShowAlert = () => {
    setShowAlert(true);
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };  

  const handleBack = () => {
    navigate(-1); // Redirecciona a la página anterior en el historial
  };

  return (
    <Box>
        <Box mb={'40px'} >
            <IconButton onClick={handleBack} aria-label="back" sx={{margin:'auto auto 20px auto', fontSize:'50px', bgcolor:'pink', display:'flex', justifyContent:'center'}}>
              <ArrowBackIosNewIcon fontSize="50px"/>
            </IconButton>
            <Calendar propsdata={data} propsdates={dates} isEditable={false} onButtonClick={handleChildButtonClick} datesSelected={datesOfCourse}/>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box bgcolor={'rgb(255, 211, 229, 0.5)'} width={'80%'} margin={'auto'} borderRadius={'8px'} padding={'30px'}>

              <Typography variant="h1" fontSize={'25px'} textAlign={'center'} mb={'20px'}><b>{id ? "Editando la agenda del curso: " + courseEditing : "Agendando curso"}</b></Typography>

              <Box display={isMobile ? 'block' : 'flex'} justifyContent={'space-between'}>
                  <Box width={isMobile ? '100%' : '35%'}>
                      <Autocomplete
                          options={coursesNames}
                          getOptionLabel={(option) => option.label}
                          value={courseSelected}
                          disabled={id ? true : false}
                          onChange={(event, newValue) => {
                              setCourseSelected(newValue);
                          } }
                          isOptionEqualToValue={(option, value) => option.value === value.value} // Comparación personalizada
                          renderInput={(params) => <TextField {...params} label="Seleccione el curso" variant="outlined" />} />
                      <TextField
                          label="Grupo"
                          variant="outlined"
                          value={grupo}
                          onChange={(e) => setGrupo(e.target.value)}
                          sx={{ display: 'block', my: '30px' }} />
                      <TextField
                          label="Cupo"
                          variant="outlined"
                          type="number"
                          value={cupo}
                          inputProps={{ min: 0 }}
                          onChange={(e) => setCupo(e.target.value)}
                          sx={{ display: 'block' }} />
                  </Box>
                  <Box width={isMobile ? '100%' : '55%'} mt={isMobile ? '20px' : '0'}>
                      <Typography textAlign={'center'}>
                          <b>Fechas</b>
                      </Typography>
                      {datesOfCourse.length > 0 ?
                          datesOfCourse.map((e, i) => <Box key={i} display={'flex'} justifyContent={"center"} mt={'20px'}>
                              <Typography color={'gray'} bgcolor={'lightgray'} p={'5px'} mr={'5px'}>{e.date}</Typography>
                              <Typography color={'gray'} bgcolor={'lightgray'} p={'5px'}>{hours[e.hours]}</Typography>
                              <IconButton sx={{ color: 'black' }} onClick={() => handleDeleteDate(i)}>
                                  <ClearIcon />
                              </IconButton>
                          </Box>
                          )
                          :
                          <Typography textAlign={'center'} mt={'20px'} fontStyle={"italic"}>No hay fechas agregadas</Typography>}
                  </Box>
              </Box>
              <Box py={'20px'} display={'flex'} justifyContent={'center'}>
                  <Button variant="contained" type="submit" sx={{
                      backgroundImage: 'linear-gradient(to right, #F2BCD4, #EDD3DE)',
                      border: '1px solid black',
                      color: 'black',
                  }}
                  >
                      {id ? "Guardar Cambios" : "Agendar"}
                  </Button>
              </Box>
          </Box>
      </form>
      {alertInfo && 
        <Snackbar open={showAlert} autoHideDuration={3000} onClose={handleCloseAlert} anchorOrigin={{ vertical:"bottom", horizontal:"right" }}>
          <Alert severity={alertInfo.type} >
            {alertInfo.message}
          </Alert>          
        </Snackbar>
      }
    </Box>
  );
}