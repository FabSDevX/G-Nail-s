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

const calendarIsNotMobile = {
  picker: {
    margin: 'auto', 
    width: '45px', 
    height: '45px', 
    '&:hover':{bgcolor:'lightblue'}
  },
  calendar:{
    p: '10px',
    minWidth: 370, // Ajusta el tamaño general del calendario
    minHeight: 370,
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
    '& .MuiPickersSlideTransition-root': {
      overflowX: 'visible',
    },
    '& .MuiBadge-root': {
      width: 50,
      height: 50,
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
      color="secondary"
      badgeContent={count}
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

export default function Calendar(props) {
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
    setIsLoading(true);  // Iniciar el estado de carga
    
    const getData = async () => {
      try {
          setData(props.data); // Actualiza el estado cuando cambian los datos
          setDates(props.dates);

          const informacion = await getDocumentById("Contact info", "Information");
          setHours(informacion.lessonSchedule)

          setIsLoading(false);  // Terminar el estado de carga después de las actualizaciones
      } catch (error) {
          console.error("Error fetching data: ", error);
          setIsLoading(false);  // Asegurarse de desactivar el estado de carga en caso de error
      }
    }
    getData();
    return () => requestAbortController.current?.abort();
  }, [props]);

  
  React.useEffect(() => {
    fetchHighlightedDays(value, dates);
    data.map((date) => {
      if (date.date == value.format('DD-MM-YYYY')){
        setTodayActivities(date.scheduledCoursesUids)
      }
    })
  }, [dates, data]);



  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date, dates);
  };

  const handleDaySelectedChange= (newValue) => {
    setTodayActivities([])
    setValue(newValue);
    data.map((date) => {
      if (date.date == newValue.format('DD-MM-YYYY')){
        setTodayActivities(date.scheduledCoursesUids)
      }
    })

  };

  return (
    <Box mt={'80px'} sx={{ display:isMobile?'inline':'flex', justifyContent:'center' }}>
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
        <Paper
          elevation={isMobile?0:3}
          sx={{
            padding: '16px',
            borderRadius:isMobile? '0 0 15px 15px':'15px',
            border:isMobile?'1px black solid':'none',
            borderTop:'none',
            backgroundColor: '#ffd3e5',
            width:isMobile?'289px':'200px',
            margin:isMobile?'auto':'0 auto 0 5px'
          }}
        >
          <Typography variant="h6" mb={'5px'}>
              Agenda del 
              <em style={{fontSize:'16px', marginLeft:'5px'}}>
                <b>
                   {value.format('DD-MM-YYYY')}
                </b>
              </em>
          </Typography>
          <Divider />
          <Box justifyContent={'center'} alignContent={'center'} minHeight={isMobile?'fit-content':'312px'}>
            {todayActivities.length>0?
              (
                todayActivities.map((reservationUID, index) => (
                  <Box key={index} margin={'20px auto'} >
                    <InfoScheduledCourse id={reservationUID} date={value.format('DD-MM-YYYY')}/>
                  </Box>
                ))
              )
              :
              (
                <Typography margin={'auto'} textAlign={'center'} fontStyle={'italic'}>*No hay cursos agendados para esta fecha*</Typography>
              )
            }
          </Box>
        </Paper>
    </Box>
  );
}
