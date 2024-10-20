import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Tooltip personalizado que muestra la fecha, selecciones y nombre del curso si está presente
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const {selections, course_name } = payload[0].payload;
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#ffffff', padding: '10px', border: '1px solid #cccccc' }}>
                <p>{`Fecha: ${label}`}</p>
                {course_name && <p>{`Curso: ${course_name}`}</p>}
                <p>{`Selecciones: ${selections}`}</p>
            </div>
        );
    }

    return null;
};

const VisitsChart = ({ data, dataKey }) => (
    <ResponsiveContainer
        width="100%"
        height={300}
        maxWidth={window.innerWidth < 600 ? "100%" : "80%"}  // Para pantallas móviles el 100% del ancho
    >
        <BarChart
            data={data}
            margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 20,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey={dataKey} fill="#8884d8" />
        </BarChart>
    </ResponsiveContainer>
);

export default VisitsChart;
