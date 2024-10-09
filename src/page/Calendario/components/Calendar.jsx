import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { Box, Button, Divider, IconButton, Paper, Typography, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { InfoScheduledCourse } from './InfoScheduledCourse';
import { getDocumentById } from '../../../utils/firebaseDB';
import { DayInformation } from './DayInformation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchScheduledCourses } from '../../../store/slices/ScheduledCoursesSlice';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase';

const calendarIsNotMobile = {
  picker: {
    margin: 'auto', 
    width: '45px', 
    height: '45px', 
    '&:hover':{bgcolor:'#ffc9d9'}
  },
  calendar:{
    p: '10px',
    minWidth: 370, // Ajusta el tamaño general del calendario
    minHeight: 400,
    border: '1px black solid',
    borderRadius: 5,
    overflow:'visible',
    '& .MuiDayCalendar-weekDayLabel': {
      width: 50,  // Ajusta el tamaño del contenedor del día de la semana
      height: 50, // Para centrar verticalmente
      lineHeight: '50px', // Centrar el texto verticalmente
      fontSize: '1.25rem', // Ajusta el tamaño de la fuente
    },
    '& .MuiDayCalendar-weekContainer': {
      margin: 0, // Para centrar verticalmente
    },
    '& .MuiDateCalendar-root': {
      overflow: 'visible',
    },
    '& .MuiPickersDay-root': {
      fontSize: '1rem', // Ajusta el tamaño de la fuente para los días
    },
    '& .MuiPickersDay-root.Mui-selected': {
      '&:focus':{backgroundColor:'var(--primary-color)'},
      '&:hover':{backgroundColor:'var(--secondary-color)'},
      backgroundColor:'var(--primary-color)'
    },
    '& .MuiPickersSlideTransition-root': {
      overflowX: 'visible',
    },
    '& .MuiBadge-root': {
      width: 50,
      height: 48,
      border: '1px solid gray',
    },
  }
}

function fakeFetch(date, dates,  { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      let daysToHighlight = []
      dates.map((d) => {
        if(d.date.getMonth() === date.month()){
          daysToHighlight.push({day:d.date.getDate(), count:d.count})
        }
      })
      resolve({ daysToHighlight });
    }, 0);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}


function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isMobile = useMediaQuery('(max-width:680px)');

  const highlightedDay = highlightedDays.find(
    (highlight) => highlight.day === day.date()
  );

  const isSelected =
    !outsideCurrentMonth && highlightedDay !== undefined;

  const count = isSelected ? highlightedDay.count : undefined;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      // color="primary"
      badgeContent={count}
      sx={{
        '& .MuiBadge-standard':{
          backgroundColor:'var(--secondary-color)'
        }
      }}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        sx={!isMobile?{...calendarIsNotMobile.picker}:null}
        
      />
    </Badge>
  );
}

