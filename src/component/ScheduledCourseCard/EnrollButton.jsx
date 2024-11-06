import { Box, Button } from "@mui/material";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { getDocumentById } from "../../utils/firebaseDB";

export function EnrollButton({ courseName, group, dates, isFlipped }) {
  const [phoneNumber, setphoneNumber] = useState('');

  useEffect(() => {
    const fetchContactInfo = async () => {
      const data = await getDocumentById('Contact info', 'Information');
      if (data) {
        setphoneNumber(data.phone);
        console.log("Hola: ", data.phone)
      }   
    };
     fetchContactInfo();
  }, []);

  const handleButtonClick = () => {
    let message = "Hola, estoy interesado en matricularme en el siguiente curso:\n\n";

    message += `Curso: ${courseName}\nGrupo: ${group}\nFechas:\n`;

    dates.forEach((item) => {
      message += `${item.date} (${item.hours})\n`;
    });

    message += "\nPor favor, me podrías dar más información. \nGracias.";

    const encodedMessage = encodeURIComponent(message);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const whatsappUrl = isMobile
      ? `https://wa.me/${phoneNumber}?text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button
      onClick={handleButtonClick}
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
        INSCRIBIRSE
      </Box>
    </Button>
  );
}

EnrollButton.propTypes = {
  isFlipped: propTypes.bool.isRequired,
};
