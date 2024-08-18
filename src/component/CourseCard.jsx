import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";

const subsectionCardStyle = {
  padding: "10px 10px 0 10px",
  textAlign: "center",
  maxWidth: "13ch",
  paddingBottom: "10px",
};

export function CourseCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <Card
      sx={{
        borderRadius: "10px",
        maxWidth: "345px",
        perspective: "1000px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box onClick={handleFlip}>
        <CardActionArea
          sx={{
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s",
            backfaceVisibility: "hidden",
            height: "430px",
            borderRadius: "0",
            "&:focus": {
              outline: "none",
            },
          }}
        >
          {/* Front Side */}
          {!isFlipped && (
            <Box
              className="flip-content"
              sx={{
                padding: "16px 0 0 0",
                backfaceVisibility: "hidden",
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image="public/contact-background.webp"
                alt="Card image container"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Uñas acrilicas
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textAlign: "center",
                    padding: "0 15px",
                    color: "black",
                    fontWeight: "normal",
                    opacity: "90%",
                  }}
                >
                  Lorem ipsum odor amet, consectetuer adipiscing elit. Arcu
                  vivamus lectus risus habitasse vel tincidunt proin nulla.
                  Proin habitant inceptos aptent accumsan suspendisse pretium
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    alignContent: "center",
                    justifyContent: "center",
                    marginTop: "20px",
                    borderTop: "1px solid #999",
                  }}
                >
                  <Typography variant="body2" sx={{ ...subsectionCardStyle }}>
                    Numero de lecciones: 42
                  </Typography>
                  <Box sx={{ borderRight: "1px solid #999" }}></Box>
                  <Typography variant="body2" sx={subsectionCardStyle}>
                    Horas totales del curso: 12
                  </Typography>
                </Box>
              </CardContent>
            </Box>
          )}

          {/* Back Side */}
          {isFlipped && (
            <Box
              className="flip-content"
              sx={{
                padding: "16px 0 0 0",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                position: "flex",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#f9f9f9", // Fondo para la parte trasera
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image="public/contact-background.webp"
                alt="Card image container"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Uñas acrilicas
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textAlign: "center",
                    padding: "0 15px",
                    color: "black",
                    fontWeight: "normal",
                    opacity: "90%",
                  }}
                >
                  JAJAJ
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    alignContent: "center",
                    justifyContent: "center",
                    marginTop: "20px",
                    borderTop: "1px solid #999",
                  }}
                >
                  <Typography variant="body2" sx={{ ...subsectionCardStyle }}>
                    Numero de lecciones: 42
                  </Typography>
                  <Box sx={{ borderRight: "1px solid #999" }}></Box>
                  <Typography variant="body2" sx={subsectionCardStyle}>
                    Horas totales del curso: 12
                  </Typography>
                </Box>
              </CardContent>
            </Box>
          )}
        </CardActionArea>
      </Box>

      <Box
        sx={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          backfaceVisibility: "hidden",
        }}
      >
        <CardActions
          sx={{
            padding: "0",
          }}
        >
          <Button
            sx={{
              background: "var(--secondary-color)",
              padding: "15px",
              boxSizing: "none",
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
            Arma tu curso
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
