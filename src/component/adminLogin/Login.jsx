import React from "react";
import { Button, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, googleProvider } from '../../../firebase';
import { useAuth } from "../../hooks/authAdmin/useAuth";
import { isUserAllowed } from "../../utils/firebaseDB";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const isAllowed = await isUserAllowed(user.email);
      if (!isAllowed) {
        console.error("Acceso denegado. Usuario no autorizado.");
        auth.signOut();
      } else {
        setUser(user);
        navigate("/");
      }
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        padding: theme.spacing(2),
      }}
    >
      <Typography 
        variant={isMobile ? "h6" : "h5"} 
        gutterBottom
        sx={{ marginBottom: theme.spacing(2) }}
      >
        Bienvenido al sistema Admin
      </Typography>
      <Box
        component="img"
        src="/ruta/logo.png"
        alt="Logo Nails Professional Academy"
        sx={{
          width: isMobile ? "150px" : "200px",
          marginBottom: theme.spacing(3),
          maxWidth: "100%",
          height: "auto",
        }}
      />
      <Button
        variant="contained"
        startIcon={<GoogleIcon />}
        onClick={signInWithGoogle}
        fullWidth={isMobile}
        sx={{
          backgroundColor: "#f5a5a5",
          color: "#000",
          "&:hover": {
            backgroundColor: "#f28282",
          },
          padding: theme.spacing(1.5),
          fontSize: isMobile ? "0.875rem" : "1rem",
        }}
      >
        Iniciar Sesión con Google
      </Button>
    </Box>
  );
};

export default Login;