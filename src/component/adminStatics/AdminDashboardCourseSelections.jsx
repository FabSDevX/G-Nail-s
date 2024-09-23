import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import VisitsChart from './VisitsChart';  // Reutiliza el componente de gráfico
import VisitsTable from './VisitsTable';  // Reutiliza el componente de tabla
import { getCourseSelectionsByDateRange } from '../../utils/firebaseDB';  // Nueva función en firebaseDB.js

const AdminDashboardCourseSelections = () => {
    const [startDate, setStartDate] = useState(dayjs().subtract(30, 'day'));
    const [endDate, setEndDate] = useState(dayjs());
    const [selectionData, setSelectionData] = useState([]);

    const fetchCourseSelectionData = async (startDate, endDate) => {
        try {
            const startTimestamp = startDate.toDate();
            const endTimestamp = endDate.toDate();
            const selections = await getCourseSelectionsByDateRange(startTimestamp, endTimestamp);

            // Asegúrate de convertir el campo date a un objeto válido de dayjs
            const formattedData = selections.map(selection => ({
                date: dayjs(selection.date.toDate()).format('DD/MM/YY'),  // Convertir el timestamp y formatear la fecha
                selections: selection.selection_count
            }));

            setSelectionData(formattedData);
        } catch (error) {
            console.error("Error fetching course selection data:", error);
        }
    };

    useEffect(() => {
        fetchCourseSelectionData(startDate, endDate);
    }, [startDate, endDate]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <Typography variant="h4" gutterBottom component="div">
                Selecciones de Cursos
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
                    <Button variant="contained" onClick={() => fetchCourseSelectionData(startDate, endDate)} fullWidth sx={{ height: '100%' }}>
                        Actualizar Datos
                    </Button>
                </Grid>
            </Grid>
            <VisitsChart data={selectionData} dataKey="selections" />
            <VisitsTable data={selectionData} label="Selecciones" dataKey="selections" />
        </LocalizationProvider>
    );
};

export default AdminDashboardCourseSelections;
