import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { Box, Button, IconButton, Paper, Typography, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, onHoverDay, ...other } = props;
  // const [showPanel, setShowPanel] = React.useState(false);

  const isSelected =
    !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      color="secondary"
      badgeContent={isSelected ? '1' : undefined}
      // onMouseEnter={() => onHoverDay(day)} // Llama a la función cuando el mouse pasa sobre el día
      onClick={() => onHoverDay(day)}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        sx={{ margin: 'auto', width: '45px', height: '45px', '&:hover':{bgcolor:'lightblue'}}} // Tamaño más grande para cada día
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


  const requestAbortController = React.useRef(null);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
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
    fetchHighlightedDays(value);
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };


  const handleHoverDay= () => {
    setShowPanel(true);
  };

  const handleMouseLeave = () => {
    setShowPanel(false); // Oculta el panel cuando el mouse sale del contenedor
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
          onChange={(newValue) => setValue(newValue)}
          loading={isLoading}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: (props) => <ServerDay {...props} onHoverDay={handleHoverDay} />,
          }}
          slotProps={{
            day: {
              highlightedDays,
            },
          }}
          sx={{
            minWidth: 370, // Ajusta el tamaño general del calendario
            minHeight: 370,
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
            border: '1px black solid',
            borderRadius: 5,
            p: '10px',
            overflow:'visible',
            margin:isMobile?'70px auto 0 auto':'0 0 0 auto'
          }}
        />
      </LocalizationProvider>
        <Paper
          elevation={3}
          sx={{
            padding: '16px',
            backgroundColor: 'white',
            width:'200px',
            margin:isMobile?'auto':'0 auto 0 0'
          }}
        >
          <Typography variant="h6">Información del Día</Typography>
          <Typography>{`Fecha: ${value.format('DD-MM-YYYY')}`}</Typography>
          <Button variant="contained" sx={{ mt: 2 }}>
            Acción
          </Button> 
        </Paper>
    
    </Box>
  );
}
