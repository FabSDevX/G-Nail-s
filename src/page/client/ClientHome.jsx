import React, { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import { getCarouselImages } from '../../utils/firebaseDB';
import { CarouselContainer } from '../admin/carousel-admin/components/CarouselContainer';
import { ScheduledCoursesRow } from './ScheduledCoursesRow';
import { HighlightsCourses } from './HighlightsCourses';

const titlesStyles = {
  fontSize: '30px',
  ml:'20px',
  fontWeight:'400',
  py:'20px'
}

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
          // height: '400px', 
          margin: '0 auto', 
        }}
      >
        <CarouselContainer imageList = {Object.values(sortedImageList)}/>
        <Typography variant='h1' sx={titlesStyles}>Cursos agendados</Typography>
        <ScheduledCoursesRow />
        <Typography  variant='h1' sx={titlesStyles}>Cursos destacados</Typography>
        <HighlightsCourses/>
      </Box>

    </Box>

  );
};
export default ClientHome;