export default function Calendar({propsdata, propsdates, isEditable, onButtonClick}) {
  const [showPanel, setShowPanel] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const [value, setValue] = React.useState(dayjs());
  const isMobile = useMediaQuery('(max-width:680px)');
  const [data, setData] = React.useState([]);
  const [dates, setDates] = React.useState([]);
  const [todayActivities, setTodayActivities] = React.useState([]);
  const [hours, setHours] = React.useState(["Error con el horario", "Error con el horario", "Error con el horario", "Error con el horario"]);
  const requestAbortController = React.useRef(null);
  const dispatch = useDispatch();
  const { scheduledCourses, status, error } = useSelector((state) => state.scheduledCourses);

  const fetchHighlightedDays = (date1, dates1) => {
    const controller = new AbortController();
    fakeFetch(date1, dates1, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchScheduledCourses()); // Cargar reservas al montar el componente
    }
  }, [status, dispatch]);

  React.useEffect(() => {
    setIsLoading(true);  // Iniciar el estado de carga
    setHighlightedDays([])
    const getData = async () => {
      try {
          setData(propsdata); // Actualiza el estado cuando cambian los datos
          setDates(propsdates);

          const informacion = await getDocumentById("Contact info", "Information");
          let todayActivitiesTemp = informacion.lessonSchedule
          todayActivitiesTemp = todayActivitiesTemp.map((e) => ({hours:e, activity:null}))
          setTodayActivities(todayActivitiesTemp);
          setHours(informacion.lessonSchedule);

          fetchHighlightedDays(value, propsdates);
          propsdata.map((date) => {
            if (date.date == value.format('DD-MM-YYYY')){
              // console.log("Actividades de hoy: ", date.scheduledCoursesUids)
      
              date.scheduledCoursesUids.map((e) => {
                let infoCourse = getInfoReservation(e);
                const schedule = getScheduleCourse(infoCourse, value.format('DD-MM-YYYY'))
                setTodayActivities((prevActivities) =>
                  prevActivities.map((item, index) =>
                    schedule.includes(index) ? { ...item, activity: infoCourse } : item
                  )
                );
              })
            }
          }) 

          setIsLoading(false);  // Terminar el estado de carga después de las actualizaciones
      } catch (error) {
          console.error("Error fetching data: ", error);
          setIsLoading(false);  // Asegurarse de desactivar el estado de carga en caso de error
      }
    }
    getData();
    return () => requestAbortController.current?.abort();
  }, [propsdata, propsdates]);

  const getInfoReservation = (idReservation) => {
    let infoCourse = null
    scheduledCourses.map((e)=> {
      if (e.id == idReservation)
        infoCourse = e
    })   
    return {id:idReservation, ...infoCourse} 
  }

  const getScheduleCourse = (courseInfo, date) => {
    let schedule = []
    courseInfo.dates.map((e) => {
      if(e.date == date){
        schedule.push(e.hours);
      }
    })
    return schedule
  }

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date, dates);
  };

  const handleDaySelectedChange= (newValue) => {
    setValue(newValue);

    setTodayActivities((prevActivities) =>
      prevActivities.map((item) => ({ ...item, activity: null }))
    );
    
    data.map((date) => {
      if (date.date == newValue.format('DD-MM-YYYY')){
        // console.log("Actividades de hoy: ", date.scheduledCoursesUids)

        date.scheduledCoursesUids.map((e) => {
          let infoCourse = getInfoReservation(e);
          const schedule = getScheduleCourse(infoCourse, newValue.format('DD-MM-YYYY'))
          setTodayActivities((prevActivities) =>
            prevActivities.map((item, index) =>
              schedule.includes(index) ? { ...item, activity: infoCourse } : item
            )
          );
        })
      }
    })
    // console.log(todayActivities)

  };

  return (
    <Box sx={{ display:isMobile?'inline':'flex', justifyContent:'center' }}>
      <LocalizationProvider 
        dateAdapter={AdapterDayjs} 
        adapterLocale="es" 
        localeText={{ 
            startWeekOn: 1, // Cambia el inicio de la semana a lunes
            previousMonth: 'Mes anterior',
            nextMonth: 'Mes siguiente',
            cancelButtonLabel: 'Cancelar',
            okButtonLabel: 'Aceptar',
        }}
      >
        <DateCalendar
          value={value}
          onChange={(newValue) => handleDaySelectedChange(newValue)}
          loading={isLoading}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
            },
          }}
          sx={!isMobile?{...calendarIsNotMobile.calendar, margin :isMobile?'70px auto a auto':'auto 0 auto auto'}:
            {
              border: '1px black solid',
              borderRadius:isMobile? '15px 15px 0 0px':'15px',
              overflow:'visible',
              margin:isMobile?'70px auto 0 auto':'0 0 0 auto',
              '& .MuiBadge-root': {
                border: '1px solid gray',
              },
              '.MuiDayCalendar-weekContainer':{
                margin:0
              }
            }
          }
        />
      </LocalizationProvider>
      <DayInformation todayActivities={todayActivities} isMobile={isMobile} value={value} isEditable={isEditable} onButtonClick={onButtonClick}/>
    </Box>
  );
}
