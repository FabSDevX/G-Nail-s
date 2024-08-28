import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


export function ImageUploadCard({name, handleImageListChange, initialImage, handleDelete}) {

    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
      if (initialImage) {
        setSelectedImage(initialImage['url']);
      }
    }, [initialImage, name, handleImageListChange]);          


    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        console.log(name);
        setSelectedImage(imageUrl);
        handleImageListChange(name, imageUrl);
      }

    }

      // Genera un id único basado en el nombre del componente
      const inputId = `${name}-image-upload`;

    return(
        <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '300px',
          minWidth: '100px',
          aspectRatio: '16/9', // Keep the aspect ratio
          height: '100%',
          border: '1px solid black', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          cursor: 'pointer', // Makes the box look clickable
        }}
        >
        {selectedImage ? (

          <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
          >    
            <img
              src={selectedImage}
              alt="Selected"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', // or 'cover' depending on desired behavior
              }}
            />
            <button
              onClick={()=>{
                setSelectedImage(null);
                handleDelete(name, initialImage['url']);
              }} 
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: '5px 10px',
                backgroundColor: 'transparent',
                color: '#ff0000', // Color rojo para la equis
                border: 'none',
                fontSize: '24px', // Tamaño de la equis
                cursor: 'pointer',                
              }}
            >
              &times;
            </button>
          </Box> 

          
          
          
          ) : (
            <label
              htmlFor={inputId}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <input
                id={inputId}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{
                  display: 'none',
                }}
              />
              <IconButton
                aria-label="upload picture"
                component="span"
                sx={{
                  zIndex: 1,
                }}
              >
                <AddIcon sx={{ fontSize: 50, color: '#ccc' }} />
              </IconButton>
            </label>
              )}
        </Box>
    );

};

