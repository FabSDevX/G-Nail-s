import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


export function ImageUploadCard({name, handleImageListChange}) {

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        handleImageListChange(name, imageUrl)
      }

    }

    return(
        <Box
        className = "image-card-1"
        sx={{
          margin: 'auto',
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
          <img
            src={selectedImage}
            alt="Selected"
            style={{
              width: '200%',
              height: '200%',
              objectFit: 'cover', // or 'cover' depending on desired behavior
            }}
          />
          ) : (
            <label
              htmlFor="image-upload"
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
                id="image-upload"
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

