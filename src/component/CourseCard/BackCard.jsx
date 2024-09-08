import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import upRightArrow from "../../assets/upRightArrow.svg";
import propTypes from "prop-types";
export function BackCard({ largeDescription, img }) {
  return (
    <Box
      className="back-card-content"
      sx={{
        padding: "0",
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        width: "100%",
        height: "100%",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box
        component="img"
        src={upRightArrow}
        sx={{
          position: "absolute",
          top: "0",
          rotate: "270deg",
        }}
      />

      <CardMedia
        component="img"
        height="160px"
        image={img}
        alt="Card image container"
      />
      <CardContent
        sx={{
          padding: "15px 0 15px 0 ",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textWrap: "wrap",
            color: "black",
            fontWeight: "normal",
            opacity: "90%",
            maxWidth: "260px",
            textAlign: "center",
            padding: "0 10px",
            margin: "0 auto",
            height: "30ch",
            overflow: "hidden",
            wordBreak: "break-word",
          }}
        >
          {largeDescription}
        </Typography>
      </CardContent>
    </Box>
  );
}
BackCard.propTypes = {
  largeDescription: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
};
