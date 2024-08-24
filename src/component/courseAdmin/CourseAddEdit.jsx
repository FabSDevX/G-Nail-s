import { AdminAddEditFormLayout } from "../../layout/AdminAddEditFormLayout";
import { Box, Button, Input, TextField, Typography } from "@mui/material";
import propTypes from "prop-types";
import { AdminFormBtn } from "../AdminFormBtn";
import noImageBackground from "../../assets/noImageBackground.svg";
import { useState } from "react";
import {
  getDocumentById,
  getImageByUrl,
  uploadImageByUrl,
  upsertDocument,
} from "../../utils/firebaseDB";
import { useEffect } from "react";
import ModalContainer from "../ModalContainer";
import { ConfirmationDialog } from "../ConfirmationDialog";
import { promiseToast, warningToast } from "../../utils/toast";
import { getActualDate } from "../../utils/date";
import { courseModel } from "../../model/model";
import { CourseCard } from "../CourseCard/CourseCard";

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

export function CourseAddEdit({
  uidParam = null,
  isEditingParam = false,
  handleStateAction,
}) {
  const [isEditing, setIsEditing] = useState(isEditingParam);
  const [uid, setUid] = useState(uidParam);
  const [isImageEdited, setIsImageEdited] = useState(false);
  const [img, setImg] = useState(noImageBackground);
  const [previousImg, setPreviousImg] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [handleDialog, setHandleDialog] = useState(false);
  const textConfirmationToast = isEditing
    ? "Cambios guardados"
    : "Agregado con éxito";
  const textConfirmationModal = isEditing
    ? "Seguro de guardar los cambios?"
    : "Seguro de agregar esta curso?";
  const [course, setCourse] = useState(courseModel);

  //Fetch data of actual uid course
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await getDocumentById("Course", uid);
        const imgUrl = await getImageByUrl(response["img"]);
        setCourse(response);
        setImg(imgUrl);
        setPreviousImg(imgUrl);
      } catch (error) {
        console.error(error);
      }
    };
    if (uid) fetchCourseData();
  }, [uid]);

  const handleCategoryChange = (index, value) => {
    const updatedCategories = course.categories;
    updatedCategories[index] = value;
    setCourse({ ...course, categories: updatedCategories });
  };

  async function fieldsVerifier() {
    try {
      if (!isEditing && !isImageEdited) {
        warningToast("Imagen obligatoria");
        return;
      }
      const handledData = course;
      if (!isEditing)
        handledData["views"] = { [getActualDate("YYYY-MMMM")]: 0 };
      handledData["numLessons"] = course["hours"] * 3;
      if (isImageEdited) {
        const handleImagePath = await uploadImageByUrl(
          img,
          "courses",
          previousImg
        );
        handledData["img"] = handleImagePath;
      }
      setHandleDialog(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSavedChanges() {
    promiseToast(
      async () => {
        const id = await upsertDocument("Course", uid, course);
        setUid(id);
      },
      textConfirmationToast,
      "Error"
    );
    if (!isEditing) setIsEditing(true);
    setIsImageEdited(false);
    handleStateAction(true);
  }

  return (
    <AdminAddEditFormLayout>
      <Typography
        sx={{
          fontWeight: "600",
          color: "var(--admin-title-color);",
          fontSize: {
            xs: "x-large",
            sm: "xx-large",
          },
        }}
      >
        {isEditing ? "Editando curso" : "Creando curso"}
      </Typography>

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
        component="form"
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();
          fieldsVerifier();
        }}
        className="form-container"
      >
        <Box
          sx={{
            gap: "70px",
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "column",
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
                required
                value={course.name || ""}
                inputProps={{ maxLength: 45 }}
                onChange={(e) => setCourse({ ...course, name: e.target.value })}
              />
              <Typography
                sx={{ color: "gray", opacity: "85%", textAlign: "end" }}
              >
                Max 45 caracteres
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ ...contactAdminSubTitles, marginBottom: "5px" }}
              >
                Descripción corta
              </Typography>
              <Box sx={contactInput}>
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-static"
                  multiline
                  required
                  rows={3}
                  inputProps={{ maxLength: 190 }}
                  value={course.smallDescription || ""}
                  onChange={(e) =>
                    setCourse({ ...course, smallDescription: e.target.value })
                  }
                />
                <Typography
                  sx={{ color: "gray", opacity: "85%", textAlign: "end" }}
                >
                  Max 190 caracteres
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography
                sx={{ ...contactAdminSubTitles, marginBottom: "5px" }}
              >
                Descripción larga
              </Typography>
              <Box sx={contactInput}>
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-multiline-static"
                  multiline
                  required
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
              <Typography
                sx={{ ...contactAdminSubTitles, marginBottom: "5px" }}
              >
                Imagen actual
              </Typography>
              <Box
                sx={{
                  borderRadius: "20px 20px 0 0",
                  height: "160px",
                  width: {
                    xs: "250px",
                    sm: "310px",
                  },
                }}
                component="img"
                src={img}
              ></Box>
              <Input
                type="file"
                accept="image/*"
                style={{
                  display: "none",
                }}
                onChange={(e) => {
                  setImg(URL.createObjectURL(e.target.files[0]));
                  setIsImageEdited(true);
                }}
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
                  "&:hover": {
                    border: "none",
                    background: "var(--secondary-color)",
                    color: "black",
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
                  size="small"
                  inputProps={{ maxLength: 15 }}
                  value={course.categories ? course.categories[0] : ""}
                  onChange={(e) => handleCategoryChange(0, e.target.value)}
                />
                <TextField
                  sx={{ ...contactInput, width: "100px" }}
                  id="outlined-required"
                  size="small"
                  inputProps={{ maxLength: 15 }}
                  value={course.categories ? course.categories[1] : ""}
                  onChange={(e) => handleCategoryChange(1, e.target.value)}
                />
                <TextField
                  sx={{ ...contactInput, width: "100px" }}
                  id="outlined-required"
                  size="small"
                  inputProps={{ maxLength: 15 }}
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
                sx={{ width: "70px", textAlign: "center" }}
                type="number"
                id="outlined-required"
                size="small"
                required
                value={course.hours || ""}
                onChange={(e) =>
                  setCourse({ ...course, hours: e.target.value })
                }
              ></TextField>
            </Box>
          </Box>
        </Box>

        <ModalContainer
          open={openModal}
          handleClose={() => setOpenModal(false)}
          additionalStyles={{
            width: "auto",
            height: "auto",
            padding: "0",
            border: "none",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <CourseCard
            title={course["name"]}
            img={img}
            lessonHours={Number(course["hours"])}
            largeDescription={course["largeDescription"]}
            shortDescription={course["smallDescription"]}
          />
        </ModalContainer>
        <ConfirmationDialog
          agreedFuntion={handleSavedChanges}
          state={[handleDialog, setHandleDialog]}
          modalTitle={textConfirmationModal}
        />
        <AdminFormBtn handleOpenPreview={() => setOpenModal(true)} />
      </Box>
    </AdminAddEditFormLayout>
  );
}

CourseAddEdit.propTypes = {
  uidParam: propTypes.string,
  isEditingParam: propTypes.bool.isRequired,
  handleStateAction: propTypes.func.isRequired,
};
