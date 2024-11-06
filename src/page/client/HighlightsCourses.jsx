import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllDocumentsOrdered } from "../../utils/firebaseDB";
import { SeeMoreCard } from "../../component/SeeMoreCard";
import { CourseCard } from "../../component/CourseCard/CourseCard";

const titlesStyles = {
  fontSize: "40px",
  ml: "20px",
  fontWeight: "400",
  fontFamily: "Warung_Kopi",
  color: "var(--title-text-color)",
  py: "20px",
};

export const HighlightsCourses = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses from the "Course" collection
  useEffect(() => {
    const fetchCourses = async () => {
      const coursesData = await getAllDocumentsOrdered(
        "Course",
        "views",
        "desc"
      );
      setCourses(coursesData);
    };

    fetchCourses();
  }, []);

  return courses.length > 0 ? (
    <Box>
      <Typography
        variant="h2"
        sx={{
          ...titlesStyles,
          "@media (max-width: 658px)": {
            textAlign: "center",
          },
        }}
      >
        Cursos destacados
      </Typography>
      {/* Limit to 3 courses using slice(0, 3) */}
      <Box
        display={"flex"}
        justifyContent={"space-evenly"}
        flexWrap={"wrap"}
        gap={"10px"}
        sx={{
          "@media (max-width: 990px)": {
            justifyContent: "space-between",
          },
          "@media (max-width: 658px)": {
            justifyContent: "center",
          },
          "@media (min-width: 1000px)": {
            justifyContent: "space-between",
          },
        }}
      >
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
  ) : null;
};
