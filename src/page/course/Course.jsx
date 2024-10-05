import { useEffect, useState } from "react";
import { getAllDocuments } from "../../utils/firebaseDB";
import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import { CourseCard } from "../../component/CourseCard/CourseCard";

function Course() {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 8;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCourses, setFilteredCourses] = useState([]);

    useEffect(() => {
        const courseValues = async () => {
            const courseValues = await getAllDocuments("Course");
            // Ordenar los cursos por nombre
            const sortedCourses = courseValues.sort((a, b) => a.name.localeCompare(b.name));
            setCourses(sortedCourses);
            setFilteredCourses(sortedCourses); // Inicialmente, muestra todos los cursos
        };
        courseValues();
    }, []);

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
                    key={i}
                    variant={i === currentPage ? "contained" : "outlined"}
                    onClick={() => handlePageClick(i)}
                    sx={{ margin: "0 4px" }}
                >
                    {i}
                </Button>
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
        <Box sx={{ maxWidth: "1444px", margin: "0 auto", display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", marginBottom: 2 }}>
                <TextField
                    variant="outlined"
                    placeholder="Buscar cursos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ flexGrow: 1, marginRight: 1 }}
                />
                <Button variant="contained" onClick={handleSearch}>
                    Buscar
                </Button>
            </Box>
            {searchTerm && (
                <Box sx={{ marginBottom: 2 }}>
                    <Button variant="outlined" onClick={handleClearFilters}>
                        Limpiar Filtros
                    </Button>
                </Box>
            )}

            <Typography margin="5px 15px 50px auto" fontWeight="normal" fontSize="18px" component="p">
                Se han encontrado{" "}
                <Typography fontSize="20px" color="var(--primary-color)" component="span">
                    {totalCoursesNumber}
                </Typography>{" "}
                resultados
            </Typography>

            <Grid container rowSpacing={3} columnSpacing={2} justifyContent="center">
                {currentCourses.map(({ img, largeDescription, name, numLessons, smallDescription }, index) => (
                    <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                        <CourseCard
                            title={name}
                            shortDescription={smallDescription}
                            lessonHours={numLessons}
                            largeDescription={largeDescription}
                            img={img}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                <Button variant="contained" onClick={handlePrevPage} disabled={currentPage === 1}>
                    Anterior
                </Button>
                {renderPageNumbers()}
                <Button
                    variant="contained"
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

export default Course;
