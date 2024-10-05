import { Box, Button } from "@mui/material";
import propTypes from "prop-types";

export function WishListButton({ isFlipped, title, lessons }) {

  function doSomething(){
    console.log(title, lessons)
  }

  return (
    <Button
      onClick={doSomething}
      sx={{
        background: "var(--secondary-color)",
        padding: "15px",
        boxSizing: "border-box",
        color: "black",
        borderRadius: "0",
        "&:hover": {
          border: "none",
          background: "var(--primary-color)",
          color: "white",
        },
        "&:focus": {
          outline: "none",
        },
      }}
      fullWidth
      size="large"
    >
      <Box
        sx={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          textAlign: "center",
        }}
      >
        ARMA TU CURSO
      </Box>
    </Button>
  );
}

WishListButton.propTypes = {
  isFlipped: propTypes.bool.isRequired,
  title: propTypes.string.isRequired,
  lessons: propTypes.number.isRequired
};
