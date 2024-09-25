import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const VisitsTable = ({ data, label, dataKey }) => (
  <TableContainer component={Paper} sx={{ mt: 4 }}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Fecha</TableCell>
          <TableCell align="right">{label}</TableCell>  {/* Título dinámico para la columna */}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.date} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">{row.date}</TableCell>
            <TableCell align="right">{row[dataKey]}</TableCell>  {/* Valor dinámico */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default VisitsTable;
