import React, { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import { getCarouselImages } from '../../utils/firebaseDB';
import { CarouselContainer } from '../admin/carousel-admin/components/CarouselContainer';
import { ScheduledCoursesRow } from './ScheduledCoursesRow';
import { HighlightsCourses } from './HighlightsCourses';
import AboutUsHomepage from '../../component/homepage/aboutUsHomepage';

const titlesStyles = {
  fontSize: '40px',
  ml:'20px',
  fontWeight:'400',
  fontFamily:'Warung_Kopi',
  color:"var(--title-text-color)",
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
    <Box sx={{maxWidth:"1444px", margin: '0 auto' }}>
      <Box
        sx={{
          width: '80%',
          maxWidth:"1444px", 
          margin: '0 auto',
        }}
      >
        {Object.keys(sortedImageList).length > 0 && (
          <CarouselContainer imageList={Object.values(sortedImageList)} />
        )}
        <Typography variant='h1' sx={
          {  fontSize: {xs:"30px", xl:"35px"},
            textAlign:"center",
            ml:'20px',
            fontWeight:'400',
            fontFamily:'Cream_Cake',
            color:"var(--title-text-color)",
            py:'20px',
            margin:"10px auto",
            maxWidth:"700px"
          }}>
          En Graci nails<Typography component="span">,</Typography> nos especializamos en clases y talleres personalizados de manicure<Typography component="span">,</Typography> pedicure y uñas esculpidas con certificación avalada.</Typography>

        <AboutUsHomepage/>

        <Typography variant='h2' sx={titlesStyles}>Cursos agendados</Typography>
        <ScheduledCoursesRow />
        <Typography  variant='h2' sx={titlesStyles}>Cursos destacados</Typography>
        <HighlightsCourses/>
      </Box>

    </Box>

  );
};
export default ClientHome;