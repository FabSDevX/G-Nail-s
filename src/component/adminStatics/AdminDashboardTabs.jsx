import React, { useState } from 'react';
import { Container, Paper, Typography, Tabs, Tab, Box } from '@mui/material';
import PropTypes from 'prop-types';
import AdminDashboardVisits from './AdminDashboardVisits';
import AdminDashboardCourseSelections from './AdminDashboardCourseSelections';  // Componente para selecciones de cursos

// TabPanel para manejar el contenido de los tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const AdminDashboardTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container 
      sx={{ 
        mt: 4, 
        mb: 4, 
        px: { xs: 2, sm: 4, md: 6 },  // Ajuste del padding horizontal para distintos tamaños de pantalla
        maxWidth: { xs: '100%', sm: '95%', md: '90%' }  // Ajuste dinámico del ancho del contenedor
      }}
    >  
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontSize: { xs: '1.5rem', sm: '2rem' }  // Ajuste del tamaño de la fuente según el tamaño de la pantalla
        }}
      >
        Panel de Administración
      </Typography>
      <Paper 
        sx={{ 
          p: { xs: 1, sm: 2 },  // Ajuste del padding para móviles
          display: 'flex', 
          flexDirection: 'column',
          boxShadow: { xs: 1, sm: 3 },  // Sombra más suave en pantallas pequeñas
          maxWidth: '100%'  // Evita que el contenido quede limitado
        }}
      >
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="dashboard tabs"
          variant="scrollable"  // Hace los tabs "scrollables" en pantallas pequeñas
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minWidth: { xs: 80, sm: 120 },  // Ajuste del ancho mínimo de cada tab
              fontSize: { xs: '0.8rem', sm: '1rem' },  // Ajuste de tamaño de letra en los tabs
            },
          }}
        >
          <Tab label="Visitas" {...a11yProps(0)} />
          <Tab label="Selecciones de Cursos" {...a11yProps(1)} />
        </Tabs>

        {/* Paneles de los tabs */}
        <TabPanel value={value} index={0}>
          <AdminDashboardVisits />  {/* Tab de visitas */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AdminDashboardCourseSelections />  {/* Tab de selecciones de cursos */}
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default AdminDashboardTabs;
