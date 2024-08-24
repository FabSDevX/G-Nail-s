import { Box, Button } from "@mui/material";
import { deleteDocumentById, getAllDocuments } from "../../../utils/firebaseDB";
import { AddBtn } from "../../../component/courseAdmin/AddBtn";
import { AdminSectionLayout } from "../../../layout/AdminSectionLayout";
import { useState } from "react";
import { CourseAddEdit } from "../../../component/courseAdmin/CourseAddEdit";
import { useEffect } from "react";
import { ConfirmationDialog } from "../../../component/ConfirmationDialog";
import { Toaster } from "sonner";
import { promiseToast } from "../../../utils/toast";
import ModalContainer from "../../../component/ModalContainer";
import deleteTrashCan from "../../../assets/deleteTrashcan.svg";
import editPencil from "../../../assets/editPencil.svg";
import ExpandableCell from "../../../component/courseAdmin/ExpandableCell";
import ReutilizableDataGrid from "../../../component/courseAdmin/ReutilizableDataGrid";

export function CourseAdmin() {
  const [courses, setCourses] = useState([]);
  const [isCourseUpdated, setIsCourseUpdated] = useState(false);
  const [actualUid, setActualUid] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
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
  }, [openModal]);

  const columns = [
    { field: "id", headerName: "ID", width: 90, resizable: false, hideable: false, filterable:false },
    { field: "name", headerName: "Nombre", width: 150, renderCell: (params) => <ExpandableCell {...params} />,},
    { field: "smallDescription", headerName: "Descripcion corta", width: 200, renderCell: (params) => <ExpandableCell {...params} />,},
    { field: "largeDescription", headerName: "Descripcion larga", width: 200, renderCell: (params) => <ExpandableCell {...params} />,},
    { field: "hours", headerName: "Horas", width: 80, type: "number", resizable: false,},
    { field: "categories", headerName: "Categorías", width: 80, sortable: false,},
    { field: "img", headerName:"Imagen", width: 80, hideable: false, filterable:false},
    { field: "edit", headerName: "Editar", width: 70, resizable: false, hideable: false, sortable: false, filterable:false,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--edit-changes-color);",
            width: "48px",
            minWidth: "48px",
            "&:hover": {
              background: "var(--primary-color);",
            },
            "&:focus": {
              border: "none",
            },
          }}
          onClick={() => {
            setActualUid(params.row.id);
            setIsEditing(true);
            setOpenModal(true);
          }}
        >
          <Box
            component="img"
            sx={{ width: "32px" }}
            src={editPencil}
            alt="Pencil image"
          />
        </Button>
      ),
    },
    { field: "delete", headerName: "Borrar", width: 70, resizable: false, hideable: false, sortable: false, filter:false, filterable:false,
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--delete-color);",
            width: "48px",
            minWidth: "48px",
            "&:hover": {
              background: "var(--primary-color);",
            },
            "&:focus": {
              border: "none",
            },
          }}
          onClick={() => {
            setActualUid(params.row.id);
            setHandleDialog(true);
          }}
        >
          <Box
            component="img"
            sx={{ width: "32px" }}
            src={deleteTrashCan}
            alt="Delete image"
          />
        </Button>
      ),
    },
  ];

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
       <ReutilizableDataGrid columns={columns} rows={courses}/>
      </Box>

      <ModalContainer
        open={openModal}
        handleClose={() => setOpenModal(false)}
        additionalStyles={{
          width: "70vw",
          maxWidth: "1444px",
          height: {
            xs: "76vh",
            sm: "76vh",
            md: "auto",
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
        />
      </ModalContainer>
      <ConfirmationDialog
        agreedFuntion={() => handleDelete()}
        state={[handleDialog, setHandleDialog]}
        modalTitle={"Seguro de querer eliminar este curso?"}
      />
      <Toaster richColors />
    </AdminSectionLayout>
  );
}
