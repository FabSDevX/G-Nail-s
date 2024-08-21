import { Box, Typography } from "@mui/material";
import propTypes from "prop-types";
import { AdminNavBar } from "../component/AdminNavBar";

export function AdminSectionLayout({ id, title, children }) {
  return (
    <Box id={id}>
      <AdminNavBar />
      <Box
        sx={{
          maxWidth: "90%",
          margin: "30px auto 0 auto",
          paddingBottom: "10px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            color: "var(--admin-title-color)",
            fontSize: {
              xs: "30px",
              sm: "40px",
              md: "50px",
              lg: "60px",
            },
          }}
        >
          {title}
        </Typography>
        {children}
      </Box>
    </Box>
  );
}

AdminSectionLayout.propTypes = {
  id: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  children: propTypes.node.isRequired,
};
