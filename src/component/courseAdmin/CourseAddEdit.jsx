import { AdminAddEditFormLayout } from "../../layout/AdminAddEditFormLayout";
import { Box, Button, Input, TextField, Typography } from "@mui/material";
import propTypes from "prop-types";
import { AdminFormBtn } from "../AdminFormBtn";
import noImageBackground from "../../assets/noImageBackground.svg";
import { useState } from "react";
import {
  getDocumentById,
  getImageByUrl,
  updateDocumentById,
  upsertDocument,
} from "../../utils/firebaseDB";
import { useEffect } from "react";
import ModalContainer from "../ModalContainer";
import { ConfirmationDialog } from "../ConfirmationDialog";
import { promiseToast } from "../../utils/toast";

const contactTitleInput = {
  padding: "0",
  alignItems: "center",
  marginBottom: "10px",
};

const contactAdminSubTitles = {
  fontSize: "large",
  fontWeight: "600",
  margin: "5px 0 0 5px",
};

const contactInput = {
  width: "100%",
};

export function CourseAddEdit({ uid, isEditing }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [handleDialog, setHandleDialog] = useState(false);
  const [course, setCourse] = useState({
    categories: ["", "", ""],
    hours: 0,
    img: "",
    largeDescription: "",
    name: "",
    "num lessons": 0,
    smallDescription: "",
    views: {
      "2024-August": 0,
    },
  });
  useEffect(() => {
    const fetchCourseData = async () => {
      const response = await getDocumentById("Course", uid);
      //   const imgUrl = await getImageByUrl("courses", "foto.png");
      setCourse(response);
      //   setImg(imgUrl);
    };
    if (isEditing) fetchCourseData();
  }, []);

  useEffect(() => {
    console.log(course);
  }, [course]);

  const handleCategoryChange = (index, value) => {
    const updatedCategories = course.categories;
    updatedCategories[index] = value;
    setCourse({ ...course, categories: updatedCategories });
  };

  function handleSavedChanges() {
    if (isEditing)
      promiseToast(
        upsertDocument("Course", uid, course),
        "Cambios guardado",
        "Error"
      );
    else
      promiseToast(
        upsertDocument("Course", null, course),
        "Agregado con éxito",
        "Error"
      );
  }
  return (
    <AdminAddEditFormLayout>
      <Typography
        sx={{
          fontSize: "x-large",
          fontWeight: "600",
          margin: "15px auto",
        }}
      >
        Información del curso
      </Typography>
      <Box
        className="form-container"
        sx={{
          gap: "70px",
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
            md: "row",
          },
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "40%",
            },
          }}
          className="left-container"
        >
          <Box sx={contactTitleInput}>
            <Typography sx={contactAdminSubTitles}>Nombre</Typography>
            <TextField
              sx={contactInput}
              id="outlined-required"
              value={course.name || ""}
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
            />
          </Box>
          <Box>
            <Typography sx={{ ...contactAdminSubTitles, marginBottom: "5px" }}>
              Descripción corta
            </Typography>
            <Box sx={contactInput}>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-multiline-static"
                multiline
                rows={3}
                inputProps={{ maxLength: 175 }}
                value={course.smallDescription || ""}
                onChange={(e) =>
                  setCourse({ ...course, smallDescription: e.target.value })
                }
              />
              <Typography
                sx={{ color: "gray", opacity: "85%", textAlign: "end" }}
              >
                Max 175 caracteres
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ ...contactAdminSubTitles, marginBottom: "5px" }}>
              Descripción larga
            </Typography>
            <Box sx={contactInput}>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-multiline-static"
                multiline
                rows={4}
                inputProps={{ maxLength: 450 }}
                value={course.largeDescription || ""}
                onChange={(e) =>
                  setCourse({ ...course, largeDescription: e.target.value })
                }
              />
              <Typography
                sx={{ color: "gray", opacity: "85%", textAlign: "end" }}
              >
                Max 450 caracteres
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          className="right-container"
          sx={{
            width: {
              xs: "100%",
              md: "60%",
            },
          }}
        >
          <Box
            className="admin-image-course-section"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Typography sx={{ ...contactAdminSubTitles, marginBottom: "5px" }}>
              Imagen actual
            </Typography>
            <Box
              sx={{
                borderRadius: "20px 20px 0 0",
                height: "160px",
                width: {
                  xs: "200px",
                  sm: "310px",
                },
              }}
              component="img"
              src={course.img || noImageBackground}
            ></Box>
            <Input
              type="file"
              accept="image/*"
              style={{
                display: "none",
              }}
              //   onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))}
            />
            <Button
              onClick={() => {
                document.querySelector('input[type="file"]').click();
              }}
              sx={{
                height: "50px",
                fontSize: "14px",
                borderRadius: "10px",
                background: "var(--edit-changes-color)",
                color: "white",
                border: "none",
                width: {
                  xs: "130px",
                  sm: "170px",
                },
              }}
            >
              Editar
            </Button>
          </Box>
          <Box>
            <Typography
              sx={{
                ...contactAdminSubTitles,
                margin: "10px auto",
                textAlign: "center",
              }}
            >
              Categorías
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <TextField
                sx={{ ...contactInput, width: "100px", height: "40px" }}
                id="outlined-required"
                value={course.categories ? course.categories[0] : ""}
                onChange={(e) => handleCategoryChange(0, e.target.value)}
              />
              <TextField
                sx={{ ...contactInput, width: "100px" }}
                id="outlined-required"
                value={course.categories ? course.categories[1] : ""}
                onChange={(e) => handleCategoryChange(1, e.target.value)}
              />
              <TextField
                sx={{ ...contactInput, width: "100px" }}
                id="outlined-required"
                value={course.categories ? course.categories[2] : ""}
                onChange={(e) => handleCategoryChange(2, e.target.value)}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                ...contactAdminSubTitles,
                marginBottom: "5px",
              }}
            >
              Numero de lecciones
            </Typography>
            <TextField
              sx={{ width: "60px" }}
              type="number"
              id="outlined-required"
              value={course.hours || ""}
              onChange={(e) => setCourse({ ...course, hours: e.target.value })}
            ></TextField>
          </Box>
        </Box>
      </Box>
      <ModalContainer open={open} handleClose={handleClose}>
        <h1>Hola</h1>
      </ModalContainer>

      <ConfirmationDialog
        agreedFuntion={handleSavedChanges}
        state={[handleDialog, setHandleDialog]}
        modalTitle={"Seguro de guardar los cambios?"}
      />
      <AdminFormBtn
        handleOpenPreview={handleOpen}
        handleSaveChanges={setHandleDialog}
      />
    </AdminAddEditFormLayout>
  );
}
CourseAddEdit.propTypes = {
  uid: propTypes.string,
  isEditing: propTypes.bool.isRequired,
};
