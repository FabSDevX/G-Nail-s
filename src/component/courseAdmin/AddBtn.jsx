import { Button } from "@mui/material";
import propTypes from "prop-types";

export function AddBtn({ addFunction }) {
  return (
    <Button
      sx={{
        background: "var(--save-changes-color)",
        color: "white",
        fontWeight: "500",
        borderRadius: "8px",
        margin: "20px 0",
      }}
      onClick={addFunction}
    >
      + Agregar nuevo
    </Button>
  );
}

AddBtn.propTypes = {
  addFunction: propTypes.func,
};
