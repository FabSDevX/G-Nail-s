import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VisitsChart = ({ data, dataKey }) => (
    <ResponsiveContainer
        width="100%"
        height={300}
        maxWidth={window.innerWidth < 600 ? "100%" : "80%"}  // Para pantallas móviles, ocupamos el 100% del ancho
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
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKey} fill="#8884d8" />
        </BarChart>
    </ResponsiveContainer>
);

export default VisitsChart;
