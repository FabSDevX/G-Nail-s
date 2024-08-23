import { Box, Button } from "@mui/material";
import { deleteDocumentById, getAllDocuments } from "../../../utils/firebaseDB";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AddBtn } from "../../../component/courseAdmin/AddBtn";
import { AdminSectionLayout } from "../../../layout/AdminSectionLayout";
import ModalContainer from "../../../component/ModalContainer";
import { useState } from "react";
import { CourseAddEdit } from "../../../component/courseAdmin/CourseAddEdit";
import { useEffect } from "react";
import editPencil from "../../../assets/editPencil.svg";
import deleteTrashCan from "../../../assets/deleteTrashcan.svg";
import { ConfirmationDialog } from "../../../component/ConfirmationDialog";
import { Toaster } from "sonner";
import { promiseToast } from "../../../utils/toast";
const courses = await getAllDocuments("Course");

export function CourseAdmin() {
  const [actualUid, setActualUid] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [handleDialog, setHandleDialog] = useState(false);
  useEffect(() => {
    if (!openModal) {
      setActualUid(null);
      setIsEditing(false);
    }
  }, [openModal]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "First name",
      width: 150,
      editable: false,
    },
    {
      field: "smallDescription",
      headerName: "Last name",
      width: 150,
      editable: false,
    },
    {
      field: "largeDescription",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: false,
    },
    {
      field: "hours",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "edit",
      headerName: "Editar",
      width: 58,
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
    {
      field: "delete",
      headerName: "Borrar",
      width: 58,
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

  // const VISIBLE_FIELDS = Object.keys(courses[0]);

  function handleDelete() {
    promiseToast(
      async () => {
        await deleteDocumentById("Course", actualUid, true);
        setActualUid(null);
      },
      "Curso borrado correctamente",
      "Error"
    );
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

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={courses}
          columns={columns}
          slots={{
            toolbar: GridToolbar,
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      <ModalContainer
        open={openModal}
        handleClose={() => setOpenModal(false)}
        additionalStyles={{
          width: "70vw",
          height: "76vh",
          padding: "0",
          border: "none",
          borderRadius: "20px",
          overflow: "auto",
        }}
      >
        <CourseAddEdit isEditingParam={isEditing} uidParam={actualUid} />
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
