import React, { useEffect, useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useWishlist } from '../../hooks/WishlistContext';
import { getContactPhoneNumber } from '../../utils/firebaseDB';
const WishlistComponent = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist(); // Importar funciones del contexto
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Obtener el número de teléfono desde Firebase cuando el componente se monte
    const fetchPhoneNumber = async () => {
      const number = await getContactPhoneNumber();
      if (number) {
        setPhoneNumber(number);
      }
    };

    fetchPhoneNumber();
  }, []);

  const handleDelete = (courseId) => {
    removeFromWishlist(courseId); // Utilizar removeFromWishlist del contexto
  };

  const handleSendQuote = () => {
    if (wishlistItems.length === 0) {
      alert("No tienes cursos en tu lista de deseos para cotizar.");
      return;
    }

    let message = "Hola, estoy interesado en cotizar los siguientes cursos:\n\n";

    wishlistItems.forEach((item, index) => {
      message += `${index + 1}. Curso: ${item.name}\n   Lecciones: ${item.numLessons}\n`;
    });

    message += "\nPor favor, me podrían enviar la cotización. Gracias.";

    const encodedMessage = encodeURIComponent(message);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const whatsappUrl = isMobile
      ? `https://wa.me/${phoneNumber}?text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, flexGrow: 2 }}>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Mi Lista de Deseos
        </Typography>

        {wishlistItems.length === 0 ? (
          <Typography variant="body1">No tienes cursos en tu lista de deseos.</Typography>
        ) : (
          <List>
            {wishlistItems.map((item) => (
              <ListItem
                key={item.courseId}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(item.courseId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.name}
                  secondary={`Lecciones - ${item.numLessons}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          startIcon={<WhatsAppIcon />}
          fullWidth
          style={{
            backgroundColor: '#FDD3D0',
            color: 'black',
          }}
          onClick={handleSendQuote}
          disabled={!phoneNumber} // Deshabilitar si no se ha cargado el número de teléfono
        >
          Cotizar
        </Button>
      </Box>
    </Box>
  );
};

export default WishlistComponent;
