import React, { useEffect, useState }  from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { getAllImages } from "../../utils/firebaseDB";
import '../../index.css';


const AboutUs = () => {

    const [imageUrls, setImageUrls] = useState([]);

    const flexMax = useMediaQuery('(min-width:1000px)');

    useEffect(() => {
        const fetchImages = async () => {
          try {
            const urls = await getAllImages("AboutUs")
            setImageUrls(urls);
            console.log(urls)
          } catch (error) {
            console.error("Error fetching images:", error);
          }
        };
    
        fetchImages();
      }, []);
    
      const sections = [
        {
          title: "Sobre nosotros",
          content:
            "Somos una academia comprometida con el aprendizaje de nuestros clientes. Gnails ofrece los mejores cursos de belleza, para que cualquier persona interesada pueda llegar al mejor nivel en cualquiera de las técnicas conocidas de esta disciplina.",
        },
        {
            title: "Visión",
            content:
              "El objetivo de G'nails como academia es alcanzar la excelencia en enseñanza de belleza. Deseamos continuar evolucionando hasta convertirnos en un referente a nivel nacional.",
          },
        {
          title: "Misión",
          content:
            "Convertir a todo aquel que desee contar con nuestros serivicios en todo un profesional en el arte de la belleza, preparado a salir al mercado y poder hacer crecer su propia marca o negocio.",
        },

      ];


  return (
        <Box
        className="Content Container"
        sx={{
            padding: "20px",
            alignItems: "center",
            flexDirection: "column",
            display: "flex",
            gap: "20px",
        }}
        >
        {sections.map((section, index) => (
            <Box
            key={index}
            sx={{
                backgroundColor: "#FFF2F4",
                borderRadius: "25px",
                width: "95%",
                gap: "0px",
                flexWrap: "wrap",
                boxSizing: "border-box",
                display: "grid",  
                gridTemplateColumns: flexMax? "1fr 1fr" : "1fr",  // 1 columna en pantallas pequeñas, 2 en grandes
                
            }}
            >
            {/* Text Section */}
            <Box
                sx={{
                padding: "20px",
                flexDirection: "column",
                display: "flex",
                gap: "20px",
                textAlign: "left",
                order: flexMax? 2 : index % 2 === 1 ? 1 : 2, 
                }}
            >
                <Typography
                variant="h4"
                fontFamily={'Cream_Cake'}
                fontSize={'50px'}
                sx={{ color: "#F0589C"}} 
                >
                {section.title}
                </Typography>
                <Typography
                variant="body3"
                fontFamily={'Warung_Kopi'}
                sx={{ color: "black", marginTop: "-10px", fontSize: flexMax? "22px" : "18px" }}
                >
                {section.content}
                </Typography>
            </Box>

            {/* Image Section */}
            <Box
                sx={{
                padding: "20px",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                gap: "20px",
                order: { xs: 2, sm: index % 2 === 1 ? 1 : 2 }, // Imagen debajo en pantallas pequeñas
                }}
            >
                {imageUrls[index] ? (
                <img
                    src={imageUrls[index]}
                    alt={`Imagen ${index + 1}`}
                    style={{ maxWidth: "100%", borderRadius: "15px" }}
                />
                ) : (
                <Typography variant="h6">Cargando imagen...</Typography>
                )}
            </Box>
            </Box>
        ))}
        </Box>
  );
};


export default AboutUs;
