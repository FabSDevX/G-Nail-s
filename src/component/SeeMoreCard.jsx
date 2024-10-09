import { Box, Button, Card, CardActionArea, CardActions, Typography } from "@mui/material";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export function SeeMoreCard({route}) {
  const navigate = useNavigate()

  const handleClick = () => {
    console.log("Hola")
    navigate(`/${route}`)
  }
  return (
    <Card
      sx={{
        width: "310px",
        borderRadius: "10px",
        perspective: "1000px",
        boxShadow: "none",
        bgcolor:'#ededed',
        border: '1px gray solid'
      }}
    >
      <CardActionArea
        sx={{
          transformStyle: "preserve-3d",
          height: "100%",
          boxSizing: "border-box",
          padding: "0",
          "&:focus": {
            outline: "none",
          },
        }}
      >
        <Box height={'100%'} onClick={handleClick} alignContent={'center'}>
          <Typography m={'auto'}  textAlign={'center'} fontSize={55} color={'var(--primary-color)'}>
            Ver más...
          </Typography>          
        </Box>

      </CardActionArea>
    </Card>
  );
}

SeeMoreCard.propTypes = {
  route: propTypes.string.isRequired
}