import { Box, Button } from "@mui/material";
import { getAllDocuments } from "../../../utils/firebaseDB";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AddBtn } from "../../../component/courseAdmin/addBtn";
import { AdminSectionLayout } from "../../../layout/AdminSectionLayout";
import ModalContainer from "../../../component/ModalContainer";
import { useState } from "react";
import { CourseAddEdit } from "../../../component/courseAdmin/CourseAddEdit";
import { useEffect } from "react";
import editPencil from "../../../assets/editPencil.svg"
const courses = await getAllDocuments("Course");

export function CourseAdmin() {
  const [actualUid, setActualUid] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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
            minWidth:"48px",
            "&:hover":{
              background:"var(--primary-color);"
            },
            "&:focus":{
              border:"none"
            }
          }}
          onClick={() => {
            setActualUid(params.row.id);
            setIsEditing(true);
            setOpenModal(true);
          }}
        >
          <Box component="img" sx={{width:"32px",}} src={editPencil} alt="Pencil image" />
        </Button>
      ),
    },
  ];

  const VISIBLE_FIELDS = Object.keys(courses[0]);
  console.log(courses);
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
          width: "auto",
          height: "auto",
          padding: "0",
          border: "none",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <CourseAddEdit isEditingParam={isEditing} uidParam={actualUid} />
      </ModalContainer>
    </AdminSectionLayout>
  );
}
