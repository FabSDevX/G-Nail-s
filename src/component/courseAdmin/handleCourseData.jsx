import { Box, Button } from "@mui/material";
import deleteTrashCan from "../../assets/deleteTrashcan.svg"
import editPencil from "../../assets/editPencil.svg";
import preview from "../../assets/preview.svg";
import { getImageByUrl } from "../../utils/firebaseDB";
import ExpandableCell from "./ExpandableCell";
function getColumns(setSelectedImg, setSelectedCourse, setOpenCardModal,setActualUid, setIsEditing, setOpenModal, setHandleDialog){
    return [
        { field: "id", headerName: "ID", width: 90, resizable: false, hideable: false, filterable:false },
        { field: "name", headerName: "Nombre", width: 150, renderCell: (params) => <ExpandableCell {...params} />,},
        { field: "smallDescription", headerName: "Descripcion corta", width: 200, renderCell: (params) => <ExpandableCell {...params} />,},
        { field: "largeDescription", headerName: "Descripcion larga", width: 200, renderCell: (params) => <ExpandableCell {...params} />,},
        { field: "hours", headerName: "Horas", width: 80, type: "number", resizable: false,},
        { field: "img", headerName:"Imagen", width: 80, hideable: false, filterable:false},
        { field: "categories", headerName: "Categorías", width: 150, sortable: false,
        renderCell: (params) => (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {params.value.map((category, index) => (
                <span key={index} style={{ background: "#e0e0e0", borderRadius: "5px", padding: "2px 5px" }}>
                  {category}
                </span>
              ))}
            </div>
          ),
        },
        { field: "view", headerName: "Ver", width: 70, resizable: false, hideable: false, sortable: false, filterable:false,
          renderCell: (params) => (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "var(--preview-changes-color);",
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
                const getImageUrl = async () => {const imgUrl = await getImageByUrl(params.row.img)
                                                setSelectedImg(imgUrl);};
                
                getImageUrl();
                const paramCourse = {
                  "name": params.row.name,
                  "smallDescription": params.row.smallDescription,
                  "largeDescription": params.row.largeDescription,
                  "numLessons": params.row.hours
                }
                setSelectedCourse(paramCourse);
                setOpenCardModal(true);
              }}
            >
              <Box
                component="img"
                sx={{ width: "32px" }}
                src={preview}
                alt="Preview image"
              />
            </Button>
            )
        },
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
}

export default getColumns;