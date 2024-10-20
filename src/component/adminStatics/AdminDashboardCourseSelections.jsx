import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import VisitsChart from './VisitsChart';
import VisitsTable from './VisitsTable';
import { getCourseSelectionsByDateRange } from '../../utils/firebaseDB';

const AdminDashboardCourseSelections = () => {
    const [startDate, setStartDate] = useState(dayjs().subtract(30, 'day'));
    const [endDate, setEndDate] = useState(dayjs());
    const [selectionData, setSelectionData] = useState([]);

    const fetchCourseSelectionData = async (startDate, endDate) => {
        try {
            const startTimestamp = startDate.toDate();
            const endTimestamp = endDate.toDate();

            const selections = await getCourseSelectionsByDateRange(startTimestamp, endTimestamp);

            // Formateo de los datos obtenidos para el dashboard
            const formattedData = selections.map(selection => ({
                date: dayjs(selection.date).format('DD/MM/YY'),
                selections: selection.selection_count,
                course_name: selection.course_name
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
            <VisitsChart data={selectionData} dataKey="selections" chartType="courseSelections" />
            <VisitsTable data={selectionData} label="Selecciones" dataKey="selections" />
        </LocalizationProvider>
    );
};

export default AdminDashboardCourseSelections;
