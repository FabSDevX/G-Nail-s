import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";

const formButtons = {
  height: "50px",
  fontSize: "14px",
  borderRadius: "10px",
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
  "&:focus": {
    outline: "none",
  },
};

export function FormButtons({ handleOpenPreview, handleSaveChanges, handleCloseAction = null, disabled }) {
    return (
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          width: "100%",
          justifyContent: "end",
          marginTop: "15px",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: {
            xs: "end",
          },
        }}
      >
        <Button
          onClick={handleOpenPreview}
          variant="outlined"
          sx={{
            ...formButtons,
            background: "var(--preview-changes-color)",
            color: "white",
            "&:hover": {
              background: "var(--preview-changes-hover)",
              color: "white",
            },
          }}
        >
          Prevista
        </Button>
        <Button
          onClick={handleCloseAction ? handleCloseAction : () => window.location.reload()}
          variant="outlined"
          disabled={!disabled}  // Aquí se controla si está habilitado
          sx={{
            ...formButtons,
            background: disabled ? "#ff4d4f" : "#ccc", // Cambia color si está desactivado
            color: "white",
            "&:hover": {
              background: disabled ? "#d32f2f" : "#ccc",
              color: "white",
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          onClick={handleSaveChanges ? () => handleSaveChanges(true) : () => {}}
          variant="outlined"
          disabled={!disabled}  // Aquí se controla si está habilitado
          sx={{
            ...formButtons,
            background: disabled ? "var(--save-changes-color)" : "#ccc", // Cambia color si está desactivado
            color: "white",
            "&:hover": {
              background: disabled ? "var(--save-changes-hover)" : "#ccc",
            },
          }}
        >
          Guardar cambios
        </Button>
      </Box>
    );
  }

FormButtons.propTypes = {
  handleOpenPreview: PropTypes.func.isRequired,
  handleSaveChanges: PropTypes.func,
  handleCloseAction: PropTypes.func
};
