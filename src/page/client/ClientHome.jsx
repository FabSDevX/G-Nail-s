import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
import { getCarouselImages } from '../../utils/firebaseDB';
import { CarouselContainer } from '../admin/carousel-admin/components/CarouselContainer';



const ClientHome = () => {

  const [imageList, setImageList] = useState({});

  const sortedImageList = Object.keys(imageList) 
  .sort()  
  .reduce((acc, key) => {
      acc[key] = imageList[key];
      return acc;
  }, {});

  useEffect(() => {

    
    const loadImages = async () => {
      
      const updatedImageList = await getCarouselImages();
      setImageList(updatedImageList);
      
    };

    loadImages();
  }, []);  


  return (
    <Box>

      <Box
        sx={{
          width: '80%', 
          height: '400px', 
          margin: '0 auto', 
        }}
      >
        <CarouselContainer imageList = {Object.values(sortedImageList)}/>
      </Box>

    </Box>

  );
};
export default ClientHome;