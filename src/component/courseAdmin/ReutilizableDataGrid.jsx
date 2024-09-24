import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { esES } from "@mui/x-data-grid/locales";
import CustomNoRowsOverlay from "./CustomNoRowsOverlay";
import propTypes from "prop-types";

function ReutilizableDataGrid({ rows, columns, hiddenRowsJson }) {
  const language = createTheme(esES);
  return (
    <ThemeProvider theme={language}>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{
          toolbar: GridToolbar,
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        initialState={{
          columns: {
            columnVisibilityModel: hiddenRowsJson,
          },
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        density="comfortable"
        getEstimatedRowHeight={() => 100}
        getRowHeight={() => "auto"}
        disableRowSelectionOnClick
        autoHeight
        disableColumnMenu
        sx={{
          "--DataGrid-overlayHeight": "300px",
          "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
            py: 1,
          },
          "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
            py: "5px",
          },
          "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
            py: "5px",
          },
          "& .MuiDataGrid-cell": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          },
        }}
      />
    </ThemeProvider>
  );
}

ReutilizableDataGrid.propTypes = {
  rows: propTypes.array.isRequired,
  columns: propTypes.array.isRequired,
  hiddenRowsJson: propTypes.object
};

export default ReutilizableDataGrid;
