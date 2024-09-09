import { Box, Skeleton, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getDocumentById } from "../../../utils/firebaseDB";

export const InfoScheduledCourse = (props) => {  
    const [courseInfo, setCourseInfo] = useState(null);
    const [hours, setHours] = useState([])
    const [loading, setLoading] = useState(true)
    const [courseName, setCourseName] = useState(null)

    useEffect(() => {
        const getCourseInfo = async () => {
            setLoading(true);  // Iniciar el estado de carga
            
            try {
                // Obtener información del curso
                const infoCourse = await getDocumentById("Scheduled Courses", props.id);
                setCourseInfo(infoCourse);

                // Obtener la hora del curso seleccionada
                let indexHour = 0;
                infoCourse.dates.map((e) => {
                    if (props.date === e.date) {
                        indexHour = e.hours;
                    }
                });

                // Obtener información adicional de negocio
                const infoBusiness = await getDocumentById("Contact info", "Information");
                setHours(infoBusiness.lessonSchedule[indexHour]);

                //Obtener nombre del curso
                const course = await getDocumentById("Course", infoCourse.courseUID);
                setCourseName(course.name);

                setLoading(false);  // Terminar el estado de carga después de las actualizaciones
            } catch (error) {
                console.error("Error fetching data: ", error);
                setLoading(false);  // Asegurarse de desactivar el estado de carga en caso de error
            }
        };
        getCourseInfo();
    }, [props.id, props.date]);

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
                </Box>
            </Box>
            }
        </Box>
    );
}