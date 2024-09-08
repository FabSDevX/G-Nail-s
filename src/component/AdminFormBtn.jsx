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

export function AdminFormBtn({ handleOpenPreview, handleSaveChanges}) {
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
        }}
      >
        Prevista
      </Button>
      <Button
        onClick={() => window.location.reload()}
        variant="outlined"
        sx={{
          ...formButtons,
          background: "var(--cancel-changes-color)",
          color: "#444444",
        }}
      >
        Cancelar
      </Button>
      <Button
        type="submit"
        onClick={handleSaveChanges ? () => handleSaveChanges(true) : () => {}}
        variant="outlined"
        sx={{
          ...formButtons,
          background: "var(--save-changes-color)",
          color: "white",
        }}
      >
        Guardar cambios
      </Button>
    </Box>
  );
}

AdminFormBtn.propTypes = {
  handleOpenPreview: PropTypes.func.isRequired,
  handleSaveChanges: PropTypes.func,
};
