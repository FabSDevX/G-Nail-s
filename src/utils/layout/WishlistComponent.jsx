import React from 'react';
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
//De momento se pasan datos quemados
const wishlistItems = [
  { id: 1, name: 'Tecnica 1', lessons: 2 },
  { id: 2, name: 'Tecnica 2', lessons: 1 },
  { id: 3, name: 'Tecnica 3', lessons: 1 },
];

const WishlistComponent = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, flexGrow: 2 }}>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Mi Lista de Deseos
        </Typography>
        

        <List>
          {wishlistItems.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText 
                primary={item.name} 
                secondary={`Lecciones - ${item.lessons}`} 
              />
            </ListItem>
          ))}
        </List>
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
        >
          Cotizar
        </Button>
      </Box>
    </Box>
  );
}

export default WishlistComponent;