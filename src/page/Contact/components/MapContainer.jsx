import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";

export function MapContainer({ locationLink, iFrame }) {
  const filteredIFrame = iFrame.match(/src="([^"]+)"/);
  const urlIFrame = filteredIFrame ? filteredIFrame[1] : null;
  return (
    <>
      <Box
        component="iframe"
        src={urlIFrame}
        style={{
          height: "500px",
          border: "0",
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></Box>

      <Button
        href={locationLink}
        variant="outlined"
        type="button"
        target="_blank"
        sx={{
          background: "var(--secondary-color)",
          color: "black",
          height: "81px",
          fontSize: {
            sm: "18px",
            md: "22px"
          },
          "&:hover": {
            background: "#fd779a",          
            color: "white",
          },
        }}
      >
          Ir a la ubicación
      </Button>
    </>
  );
}

MapContainer.propTypes = {
  locationLink: PropTypes.string.isRequired,
  iFrame: PropTypes.string.isRequired,
};
