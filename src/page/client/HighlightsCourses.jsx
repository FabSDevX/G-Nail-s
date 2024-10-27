import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllDocumentsOrdered } from "../../utils/firebaseDB";
import { SeeMoreCard } from "../../component/SeeMoreCard";
import { CourseCard } from "../../component/CourseCard/CourseCard";

const titlesStyles = {
    fontSize: '40px',
    ml:'20px',
    fontWeight:'400',
    fontFamily:'Warung_Kopi',
    color:"var(--title-text-color)",
    py:'20px'
}

export const HighlightsCourses = () => {
    const [courses, setCourses] = useState([]);

    // Fetch courses from the "Course" collection
    useEffect(() => {
        const fetchCourses = async () => {
            const coursesData = await getAllDocumentsOrdered("Course", "views", "desc");
            setCourses(coursesData); 
        };

        fetchCourses();
    }, []);

    return (
        courses.length > 0 ? (
        <Box>
            <Typography  variant='h2' sx={titlesStyles}>Cursos destacados</Typography>
                 {/* Limit to 3 courses using slice(0, 3) */}
                <Box display={'flex'} justifyContent={'space-evenly'} flexWrap={"wrap"} gap={'10px'}>
                    {courses.slice(0, 3).map((course, index) => (
                        <CourseCard
                            key={index}
                            id={course.id}
                            title={course.name}
                            shortDescription={course.smallDescription}
                            largeDescription={course.largeDescription}
                            img={course.img}
                            lessonHours={course.numLessons}
                        />
                    ))}
                    <SeeMoreCard route={"cursos"} />
                </Box>
        </Box>
        ) : null
    );
};
