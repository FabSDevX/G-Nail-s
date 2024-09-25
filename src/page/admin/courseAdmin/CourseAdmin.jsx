import { Box } from "@mui/material";
import { deleteDocumentById, getAllDocuments } from "../../../utils/firebaseDB";
import { AddBtn } from "../../../component/courseAdmin/AddBtn";
import { AdminSectionLayout } from "../../../layout/AdminSectionLayout";
import { useState } from "react";
import { CourseAddEdit } from "../../../component/courseAdmin/CourseAddEdit";
import { useEffect } from "react";
import { ConfirmationDialog } from "../../../component/ConfirmationDialog";
import { Toaster } from "sonner";
import { promiseToast } from "../../../utils/toast";
import { courseModel } from "../../../model/model";
import noImageBackground from "../../../assets/noImageBackground.svg";
import ModalContainer from "../../../component/ModalContainer";
import ReutilizableDataGrid from "../../../component/courseAdmin/ReutilizableDataGrid";
import CardModal from "../../../component/courseAdmin/CardModal";
import getColumns from "../../../component/courseAdmin/handleCourseData";

export function CourseAdmin() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(courseModel);
  const [selectedImg, setSelectedImg] = useState(noImageBackground);
  const [isCourseUpdated, setIsCourseUpdated] = useState(false);
  const [actualUid, setActualUid] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openCardModal, setOpenCardModal] = useState(false);
  const [handleDialog, setHandleDialog] = useState(false);
  const refreshCourses = async () => {
    const courseValues = await getAllDocuments("Course");
    setCourses(courseValues);
  };

  useEffect(() => {
    refreshCourses();
  }, []);

  useEffect(() => {
    if (isCourseUpdated) {
      refreshCourses();
      setIsCourseUpdated(false);
    }
  }, [isCourseUpdated]);

  useEffect(() => {
    setIsCourseUpdated(false);
    if (!openModal) {
      setActualUid(null);
      setIsEditing(false);
    }
    if (!openCardModal) {
      setSelectedImg(noImageBackground);
      setSelectedCourse(courseModel);
    }
  }, [openModal, openCardModal]);

  const columns = getColumns(
    setSelectedImg,
    setSelectedCourse,
    setOpenCardModal,
    setActualUid,
    setIsEditing,
    setOpenModal,
    setHandleDialog
  );

  async function handleDelete() {
    try {
      promiseToast(
        async () => {
          await deleteDocumentById("Course", actualUid, true);
          setActualUid(null);
        },
        "Curso borrado correctamente",
        "Error"
      );
      setIsCourseUpdated(true);
    } catch (error) {
      console.error("Deleting course problem:", error);
    }
  }

  return (
    <AdminSectionLayout id={"courses-admin"} title={"Cursos"}>
      <AddBtn
        addFunction={() => {
          setActualUid(null);
          setIsEditing(false);
          setOpenModal(true);
        }}
      />

      <Box sx={{ width: "100%" }}>
        <ReutilizableDataGrid
          columns={columns}
          rows={courses}
          hiddenRowsJson={{ id: false, img: false }}
        />
      </Box>

      <ModalContainer
        open={openModal}
        disableBackdropClose = {true}
        additionalStyles={{
          width: "70vw",
          maxWidth: "1444px",
          height: {
            xs: "76vh",
          },
          padding: "0",
          border: "none",
          borderRadius: "20px",
          overflow: "auto",
        }}
      >
        <CourseAddEdit
          isEditingParam={isEditing}
          uidParam={actualUid}
          handleStateAction={setIsCourseUpdated}
          handleClose={() => setOpenModal(false)}
        />
      </ModalContainer>

      <ConfirmationDialog
        agreedFuntion={() => handleDelete()}
        state={[handleDialog, setHandleDialog]}
        modalTitle={"Seguro de querer eliminar este curso?"}
      />
      <Toaster richColors />
      <CardModal
        name={selectedCourse["name"]}
        img={selectedImg}
        lessonHours={Number(selectedCourse["numLessons"])}
        largeDescription={selectedCourse["largeDescription"]}
        shortDescription={selectedCourse["smallDescription"]}
        useStateModal={[openCardModal, setOpenCardModal]}
      />
    </AdminSectionLayout>
  );
}
