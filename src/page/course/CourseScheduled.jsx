import { useEffect, useState } from "react";
import { getAllDocuments, getDocumentById } from "../../utils/firebaseDB";
import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import { CourseCard } from "../../component/CourseCard/CourseCard";
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from "react-redux";
import { fetchScheduledCourses } from "../../store/slices/ScheduledCoursesSlice";
import { ScheduledCourseCard } from "../../component/ScheduledCourseCard/ScheduledCourseCard";

function CourseScheduled() {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 8;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCourses, setFilteredCourses] = useState([]);

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

            // Ordenar los cursos por nombre
            const sortedCourses = listScheduledCourses.sort((a, b) => a.name.localeCompare(b.name));
            setCourses(sortedCourses);
            setFilteredCourses(sortedCourses); // Inicialmente, muestra todos los cursos
        };

        getCoursesData();
    }, [scheduledCourses]);

    const totalCoursesNumber = filteredCourses.length;
    const totalPages = Math.ceil(totalCoursesNumber / coursesPerPage);

    // Calculate course indexes to be displayed on the current page
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Search course by name, small description, large description
    const handleSearch = () => {
        if (searchTerm.trim()) {
            const filtered = courses.filter(course =>
                course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.smallDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.largeDescription.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCourses(filtered);
            setCurrentPage(1);
        } else {
            setFilteredCourses(courses);
        }
    };

    // Reset filter function
    const handleClearFilters = () => {
        setSearchTerm("");
        setFilteredCourses(courses);
        setCurrentPage(1);
    };

    // Generate page buttons
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisibleButtons = 5; // Max limit
        let startPage, endPage;

        // Determinar el rango de páginas a mostrar
        if (totalPages <= maxVisibleButtons) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const halfVisible = Math.floor(maxVisibleButtons / 2);
            startPage = Math.max(1, currentPage - halfVisible);
            endPage = Math.min(totalPages, currentPage + halfVisible);

            // Asegurarse de que siempre se muestre la primera y la última página
            if (startPage === 1) {
                endPage = Math.min(maxVisibleButtons, totalPages);
            } else if (endPage === totalPages) {
                startPage = Math.max(1, totalPages - maxVisibleButtons + 1);
            }
        }

        // Añadir los números de página al array
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <Button
                    size="small"
                    key={i}
                    variant={i === currentPage ? "contained" : "outlined"}
                    onClick={() => handlePageClick(i)}
                    sx={{margin: "0 4px", border:"2px solid var(--primary-color)", color:"black",
                        backgroundColor: i === currentPage ? "var(--primary-color) " : "transparent",
                        "&:hover": {
                            backgroundColor: i === currentPage ? "var(--secondary-color)" : "var(--primary-color)",
                        },
                    }}
                >{i}</Button>
            );
        }
        

        // Asegurarse de que siempre se muestre el primer y el último botón
        if (startPage > 1) {
            pageNumbers.unshift(
                <Button
                    key={1}
                    variant={1 === currentPage ? "contained" : "outlined"}
                    onClick={() => handlePageClick(1)}
                    sx={{ margin: "0 4px" }}
                >
                    1
                </Button>
            );
        }
        if (endPage < totalPages) {
            pageNumbers.push(
                <Button
                    key={totalPages}
                    variant={totalPages === currentPage ? "contained" : "outlined"}
                    onClick={() => handlePageClick(totalPages)}
                    sx={{ margin: "0 4px" }}
                >
                    {totalPages}
                </Button>
            );
        }

        return pageNumbers;
    };

    return (
        <Box sx={{ maxWidth: "1444px", px: {xs:"15px", sm: "40px"}, margin: "0 auto", display: "flex", flexDirection: "column" }}>
            <Typography sx={{fontSize: {xs:"1rem",sm:"2rem", md:"3rem"}, fontWeight:"500", marginTop:"35px", marginBottom:"20px"}}>Cursos agendados disponibles</Typography>
            <Box sx={{ display: "flex", marginBottom: 2 }}>
                <TextField
                    variant="outlined"
                    placeholder="Buscar cursos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ flexGrow: 1, marginRight: 1 }}
                />
                <Button variant="contained" size="small" sx={{background:"var(--primary-color)", "&:hover":{background:"var(--secondary-color)"}}} onClick={handleSearch}><SearchIcon/></Button>
            </Box>
            {searchTerm && (
                <Box sx={{margin:"0 0 2px auto" }}><Button variant="contained" sx={{background:"#C7839A", color:"black", "&:hover":{background:"var(--primary-color)"}}} onClick={handleClearFilters}>Limpiar filtros</Button></Box>
            )}

            <Typography margin="5px 0 50px auto" fontWeight="normal" fontSize="18px" component="p">
                Se han encontrado{" "}
                <Typography fontSize="20px" color="var(--primary-color)" component="span">
                    {totalCoursesNumber}
                </Typography>{" "}
                resultados
            </Typography>

            <Grid container rowSpacing={3} columnSpacing={2} justifyContent="center">
                {currentCourses.map((e, index) => {
                    const dateWithHours = e.dates.map((e) => ({date:e.date, hours:hours[e.hours]}))
                    return (
                        <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                            <ScheduledCourseCard
                                key={e.idReservation}
                                title={e.name}
                                shortDescription={e.smallDescription}
                                img={e.img}
                                dates={dateWithHours}
                                cupo={e.cupo}
                                group={e.group}
                            />
                        </Grid>
                    )
                })}
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                <Button variant="text" onClick={handlePrevPage} disabled={currentPage === 1}>
                    Anterior
                </Button>
                {renderPageNumbers()}
                <Button
                    variant="text"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    sx={{ marginLeft: 1 }}
                >
                    Siguiente
                </Button>
            </Box>
        </Box>
    );
}

export default CourseScheduled;
