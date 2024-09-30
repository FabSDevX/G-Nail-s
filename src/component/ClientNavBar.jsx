import { AppBar, Toolbar, IconButton, Box, Stack, Button, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { AutoAwesome } from '@mui/icons-material';  
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


export const ClientNavBar = () => {

    const navigate = useNavigate();

    const [anchorElement, setAnchorElement] = useState(null);
    const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

    const navBarFirstVersionDisplay = useMediaQuery('(min-width:715px)');

    const navBarSecondVersionDisplay = useMediaQuery('(max-width:715px)');


    const availableCourses = [
        { text: 'Cursos disponibles', path: '/admin/contact' },
        { text: 'Cursos programados', path: '/admin/carousel' },
    ];

    const handleOpenCoursesMenu = (event) => {

        if (mobileMenuAnchor) {
            setMobileMenuAnchor(null);
        }

        setAnchorElement(event.currentTarget);
    }

    const handleCloseCoursesMenu = () => {
        setAnchorElement(null);
    };

    const handleMobileMenuClick = (event) => {
        
        if (anchorElement) {
            setAnchorElement(null);
        }
        setMobileMenuAnchor(event.currentTarget);
    }

    const handleMobileMenuClose = () => {
        setMobileMenuAnchor(null);
    }


    useEffect(() => {
        const handleResize = () => {
            if (anchorElement || mobileMenuAnchor) {
                handleCloseCoursesMenu();
                handleMobileMenuClose();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [anchorElement, mobileMenuAnchor]);

    return (
        <Box>
            <AppBar position="fixed"  style={{ backgroundColor: '#F1D9DD', overflow:'hidden'}}>
                <Toolbar style={{ minHeight: '80px', padding: '0 24px' }}>
                    <Box>
                        <IconButton size='medium' edge='start' color='inherit' aria-label='logo' disableRipple 
                            style={{ padding: 0 }}
                            onClick={() => navigate('/')}
                        >
                            <img src="/LOGO_GNAILS_rezi.png" alt="Logo" style={{ height: '55px', width: '100px' }} />
                        </IconButton>
                    </Box>
                    {/* Menú responsivo en pantallas pequeñas */}
                    <Box sx={{ display: navBarSecondVersionDisplay ? 'flex' : 'none' }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="mobile-menu"
                            aria-haspopup="true"
                            onClick={handleMobileMenuClick}
                            color="inherit"
                        >
                            <MenuIcon  sx={{ color:'black', height: '35px', width: '35px'}}/>
                        </IconButton>
                        <Menu
                            id="mobile-menu"
                            anchorEl={mobileMenuAnchor}
                            keepMounted
                            open={Boolean(mobileMenuAnchor)}
                            onClose={handleMobileMenuClose}
                            slotProps={{
                                paper: {
                                    sx: {
                                        backgroundColor: '#FFecF2', 
                                    },
                                },
                            }}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <MenuItem key= 'option1' onClick={() => navigate('/contacto')} >Contáctenos</MenuItem>
                            <MenuItem key='option2' onClick={() => navigate('/AboutUs')}>Sobre nosotros</MenuItem>
                            <MenuItem>Cursos Disponibles</MenuItem>
                            <MenuItem>Cursos ya programados</MenuItem>
                        </Menu>
                    </Box>
                    
                    {/* Botones en pantallas grandes */}
                    <Box sx={{ ml: '1.5%', mr:'0px',flexGrow: 1, display: navBarFirstVersionDisplay ? 'flex' : 'none'}}>
                        <Stack direction='row' spacing={0.5}>

                            <Button color="inherit" sx={{ color: 'black'}} onClick={() => navigate('/contacto')} >Contáctenos </Button>
                            <Button color="inherit" sx={{ color: 'black' }} onClick={() => navigate('/AboutUs')}> Sobre nosotros </Button>
                            <Button color="inherit" id="resources-button" onClick={handleOpenCoursesMenu} sx={{ color: 'black' }}> 
                                Nuestros Cursos {Boolean(anchorElement) ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </Button>
                        </Stack>
                    </Box>

                    {/* Menú de recursos */}
                    <Box sx={{ display: { xs: 'flex', sm: 'none' }}}>
                        <Menu
                            id='courses-menu'
                            anchorEl={anchorElement}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElement)}
                            onClose={handleCloseCoursesMenu}
                            slotProps={{
                                paper: {
                                    sx: {
                                        backgroundColor: '#FFecF2', 
                                    },
                                },
                            }}
                        >
                            {availableCourses.map((item, index) => (
                                <MenuItem key={index} onClick={() => navigate(item.path)}>
                                    <Typography sx={{ textAlign: 'center' }}>{item.text}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ml:'auto'}}>
                        <IconButton size='medium' edge='start' color='inherit' aria-label='logo'>
                            <AutoAwesome sx={{ color: 'black', fontSize: '38px' }} />  {/* Aquí el nuevo icono */}
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}