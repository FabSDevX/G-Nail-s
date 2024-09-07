import React, { useState } from "react";
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
  const [errorMessage, setErrorMessage] = useState("");

  const signInWithGoogle = async () => {
    setErrorMessage(""); 

    try {
      // Fuerza a Google a mostrar la ventana de selección de cuentas
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      });

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const isAllowed = await isUserAllowed(user.email);
      if (!isAllowed) {
        setErrorMessage("Acceso denegado. Usuario no autorizado.");
        await auth.signOut(); // Ensure user is signed out
      } else {
        setUser(user);
        navigate("/");
      }
    } catch (error) {
      setErrorMessage("Error en el login. Inténtalo de nuevo.");
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
        src="/LOGO_GNAILS_rezi.png"
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
      {errorMessage && (
        <Typography color="error" variant="body2" sx={{ marginTop: theme.spacing(2) }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default Login;
