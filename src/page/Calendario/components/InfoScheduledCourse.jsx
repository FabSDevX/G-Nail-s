import { Box, Button, Skeleton, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getDocumentById } from "../../../utils/firebaseDB";
import { useNavigate } from "react-router-dom";
export const InfoScheduledCourse = ({hours, courseInfo, date, isEditable, onButtonClick}) => {  
    const [loading, setLoading] = useState(true)
    const [courseName, setCourseName] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const getCourseInfo = async () => {
            setLoading(true);  // Iniciar el estado de carga
            try {
                //Obtener nombre del curso
                if(courseInfo){
                    const course = await getDocumentById("Course", courseInfo.courseUID);
                    setCourseName(course.name);
                }
                setLoading(false);  // Terminar el estado de carga después de las actualizaciones
            } catch (error) {
                console.error("Error fetching data: ", error);
                setLoading(false);  // Asegurarse de desactivar el estado de carga en caso de error
            }
        };
        getCourseInfo();
    }, [courseInfo]);

    const handleEdit = () => {
        navigate('./course/'+courseInfo.id);
      };

    const handleClick = () => {
        // Llamamos a la función que viene del componente padre
        onButtonClick(hours, date);
    };

    return (
        <Box>
            {loading?
            <Skeleton
                sx={{ bgcolor: '#F2BCD4', margin:'auto' }}
                variant="rounded"
                height={200}                
            />
            :
            <Box>
                <Typography mb={1}>
                    <b>
                        {hours}
                    </b>
                </Typography>
                <Box margin={'auto'} bgcolor={'#F2BCD4'} padding={'10px'} borderRadius={'8px'} border={'1px solid black'}>
                    {courseInfo? 
                        <>
                            <Typography fontSize={'17px'} textAlign={'center'} sx={{wordWrap:'break-word', overflowWrap:'break-word'}}>
                                <b>{courseName}</b>
                            </Typography>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Box display={'flex'} flexDirection={'column'} rowGap={1}>
                                    <Typography fontSize={'13px'}>Grupo: </Typography>
                                    <Typography fontSize={'13px'}>Cupo: </Typography>
                                    <Typography fontSize={'13px'}>Fechas: </Typography>
                                </Box>
                                <Box display={'flex'} flexDirection={'column'} rowGap={1}>
                                    <Typography textAlign={'left'} fontSize={'13px'}>{courseInfo.group}</Typography>
                                    <Typography textAlign={'left'} fontSize={'13px'}>{courseInfo.cupo}</Typography>
                                    <Box display={'inline'}>
                                        {courseInfo.dates.map((e, index) => (
                                            <Box key={index}>
                                                <Typography textAlign={'left'} fontSize={'13px'}>{e.date}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                            {isEditable &&
                                <Box display={'flex'} mt={'10px'} justifyContent={'center'}>
                                    <Button variant="outlined" sx={{color:'black', borderColor:'black'}} onClick={handleEdit}>
                                        Editar
                                    </Button>
                                </Box>
                            }
                        </>
                    :
                        isEditable?
                            <Typography textAlign={"center"}>Sin cursos agendados</Typography>
                        :
                            <Box display={'flex'} mt={'10px'} justifyContent={'center'}>
                                <Button variant="outlined" sx={{color:'black', borderColor:'black'}} onClick={handleClick}>
                                    Agendar
                                </Button>
                            </Box>
                    }

                </Box>
            </Box>
            }
        </Box>
    );
}