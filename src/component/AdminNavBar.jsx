import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


export const AdminNavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };


  //De momento se agregan las rutas de las páginas que se quieren mostrar en el menú
  //Posteriormente se configurara cuando se prepare el Provider de rutas
  const menuItems = [
    { text: 'Información de contacto', path: '/admin/contact' },
    { text: 'Imágenes del carrusel', path: '/admin/carousel' },
    { text: 'Cursos', path: '/admin/courses' },
    { text: 'Estadísticas', path: '/admin/dashboard' },
    { text: 'Usuarios administradores', path: '/admin/management' },
    { text: 'Calendario', path: '/admin/calendar' },
  ];

  const CustomListItemButton = styled(ListItemButton)({
    color: '#000000', // Color del texto negro
    '&:hover': {
      backgroundColor: '#F2B0BA',
    },
  });

  const handleNavigation = (path) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  return (
    <div>
      <AppBar position="static" style={{ background: 'linear-gradient(90deg, rgba(255,192,203,1) 0%, rgba(255,182,193,1) 100%)' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <img src="logo.png" alt="Logo" style={{ height: '40px' }} />
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon style={{ color: '#000000' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)} PaperProps={{ style: { backgroundColor: '#F1D9DD' } }}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item, index) => (
              <CustomListItemButton key={index} onClick={() => handleNavigation(item.path)}>
                <ListItemText primary={item.text} />
              </CustomListItemButton>
            ))}
          </List>
          <Divider />
          {/* Botón de Cerrar Sesión */}
          <Box sx={{ marginTop: 'auto', padding: '16px' }}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleLogOut}
              sx={{
                backgroundColor: '#FF6961',
                '&:hover': {
                  backgroundColor: '#FF4C4C',
                },
              }}
            >
              Cerrar Sesión
            </Button>
          </Box>
        </div>
      </Drawer>
    </div>
  );
};
