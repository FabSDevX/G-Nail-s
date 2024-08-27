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
import { db } from '../../../../firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { InfoScheduledCourse } from './InfoScheduledCourse';

const calendarMobile = {
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
        if(d.getMonth() === date.month()){
          daysToHighlight.push(d.getDate())
        }
      })
      // console.log("Dias en el mes ", date.month(), ": ", daysToHighlight)
      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}


function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isMobile = useMediaQuery('(max-width:1090px)');

  const isSelected =
    !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      color="secondary"
      badgeContent={isSelected ? '1' : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        sx={!isMobile?{...calendarMobile.picker}:null}
      />
    </Badge>
  );
}

export default function Calendar() {
  const [showPanel, setShowPanel] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const [value, setValue] = React.useState(dayjs());
  const isMobile = useMediaQuery('(max-width:1090px)');
  const [data, setData] = React.useState([]);
  const [dates, setDates] = React.useState([]);
  const [todayActivities, setTodayActivities] = React.useState([]);

  const requestAbortController = React.useRef(null);

  const fetchHighlightedDays = (date1, dates1) => {
    const controller = new AbortController();
    // console.log("Haciendo el fetch con: ", dates1)
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
    const  getData = async () => {
      const tempData = []
      const tempDates = []
      const querySnapshot = await getDocs(collection(db, "Agenda"));
      querySnapshot.forEach((doc) => {
        tempData.push({'date':doc.id, ...doc.data()})
        let [day, month, year] = doc.id.split("-");
        const dateObject = new Date(year, month - 1, day);
        tempDates.push(dateObject);
        // console.log(tempData[tempData.length-1]);
        // console.log("Fecha: ", tempDates[tempData.length-1].getDate());
      });
      setData(tempData);
      setDates(tempDates);
      fetchHighlightedDays(value, tempDates);
    }
    getData();
    return () => requestAbortController.current?.abort();
  }, [data, dates]);

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
        setTodayActivities(date.courseScheduled)
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
          sx={!isMobile?{...calendarMobile.calendar, margin :isMobile?'70px auto 0 auto':'0 0 0 auto'}:
            {
              border: '1px black solid',
              borderRadius:isMobile? '15px 15px 0 0px':'15px',
              overflow:'visible',
              margin:isMobile?'70px auto 0 auto':'0 0 0 auto',
              '& .MuiBadge-root': {
                border: '1px solid gray',
              },
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
          <Box display={'flex'} margin={'auto'} justifyContent={'center'} alignContent={'center'} height={isMobile?'fit-content':'312px'}>
            {todayActivities.length>0?
              (
                todayActivities.map((course, index) => (
                  <Box key={index} margin={'auto'}>
                    <InfoScheduledCourse name={course.courseName} id={course.courseID} cupo={course.cupo} group={course.group} hours={course.hours} />
                  </Box>
                ))
              )
              :
              (
                <Typography margin={'auto'} textAlign={'center'} fontStyle={'italic'}>*No hay cursos agendados para esta fecha*</Typography>
              )
            }
          </Box>

{/* 
          <Button variant="contained" sx={{ mt: 2 }}>
            Acción 
          </Button> */}
        </Paper>
    
    </Box>
  );
}
