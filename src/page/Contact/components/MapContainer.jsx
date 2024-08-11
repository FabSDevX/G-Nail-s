import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";

export function MapContainer({ locationLink, iFrame }) {
  const filteredIFrame = iFrame.match(/src="([^"]+)"/);
  const urlIFrame = filteredIFrame ? filteredIFrame[1] : null;
  return (
    <>
      <iframe
        src={urlIFrame}
        style={{
          height: "500px",
          border: "0",
          allowfullscreen: "",
          loading: "lazy",
        }}
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <Button
        href={locationLink}
        variant="outlined"
        target="_blank"
        sx={{
          background: "var(--primary-color)",
          color: "black",
          height: "81px",
          fontSize: "25px",
          '&:hover':{
                background: "var(--secondary-color)",
                color: "white"
            }
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "16px",
              sm: "20px",
            },
            
          }}
        >
          Ir a la ubicación
        </Typography>
      </Button>
    </>
  );
}

MapContainer.propTypes = {
  locationLink: PropTypes.string.isRequired,
  iFrame: PropTypes.string.isRequired,
};
