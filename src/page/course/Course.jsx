import CourseTemplate from "../../component/course/CourseTemplate";

function Course() {
    return (
        <CourseTemplate dataset="Course" pageTitle={"Cursos disponibles"} isScheduled={false}/>
    );
}

export default Course;
