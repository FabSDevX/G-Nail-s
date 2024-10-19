import { Box, Button } from "@mui/material";
import propTypes from "prop-types";
import { getDocumentById, incrementCourseSelectionCount } from "../../utils/firebaseDB";

export function WishListButton({ isFlipped, title, lessons, id }) {
  
  async function handleAddToWishlist() {
    try {
      const courseData = await getDocumentById("Course", id);
      
      if (courseData) {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        
        const courseExists = wishlist.find(course => course.courseId === id);
        
        if (!courseExists) {
          const newCourse = {
            courseId: id,
            name: courseData.name,
            numLessons: courseData.numLessons,
          };
          wishlist.push(newCourse);
          localStorage.setItem("wishlist", JSON.stringify(wishlist));

          console.log("Curso agregado a la wishlist correctamente:", newCourse);

          // Actualizar o crear el registro en `course_selections`
          const today = new Date().toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
          await incrementCourseSelectionCount(id, courseData.name, today);
          
          console.log("Se ha incrementado el contador de selecciones en course_selections");
        } else {
          console.log("El curso ya está en la wishlist");
        }
      } else {
        console.log("El curso no existe en Firebase");
      }
    } catch (error) {
      console.error("Error al agregar el curso a la wishlist:", error);
    }
  }

  return (
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
  );
}

WishListButton.propTypes = {
  id: propTypes.string.isRequired,
  isFlipped: propTypes.bool.isRequired,
  title: propTypes.string.isRequired,
  lessons: propTypes.number.isRequired
};