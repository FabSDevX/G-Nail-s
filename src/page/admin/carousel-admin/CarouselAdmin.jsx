import { storageDB } from '../../../../firebase';
import { Carousel } from 'antd';
import { Box, Typography } from "@mui/material";
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { ImageUploadCard } from './components/ImageUploadCard';
import { AdminFormBtn } from '../../../component/AdminFormBtn';
import { v4 } from 'uuid';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import ModalContainer from '../../../component/ModalContainer';
import { CarouselContainer } from './components/CarouselContainer';
import { uploadImageByUrl } from '../../../utils/firebaseDB';



const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  const imageUrls = [
    "https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/01/higurashi.jpg?q=50&fit=crop&w=1100&h=618&dpr=1.5",
    "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
    "https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/01/higurashi-rena.jpg",
  ];

export function CarouselAdmin(){

    const [imageList, setImageList] = useState({});

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

      const handleImageListChange = (name, url) => {
        const value = {...imageList, [name] : url};
        setImageList(value);
        console.log(imageList);
      };

      const saveImages =  () => {
        const imageUrls = Object.values(imageList);

        imageUrls.forEach(async url => {

          console.log(url);

          uploadImageByUrl(url, 'carousel');
        });   

      };

      return ( 
        <Box 
          id = "admin-carousel"
          sx={{
            maxWidth: "90%",
            margin: "60px auto 0 auto",
            paddingBottom: "10px",
          }}
        > 
            <Typography
                sx={{
                fontWeight: "600",
                color: "var(--admin-title-color)",
                fontSize: {
                    xs: "30px",
                    sm: "40px",
                    md: "50px",
                    lg: "60px",
                },
                }}
            >
                Gestión de carrusel
            </Typography> 
            
            <ModalContainer open={open} handleClose={handleClose}>
              <div>
                <CarouselContainer imageList = {Object.values(imageList)}/>
              </div>
            </ModalContainer>
            <Box 
              className = "image-cards-container"
              sx={{
                gridTemplateColumns: "25% 25% 25% 25%",
                width: '100%', // Adjust width to compensate for the gap on the container
                gap: '10px', // Space between items
                justifyContent: 'center',
                flexWrap: "wrap",
                boxSizing: 'border-box', // Includes padding and border in the element's total width and height
                display: {
                  sm: "flex",
                  md: "grid",
                },
                flexDirection: {
                  xs: "row",
                  sm: "row",
                  md: "column",                  
                },
              }}
              >
                <ImageUploadCard name = "image-card-1" handleImageListChange={handleImageListChange}/>
                <ImageUploadCard name = "image-card-2" handleImageListChange={handleImageListChange}/>
                <ImageUploadCard name = "image-card-3" handleImageListChange={handleImageListChange}/>
                <ImageUploadCard name = "image-card-4" handleImageListChange={handleImageListChange}/>


            </Box>

            <AdminFormBtn
              handleOpenPreview={handleOpen}
              handleSaveChanges={saveImages}            
            />

        </Box>


      );

}
