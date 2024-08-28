import { Box } from "@mui/material";
import propTypes from "prop-types";

export function AdminAddEditFormLayout({ children }) {
  return (
    <Box
      className="form-container"
      sx={{
        border: "1px solid black",
        boxShadow: "5px 5px 5px 0px gray",
        borderRadius: "10px",
        padding: "30px",
      }}
    >
      {children}
    </Box>
  );
}
AdminAddEditFormLayout.propTypes = {
  children: propTypes.node,
};
