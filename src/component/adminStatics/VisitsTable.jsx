import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const VisitsTable = ({ data, label, dataKey }) => {
  // Determinamos si los datos incluyen el campo `course_name`
  const hasCourseName = data.some(row => row.course_name);

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            {hasCourseName && <TableCell>Nombre del Curso</TableCell>}
            <TableCell align="right">{label}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.date} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{row.date}</TableCell>
              {hasCourseName && (
                <TableCell>{row.course_name}</TableCell>
              )}
              <TableCell align="right">{row[dataKey]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VisitsTable;