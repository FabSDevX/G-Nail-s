import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { db } from '../../../../firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const InfoScheduledCourse = (props) => {  
    const [dates, setDates] = useState([]);
    const [hours, setHours] = useState(null);

    useEffect(() => {
    const  getDates = async () => {
        const docRef = doc(db, "ScheduledCourses", props.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setDates(docSnap.data().dates)
        } else {
            console.log("No such document!");
        }
    }
    const  getHours = async () => {
        const docRef = doc(db, "Contact info", "Information");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setHours(docSnap.data().lessonSchedule[props.hours])
        } else {
            console.log("No such document!");
        }
    }
    getDates();
    getHours();
    }, [dates, hours]);

    return (
        <Box>
            <Typography mb={1}><b>{hours}</b></Typography>
        <Box margin={'auto'} bgcolor={'#F2BCD4'} width={'200px'} padding={'10px'} borderRadius={'8px'} border={'1px solid black'}>
            <Typography fontSize={'25px'} textAlign={'center'}>
                <b>{props.name}</b>
            </Typography>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box display={'flex'} flexDirection={'column'} rowGap={1}>
                    <Typography>Grupo: </Typography>
                    <Typography>Cupo: </Typography>
                    <Typography>Fechas: </Typography>
                </Box>
                <Box display={'flex'} flexDirection={'column'} rowGap={1}>
                    <Typography textAlign={'left'}>{props.group}</Typography>
                    <Typography textAlign={'left'}>{props.cupo}</Typography>
                    <Box display={'inline'}>
                        {dates.map((date, index) => (
                            <Box key={index}>
                                <Typography>{date}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
        </Box>
    );
}