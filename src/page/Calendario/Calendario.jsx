import { Box, Button, colors, Typography } from "@mui/material";
import TableScheduledCourses from "./components/TableScheduledCourses";
import Calendar from "./components/Calendar";
import { db } from '../../../firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchScheduledCourses } from "../../store/slices/ScheduledCoursesSlice";

export function Calendario (){
    // const [data, setData] = useState([])
    // const [dates, setDates] = useState([])

    // const  UpdateData = async () => {
    //   const tempData = []
    //   const tempDates = []
    //   const querySnapshot = await getDocs(collection(db, "Calendar"));
    //   querySnapshot.forEach((doc) => {
    //     tempData.push({'date':doc.id, ...doc.data()})
    //     let [day, month, year] = doc.id.split("-");
    //     const dateObject = new Date(year, month - 1, day);
    //     let count = doc.data().scheduledCoursesUids.length;
    //     tempDates.push({date:dateObject, count});
    //   });
    //   setData(tempData);
    //   setDates(tempDates);
    // }

    // useEffect(() => {
    //     UpdateData()
    // }, []);

    return (
        <Box>
            <Typography fontSize={30} ml={12}>Cursos agendados</Typography>
            <Box  margin={'20px 0 20px auto'} justifyContent={'center'}>
                <TableScheduledCourses />

                {/* <TableScheduledCourses onAction={UpdateData}/> */}
                {/* <Box mt={'80px'}>
                  <Calendar propsdata={data} propsdates={dates} isEditable={true} />
                </Box> */}
            </Box> 
        </Box>
    )
}