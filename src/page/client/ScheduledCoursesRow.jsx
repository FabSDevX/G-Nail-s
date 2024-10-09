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
            const courseDataPromises = scheduledCourses.map(async (e) => {
                const response = await getDocumentById("Course", e.courseUID);
                return {[e.courseUID]: response};
            });

            const courseDataArray = await Promise.all(courseDataPromises); // Esperar que se resuelvan todas las consultas

            // Crear el nuevo objeto a agregar
            const newCourseInfo = courseDataArray.reduce((acc, course) => {
                return {...acc, ...course};
            }, {});

            setCourseInfo((prevCourseInfo) => ({
                ...prevCourseInfo,
                ...newCourseInfo // Insertar el nuevo dato al final
            }));
        };

        getCoursesData();
    }, [scheduledCourses]);
    
    return (
        <Box display={'flex'} justifyContent={'space-evenly'} flexWrap={"wrap"} gap={'10px'}>
            {Object.keys(courseInfo).length > 0 && scheduledCourses.map((e) => {
                const course = courseInfo[e.courseUID];
                const dateWithHours = e.dates.map((e) => ({date:e.date, hours:hours[e.hours]}))
                return course ? (
                    <ScheduledCourseCard
                        key={e.courseUID + e.group}
                        title={course.name}
                        shortDescription={course.smallDescription}
                        img={course.img}
                        dates={dateWithHours}
                        cupo={e.cupo}
                        group={e.group}
                    />
                ) : null;
            })}
            <SeeMoreCard route={'scheduledCourses'}/>
        </Box>
    );
}