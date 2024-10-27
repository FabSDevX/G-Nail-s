import React, { useState } from 'react';
import { Box, Button } from "@mui/material";
import propTypes from "prop-types";
import { useWishlist } from "../../hooks/WishlistContext";
import { getDocumentById, incrementCourseSelectionCount } from "../../utils/firebaseDB";
import { StatusSnackbar } from "../../component/managementAdmin/StatusSnackbar";

export function WishListButton({ isFlipped,id }) {
  const { wishlistItems, addToWishlist } = useWishlist();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  async function handleAddToWishlist() {
    try {
      const courseData = await getDocumentById("Course", id);

      if (courseData) {
        const courseExists = wishlistItems.find(course => course.courseId === id);

        if (!courseExists) {
          const newCourse = {
            courseId: id,
            name: courseData.name,
            numLessons: courseData.numLessons,
          };
          addToWishlist(newCourse);

          // snackbar de éxito
          setSnackbarMessage("Curso agregado a la wishlist correctamente");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);

          console.log("Curso agregado a la wishlist correctamente:", newCourse);

          // Actualizar o crear el registro en `course_selections`
          const today = new Date().toISOString().split('T')[0];
          await incrementCourseSelectionCount(id, courseData.name, today);

          console.log("Se ha incrementado el contador de selecciones en course_selections");
        } else {
          setSnackbarMessage("El curso ya está en la wishlist");
          setSnackbarSeverity("warning");
          setSnackbarOpen(true);
        }
      } else {
        console.log("El curso no existe en Firebase");
      }
    } catch (error) {
      console.error("Error al agregar el curso a la wishlist:", error);
      setSnackbarMessage("Error al agregar el curso a la wishlist");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleAddToWishlist}
        sx={{
          background: "var(--secondary-color)",
          padding: "15px",
          boxSizing: "border-box",
          color: "black",
          borderRadius: "0",
          "&:hover": {
            border: "none",
            background: "var(--primary-color)",
            color: "white",
          },
          "&:focus": {
            outline: "none",
          },
        }}
        fullWidth
        size="large"
      >
        <Box
          sx={{
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s",
            textAlign: "center",
          }}
        >
          ARMA TU CURSO
        </Box>
      </Button>

      {/* Componente StatusSnackbar para mostrar feedback al usuario */}
      <StatusSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleSnackbarClose}
      />
    </>
  );
}

WishListButton.propTypes = {
  id: propTypes.string.isRequired,
  isFlipped: propTypes.bool.isRequired,
  title: propTypes.string.isRequired,
  lessons: propTypes.number.isRequired,
};
