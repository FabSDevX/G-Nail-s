import { Box, Button, TextField, Typography } from "@mui/material";

const inputStyles = { background: "white", width: "100%", borderRadius: "5px" };
const typographyStyles = {
  color: "black",
  fontWeight: "600",
};

export function ContactForm() {
  function saludar(e) {
    e.preventDefault();
    console.log("Hola");
  }

  return (
    <Box
      id="#contact-form"
      sx={{
        background:
          "linear-gradient(90deg, rgba(242,188,212,1) 0%, rgba(249,136,181,1) 100%)",
        margin: "0 40px 40px 40px",
        borderRadius: "25px",
        height: {
          xs: "auto",
          sm: "550px",
        },
      }}
    >
      <Typography
        sx={{
          fontWeight: "700",
          lineHeight: "120%",
          letterSpacing: "-0.02em",
          textAlign: "center",
          color: "black",
          padding: "30px 0",
          fontSize: {
            xs: "30px",
            sm: "48px",
          },
        }}
      >
        Envianos una consulta
      </Typography>
      <form onSubmit={saludar}>
        <Box
          sx={{
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(1, 1fr)",
            gap: "30px",
            padding: "0 20px",

            display: {
              xs: "flex",
              sm: "grid",
            },
            flexDirection: {
              xs: "column",
            },
          }}
        >
          <Box>
            <Typography
              sx={{ ...typographyStyles, fontSize: { xs: "18px", sm: "24px" } }}
            >
              Nombre
            </Typography>
            <TextField style={inputStyles} required id="outlined-required" />
          </Box>

          <Box>
            <Typography
              sx={{ ...typographyStyles, fontSize: { xs: "18px", sm: "24px" } }}
              style={typographyStyles}
            >
              Numero de telefono
            </Typography>
            <TextField style={inputStyles} required id="outlined-required" />
          </Box>
          <Box style={{ gridColumn: "span 2 / span 2" }}>
            <Typography
              sx={{ ...typographyStyles, fontSize: { xs: "18px", sm: "24px" } }}
              style={typographyStyles}
            >
              Consulta
            </Typography>
            <TextField
              style={inputStyles}
              id="outlined-multiline-static"
              multiline
              rows={5}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: {
              xs: "center",
              sm: "end",
            },
            margin: {
              xs: "20px auto",
              sm: "30px 20px 0 0",
            },
            paddingBottom: {
              xs: "30px",
            },
          }}
        >
          <Button
            variant="outlined"
            type="submit"
            sx={{
              background: "var(--primary-color)",
              display: "flex",
              color: "black",
              height: "70px",
              fontSize: "25px",
              borderRadius: "10px",

              width: {
                xs: "130px",
                sm: "200px",
              },
            }}
          >
            Enviar
          </Button>
        </Box>
      </form>
    </Box>
  );
}
