import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import upRightArrow from "../../assets/upRightArrow.svg";
import propTypes from "prop-types";

export function BackCardScheduledCourse({ dates, img }) {
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
        <Typography textAlign={"center"} fontSize={18} fontWeight={700} mt={2}>Fechas</Typography>
        {dates.map((e) => 
          <Box key={e.date} display={'flex'} justifyContent={'center'} gap={'20px'} margin={'10px auto'}>
            <Typography variant="body2" color="text.secondary" sx={textStyles}>
              {e.date}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={textStyles}>
              {e.hours}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Box>
  );
}
BackCardScheduledCourse.propTypes = {
  dates: propTypes.array.isRequired,
  img: propTypes.string.isRequired,
};

const textStyles = {
  color: "black",
  fontWeight: "normal",
  opacity: "90%",
  maxWidth: "260px",
  textAlign: "center",
}