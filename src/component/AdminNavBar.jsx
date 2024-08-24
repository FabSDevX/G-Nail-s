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
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export const AdminNavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Información de contacto', path: '/contacto' },
    { text: 'Imágenes del carrusel', path: '/carrusel' },
    { text: 'Cursos', path: '/cursos' },
    { text: 'Estadísticas', path: '/estadisticas' },
    { text: 'Usuarios administradores', path: '/usuarios' },
    { text: 'Calendario', path: '/calendario' },
    { text: 'Consultas realizadas', path: '/consultas' },
  ];

  const CustomListItemButton = styled(ListItemButton)({
    color: '#000000',
    '&:hover': {
      backgroundColor: '#F2B0BA',
    },
  });

  return (
    <div>
      <AppBar
        position="static"
        style={{ background: 'linear-gradient(90deg, rgba(255,192,203,1) 0%, rgba(255,182,193,1) 100%)' }}
      >
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <img src="logo.png" alt="Logo" style={{ height: isMobile ? '30px' : '40px' }} />
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon style={{ color: '#000000' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ style: { backgroundColor: '#F1D9DD' } }}
      >
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item, index) => (
              <CustomListItemButton key={index} onClick={() => navigate(item.path)}>
                <ListItemText primary={item.text} />
              </CustomListItemButton>
            ))}
          </List>
          <Divider />
        </div>
      </Drawer>
    </div>
  );
};
