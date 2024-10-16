import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchScheduledCourses } from "../../store/slices/ScheduledCoursesSlice";
import { useEffect, useState } from "react";
import { ScheduledCourseCard } from "../../component/ScheduledCourseCard/ScheduledCourseCard";
import { getDocumentById } from "../../utils/firebaseDB";
import { SeeMoreCard } from "../../component/SeeMoreCard";

export const ScheduledCoursesRow = () => {
    const dispatch = useDispatch();
    const { scheduledCourses, status, error } = useSelector((state) => state.scheduledCourses);
    const [courseInfo, setCourseInfo] = useState({});
    const [hours, setHours] = useState([])
  
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchScheduledCourses()); // Cargar reservas al montar el componente   
      }

    }, [status, dispatch]);

    useEffect(() => {
        const getContactInfo = async () => {
            const response = await getDocumentById("Contact info", "Information")
            setHours(response.lessonSchedule)
        }
        getContactInfo();
    }, [])

    useEffect(() => {
        const getCoursesData = async () => {
            let listScheduledCourses = []
            const courseDataPromises = scheduledCourses.map(async (e) => {
                const response = await getDocumentById("Course", e.courseUID);
                listScheduledCourses.push({...response, cupo:e.cupo, dates:e.dates, group:e.group, idReservation:e.id})
            });

            await Promise.all(courseDataPromises);

            setCourseInfo(listScheduledCourses);
        };

        getCoursesData();
    }, [scheduledCourses]);
    
    return (
        <Box display={'flex'} justifyContent={'space-evenly'} flexWrap={"wrap"} gap={'10px'}>
            {courseInfo.length > 0 && courseInfo.map((e) => {
                const dateWithHours = e.dates.map((e) => ({date:e.date, hours:hours[e.hours]}))
                return (
                    <ScheduledCourseCard
                        key={e.idReservation}
                        title={e.name}
                        shortDescription={e.smallDescription}
                        img={e.img}
                        dates={dateWithHours}
                        cupo={e.cupo}
                        group={e.group}
                    />
                )
            })}
            <SeeMoreCard route={'cursosAgendados'}/>
        </Box>
    );
}