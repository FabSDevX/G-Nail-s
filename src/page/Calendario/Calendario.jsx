import { Box, Button, colors, Typography } from "@mui/material";
import TableScheduledCourses from "./components/TableScheduledCourses";
import Calendar from "./components/Calendar";
import { db } from '../../../firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from "react";


export function Calendario (){
    const isMobile = useMediaQuery('(max-width:1090px)');
    const [data, setData] = useState([]);
    const [dates, setDates] = useState([]);
    const [coursesDates, setCoursesDates] = useState([])

    /*useEffect(() => {
        const  getData = async () => {
          const tempData = []
          const tempDates = []
          const querySnapshot = await getDocs(collection(db, "Agenda"));
          querySnapshot.forEach((doc) => {
            tempData.push({'date':doc.id, ...doc.data()})
            let [day, month, year] = doc.id.split("-");
            const dateObject = new Date(year, month - 1, day);
            tempDates.push(dateObject);
          });
          setData(tempData);
          setDates(tempDates);

          //Get courses with dates
          let coursesWithDates = []
          if (tempData){
            tempData.map((date) => {
              date.courseScheduled.map((course) => {
                let exists = coursesWithDates.filter((c) => {return c.uid===course.courseID})
                if(exists.length){
                  coursesWithDates.map((n) => {
                    if (n.uid===course.courseID)
                      n.dates.push(date.date)
                  })
                }
                else
                  coursesWithDates.push({"uid":course.courseID, "dates":[date.date]})
              })
            })
          }
          setCoursesDates(coursesWithDates)
        }
    
        getData();
      }, []);
      */
    
    useEffect(() => {
        const  getData = async () => {
          const tempData = []
          const tempDates = []
          const querySnapshot = await getDocs(collection(db, "Calendar"));
          querySnapshot.forEach((doc) => {
            tempData.push({'date':doc.id, ...doc.data()})
            let [day, month, year] = doc.id.split("-");
            const dateObject = new Date(year, month - 1, day);
            let count = doc.data().scheduledCoursesUids.length;
            tempDates.push({date:dateObject, count});
          });
          setData(tempData);
          setDates(tempDates);
        }
    
        getData();
      }, []);


    return (
        <Box>
            <Typography fontSize={30} ml={12}>Cursos agendados</Typography>
            <Box  margin={'20px 0 20px auto'} justifyContent={'center'}>
                <TableScheduledCourses/>
                <Calendar data={data} dates={dates}/>
            </Box>
        </Box>
    )
}