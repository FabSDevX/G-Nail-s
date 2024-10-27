import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import VisitsChart from './VisitsChart';  // Componente de gráfico modularizado
import VisitsTable from './VisitsTable';  // Componente de tabla modularizado
import { getVisitsByDateRange } from '../../utils/firebaseDB';

const AdminDashboardVisits = () => {
  const [startDate, setStartDate] = useState(dayjs().subtract(30, 'day'));
  const [endDate, setEndDate] = useState(dayjs());
  const [visitData, setVisitData] = useState([]);

  const fetchVisitData = async (startDate, endDate) => {
    try {
      const startTimestamp = startDate.toDate();
      const endTimestamp = endDate.toDate();
      const visits = await getVisitsByDateRange(startTimestamp, endTimestamp);

      const formattedData = visits.map(visit => ({
        date: dayjs(visit.date).format('DD-MM-YY'),
        visits: visit.visit_count
      }));

      setVisitData(formattedData);
    } catch (error) {
      console.error("Error fetching visit data:", error);
    }
  };

  useEffect(() => {
    fetchVisitData(startDate, endDate);
  }, [startDate, endDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <Typography variant="h4" gutterBottom component="div">
      Panel de vistas de la web
      </Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <DatePicker
            label="Fecha de inicio"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            slotProps={{
              textField: {
                fullWidth: true
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DatePicker
            label="Fecha de fin"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            slotProps={{
              textField: {
                fullWidth: true
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button variant="contained" onClick={() => fetchVisitData(startDate, endDate)} fullWidth sx={{ height: '100%' }}>
            Actualizar Datos
          </Button>
        </Grid>
      </Grid>
      <VisitsChart data={visitData} dataKey="visits" />
      <VisitsTable data={visitData} label="Visitas" dataKey="visits" />
    </LocalizationProvider>
  );
};

export default AdminDashboardVisits;
