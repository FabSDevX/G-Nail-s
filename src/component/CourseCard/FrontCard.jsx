import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import PropTypes from "prop-types";
export function FrontCard({
  title,
  shortDescription,
  lessonHours,
  img,
  subsectionCardStyle,
}) {
  return (
    <Box
      className="front-card-content"
      sx={{
        padding: "0",
        backfaceVisibility: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        height="160px"
        image={img}
        alt="Card image container"
      />
      <CardContent
        sx={{
          padding: "15px 0 0 0 ",
          flex: "1",
          display: "flex",
          flexDirection: "column",
          ":last-child":{paddingBottom:"0",
          }
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            padding: "0 20px",
            wordBreak: "break-word",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textWrap: "wrap",
            color: "black",
            fontWeight: "normal",
            opacity: "90%",
            maxHeight: "135px",
            maxWidth: "260px",
            textAlign: "center",
            padding: "0 5px",
            margin: "0 auto",
            overflow: "hidden",
            flex: "1",
            wordBreak: "break-word",
          }}
        >
          {shortDescription}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            alignContent: "center",
            justifyContent: "center",
            marginTop: "auto",
            borderTop: "1px solid #999",
          }}
        >
          <Typography variant="body2" sx={{ ...subsectionCardStyle }}>
            Numero de lecciones: {lessonHours}
          </Typography>
          <Box sx={{ borderRight: "1px solid #999" }}></Box>
          <Typography variant="body2" sx={subsectionCardStyle}>
            Horas totales del curso: {lessonHours * 3}
          </Typography>
        </Box>
      </CardContent>
    </Box>
  );
}

FrontCard.propTypes = {
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  lessonHours: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  subsectionCardStyle: PropTypes.object,
};
