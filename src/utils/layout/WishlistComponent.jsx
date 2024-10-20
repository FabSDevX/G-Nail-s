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

const WishlistComponent = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(storedWishlist);
  }, []);

  const handleDelete = (courseId) => {
    const updatedWishlist = wishlistItems.filter(item => item.courseId !== courseId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
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
      ? `https://wa.me/50661739195?text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=50661739195&text=${encodedMessage}`;

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
        >
          Cotizar
        </Button>
      </Box>
    </Box>
  );
}

export default WishlistComponent;
