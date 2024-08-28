import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    //SPINNER mientras se verifica la autenticación
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Si el usuario no está autenticado, redirigir al login
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
