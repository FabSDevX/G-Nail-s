import { Carousel } from 'antd';
import { Box } from "@mui/material";


export function CarouselContainer({imageList}) {

    const onChange = (currentSlide) => { 
        console.log(currentSlide);
      };

    return(
        <Box>
            <Carousel afterChange={onChange} autoplay autoplaySpeed={5000} arrows>
            {imageList.map((url,index) => (
                <Box key = {index}>
                    <img 
                    src={url} 
                    alt={'Slide ${index+1}'}  
                    style={{width: '100%', height: '400px', objectFit: 'cover'}}
                    />
                </Box>
            ))}
            </Carousel>                   
        </Box>  
    );

}