import { Box, Typography } from "@mui/material";
import React, { useState } from 'react';
import { ImageUploadCard } from './components/ImageUploadCard';
import { AdminFormBtn } from '../../../component/AdminFormBtn';
import ModalContainer from '../../../component/ModalContainer';
import { CarouselContainer } from './components/CarouselContainer';
import { deleteImage, uploadCarouselImageByUrl, getCarouselImages } from '../../../utils/firebaseDB';
import { useEffect } from 'react'; 
import { Toaster } from 'sonner';
import { promiseToast } from '../../../utils/toast';

export function CarouselAdmin(){

    const [imageList, setImageList] = useState({});
    const [handleDeletedImages, setHandleDeletedImages] = useState([]);

    const sortedImageList = Object.keys(imageList) 
    .sort()  
    .reduce((acc, key) => {
        acc[key] = imageList[key];
        return acc;
    }, {});

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

      const handleImageListChange = (name, url) => {
        const value = {...imageList, [name] : {'url':url, 'isStored': false}};
        setImageList(value);
        console.log("Agregado", value)
      };

      const handleDeletedImage = (name,url) => {
        if(imageList[name]['isStored']){
          const listValues = handleDeletedImages
          listValues.push(url);
          setHandleDeletedImages(listValues)
          console.log(listValues)
        }
        delete imageList[name];
      }    

      const saveImages = async () => {
        const newImageList = { ...imageList };
        for (const key of Object.keys(imageList)) {
          const obj = imageList[key];
          if (!obj['isStored']) {
            const urlValue = await uploadCarouselImageByUrl(obj['url'], 'carousel', key);
            newImageList[key] = { url: urlValue, isStored: true };
          }
        }
        setImageList(newImageList);
        handleDeletedImages.forEach(element => {
          deleteImage(element);
        });
        setHandleDeletedImages([]);
      };


      function handleSave(){
      promiseToast(
      saveImages(),
      "Cambios guardado",
      "Error"
      );
      }

      useEffect(() => {
        // Carga las imágenes al montar el componente
        const loadImages = async () => {

          const updatedImageList = await getCarouselImages();

          setImageList(updatedImageList);

        };
    
        loadImages();
      }, []);  

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
                <CarouselContainer imageList = {Object.values(sortedImageList)}/>
              </div>
            </ModalContainer>
            <Box 
              className = "image-cards-container"
              sx={{
                gridTemplateColumns: "25% 25% 25% 25%",
                width: '100%', 
                gap: '10px', 
                justifyContent: 'center',
                flexWrap: "wrap",
                boxSizing: 'border-box', 
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

              {["image-card-1", "image-card-2", "image-card-3", "image-card-4"].map((name) => (
                <ImageUploadCard
                  key={name}
                  name={name}
                  handleImageListChange={handleImageListChange}
                  handleDelete={handleDeletedImage}
                  initialImage={imageList[name]} 
                />
              ))}

            </Box>

            <AdminFormBtn
              handleOpenPreview={handleOpen}
              handleSaveChanges={handleSave}            
            />
            
            <Toaster richColors position="bottom-right" />

        </Box>


      );

}
