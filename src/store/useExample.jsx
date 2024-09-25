// src/components/Reservas.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchScheduledCourses, updateScheduledCourses, addScheduledCourses, deleteScheduledCourses } from '../store/slices/ScheduledCoursesSlice';

const Reservas = () => {
  const dispatch = useDispatch();
  const { scheduledCourses, status, error } = useSelector((state) => state.scheduledCourses);
  const [newReserva, setNewReserva] = useState({ courseUID: '', cupo: 0, group: '', dates: [{date:"14-09-2024", hours:1}] });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchScheduledCourses()); // Cargar reservas al montar el componente
    }
  }, [status, dispatch]);

  const handleAddReserva = () => {
    console.log("Insertando: ", newReserva)
    dispatch(updateScheduledCourses({id:null, data:newReserva})).then(() => {
        dispatch(fetchScheduledCourses());
      });
    setNewReserva({ courseUID: '', cupo: 0, group: '', dates: [] }); // Limpiar el formulario
  };

  const handleUpdateReserva = (id) => {
    dispatch(updateScheduledCourses({ id, data:newReserva })).then(() => {
        dispatch(fetchScheduledCourses());
      });
      
  };

  const handleDeleteReserva = (id) => {
    dispatch(deleteScheduledCourses(id)).then(() => {
        dispatch(fetchScheduledCourses());
      });
  };

  if (status === 'loading') return <div>Cargando reservas...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Reservas</h1>
      <table>
          <thead>
              <tr>
              <th>ID</th>
              <th>Course ID</th>
              <th>Group</th>
              <th>Cupos</th>
              <th>Dates</th>
              <th>Action</th>
              <th>Action</th>
              </tr>
          </thead>
          <tbody>
              {scheduledCourses.map(c => (
              <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.courseUID}</td>
                  <td>{c.group}</td>
                  <td>{c.cupo}</td>
                  <td>
                  <ul>
                      {c.dates.map((date, index) => (
                      <li key={index}>
                          {date.date} - {date.hours} hours
                      </li>
                      ))}
                  </ul>
                  </td>
                  <td><button onClick={() => handleDeleteReserva(c.id)}>Eliminar</button></td>
                  <td><button onClick={() => handleUpdateReserva(c.id)}>Editar</button></td>
              </tr>
              ))}
          </tbody>
      </table>

      <h2>Agregar Reserva</h2>
      <input
        type="text"
        value={newReserva.courseUID}
        onChange={(e) => setNewReserva({ ...newReserva, courseUID: e.target.value })}
        placeholder="ID del curso"
      />
      <input
        type="number"
        value={newReserva.cupo}
        onChange={(e) => setNewReserva({ ...newReserva, cupo: e.target.value })}
        placeholder="Cupo"
      />
      <input
        type="text"
        value={newReserva.group}
        onChange={(e) => setNewReserva({ ...newReserva, group: e.target.value })}
        placeholder="Grupo"
      />
      <input
        type="text"
        value={newReserva.dates.join(', ')}
        onChange={(e) => setNewReserva({ ...newReserva, dates: e.target.value.split(', ') })}
        placeholder="Fechas separadas por coma"
      />
      <button onClick={handleAddReserva}>Agregar Reserva</button>
    </div>
  );
};

export default Reservas;
