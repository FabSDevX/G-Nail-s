import { Carousel } from 'antd';
import { Box } from "@mui/material";

export function CarouselContainer({imageList}) {

    const onChange = (currentSlide) => { 
        console.log(currentSlide);
      };


    return(
        <Box>
            <Carousel 
                afterChange={onChange} 
                autoplay 
                autoplaySpeed={5000} 
                arrows           
                fade>
            {imageList.map((value,index) => (
                <Box key = {index}>
                    <img 
                    src={value['url']} 
                    alt={'Slide ${index+1}'}  
                    
                    style={{width: '100%', height: '500px', objectFit: 'cover'}}
                    />
                </Box>
            ))}
            </Carousel>                   
        </Box>  
    );

}