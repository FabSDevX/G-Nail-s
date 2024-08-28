import { Box, Typography } from "@mui/material";
import propTypes from "prop-types";

export function AdminSectionLayout({ id, title, children }) {
  return (
    <Box id={id}>
      <Box
        sx={{
          maxWidth: "1444px",
          margin:"0 auto",
          padding: "0 30px 10px 30px",
          minHeight:"100vh"
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
