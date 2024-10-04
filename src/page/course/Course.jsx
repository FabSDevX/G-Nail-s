import { useEffect, useState } from "react";
import { getAllDocuments } from "../../utils/firebaseDB";
import { Box } from "@mui/material";
import { CourseCard } from "../../component/CourseCard/CourseCard";


function Course() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const courseValues = async () => {
            const courseValues = await getAllDocuments("Course");
            setCourses(courseValues);
        }
        courseValues();
    }, []);

    return (
        <Box>
            {courses.map(({img, largeDescription, name, numLessons, smallDescription}, index) => (
                <CourseCard key={index} title={name} shortDescription={smallDescription} lessonHours={numLessons} largeDescription={largeDescription} img={img}  />
            ))}
        </Box>

    );
}

export default Course;