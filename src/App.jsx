import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./hooks/authAdmin/useAuth";
import ProtectedRoute from "./hooks/authAdmin/ProtectedRoute";
import ClientHome from "./page/client/ClientHome";
import {Contact} from "./page/Contact/Contact";
import Login from "./component/adminLogin/Login";
import AdminManagement from "./page/admin/managementUser/adminManagement";
import {AdminNavBar} from "./component/AdminNavBar";

import NotFound from "./page/notFound/NotFound";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas para la parte de clientes */}
          <Route path="/" element={<ClientHome />} />

          {/* Ruta de autenticación */}
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas para la parte de administración */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/management" element={<AdminManagement />} />
            <Route path="/admin/navbar" element={<AdminNavBar />} />
            <Route path="/contacto" element={<Contact />} />
          </Route>

          {/* Ruta para manejar páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
