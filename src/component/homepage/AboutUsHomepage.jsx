import { Box, Button, Typography } from "@mui/material";
import aboutUsHomepage from "../../assets/aboutUsHomepage.jpg";
import { useNavigate } from "react-router-dom";
function AboutUsHomepage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        maxWidth: "1444px",
        my: "30px",
      }}
    >
      <Box
        component="img"
        sx={{
          width: { md: "auto", lg: "600px" },
          height: { md: "auto", lg: "400px" },
          margin: { md: "0 auto", lg: "0" },
        }}
        src={aboutUsHomepage}
      ></Box>
      <Box
        sx={{
          border: "4px solid var(--primary-color)",
          display: "flex",
          flexDirection: "column",
          padding: {xs:"15px", sm:"40px"},
          backgroundColor: "white",
          width: { sm: "auto", md: "600px" },
          height: { sm: "auto", md: "250px" },
          position: { sm: "-moz-initial", md: "absolute" },
          right: {sm: "50px", xl:"25%"},
          top: "20px",
        }}
      >
        <Box sx={{ margin: "0 auto" }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: {xs:"25px",sm:"30px"},
              fontFamily: "Warung_Kopi",
              margin: "0 auto",
            }}
          >
            Salón de belleza G´nails
          </Typography>
          <Box
            sx={{
              width: "50px",
              height: "3px",
              backgroundColor: "var(--primary-color)",
              margin: "10px auto",
            }}
          ></Box>
        </Box>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "20px",
            fontFamily: "Warung_Kopi",
          }}
        >
          En G´nails, nos enfocamos en ofrecer una experiencia única y
          personalizada en cada uno de nuestros servicios. Creemos que la
          belleza no solo está en los detalles, sino en cómo estos influyen en
          nuestra confianza y bienestar. Cada clase y taller está diseñado para
          que te sientas inspirado y apoyado en tu camino hacia la excelencia en
          el arte de la belleza.
        </Typography>
        <Button
          sx={{
            mt: "15px",
            color: "var(--primary-color)",
            border: "2px solid var(--primary-color)",
            mx: "auto",
            px: "35px",
            py: "10px",
            maxWidth: "300px",
          }}
          onClick={() => navigate("/AboutUs")}
        >
          Sobre nosotros
        </Button>
      </Box>
    </Box>
  );
}

export default AboutUsHomepage;
