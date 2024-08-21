import { Box } from "@mui/material";
import { getAllDocuments } from "../../../utils/firebaseDB";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AddBtn } from "../../../component/courseAdmin/addBtn";
import { AdminSectionLayout } from "../../../layout/AdminSectionLayout";

const courses = await getAllDocuments("Course");

export function CourseAdmin() {
  if (courses.length < 0) return;

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
  ];

  const VISIBLE_FIELDS = Object.keys(courses[0]);
  console.log(courses);
  return (
    <AdminSectionLayout id={"courses-admin"} title={"Cursos"}>
      <AddBtn addFunction={() => console.log("Hola")} />

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
    </AdminSectionLayout>
  );
}
