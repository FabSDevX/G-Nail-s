import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./hooks/authAdmin/useAuth";
import ProtectedRoute from "./hooks/authAdmin/ProtectedRoute";
import ClientHome from "./page/client/ClientHome";
import { Contact } from "./page/Contact/Contact";
import Login from "./component/adminLogin/Login";
import AdminManagement from "./page/admin/managementUser/adminManagement";
import NotFound from "./page/notFound/NotFound";
import AdminLayout from "./utils/layout/AdminLayout";
import ClientLayout from "./utils/layout/ClientLayout";
import ContactAdmin from "./page/admin/contactAdmin/ContactAdmin";
import { Calendario } from "./page/Calendario/Calendario";
import { CarouselAdmin } from "./page/admin/carousel-admin/CarouselAdmin";
import { FormAgenda } from "./page/Calendario/FormAgenda";
import Reservas from "./store/useExample";
import { CourseAdmin } from "./page/admin/courseAdmin/CourseAdmin";
import AdminDashboard from "./page/admin/dashBoard-Statics/AdminDashboard";
import { useEffect } from "react";
import { trackVisit } from "./utils/firebaseDB";
import DevelopersList from "./page/devsInfo/DevelopersList";
import AboutUs from "./page/AboutUs/AboutUs";
import { CourseCard } from "./component/CourseCard/CourseCard";
import Course from "./page/course/Course";
import CourseScheduled from "./page/course/CourseScheduled";
import { WishlistProvider } from "./hooks/WishlistContext";
// Componente para manejar el tracking de rutas públicas
function TrackPublicRoutes() {
  const location = useLocation(); // Hook para obtener la ruta actual

  useEffect(() => {
    if (location.pathname === "/homepage") {
      trackVisit();
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <TrackPublicRoutes />
        <Routes>
          {/* Rutas públicas para la parte de clientes */}
          <Route
            element={
              <WishlistProvider>
                <ClientLayout />
              </WishlistProvider>
            }
          >
            <Route path="/" element={<ClientHome />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/developers" element={<DevelopersList />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route
              path="/pruebas"
              element={
                <CourseCard
                  title="Nada"
                  shortDescription="Corto"
                  lessonHours={2}
                  largeDescription="Largo"
                  img="https://firebasestorage.googleapis.com/v0/b/g-nails.appspot.com/o/courses%2F3d74703f-930a-4df5-a802-05888f342116?alt=media&token=47b36c13-7e30-4915-a211-2e60f6e392ba"
                />
              }
            />
            <Route path="/cursos" element={<Course />} />
            <Route path="/cursosAgendados" element={<CourseScheduled />} />
          </Route>

          {/* Ruta de autenticación */}
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas para la parte de administración */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/management" element={<AdminManagement />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/contact" element={<ContactAdmin />} />
              <Route path="/admin/courses" element={<CourseAdmin />} />
              <Route path="/admin/calendar" element={<Calendario />} />
              <Route path="/admin/redux/example" element={<Reservas />} />
              <Route path="/admin/calendar/course/:id?" element={<FormAgenda />} />
              <Route path="/admin/carousel" element={<CarouselAdmin />} />
            </Route>
          </Route>

          {/* Ruta para manejar páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
