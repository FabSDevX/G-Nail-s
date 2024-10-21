import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllDocumentsOrdered } from "../../utils/firebaseDB";
import { SeeMoreCard } from "../../component/SeeMoreCard";
import { CourseCard } from "../../component/CourseCard/CourseCard";

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
        <Box display={'flex'} justifyContent={'space-evenly'} flexWrap={"wrap"} gap={'10px'}>
            {courses.length > 0 ? (
                // Limit to 4 courses using slice(0, 4)
                courses.slice(0, 4).map((course, index) => (
                    <CourseCard
                        key={index}
                        id={course.id}
                        title={course.name}
                        shortDescription={course.smallDescription}
                        largeDescription={course.largeDescription}
                        img={course.img}
                        lessonHours={course.numLessons}
                    />
                ))
            ) : (
                <Typography>No courses found</Typography>
            )}
            <SeeMoreCard route={"cursos"} />
        </Box>
    );
};
