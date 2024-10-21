import { Box, Button, Grid, Typography, TextField, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllDocuments } from "../../utils/firebaseDB";
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from "prop-types";
import { CourseCard } from "../CourseCard/CourseCard";

function CourseTemplate({ dataset, pageTitle}) {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const coursesPerPage = 8;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const courseValues = async () => {
            const courseValues = await getAllDocuments(dataset);

            // Extraer y limpiar las categorías
            const allCategories = courseValues.flatMap(course => course.categories.filter(Boolean)); // Elimina las categorías vacías
            const uniqueCategories = [...new Set(allCategories)];

            // Ordenar los cursos por nombre
            const sortedCourses = courseValues.sort((a, b) => a.name.localeCompare(b.name));
            setCourses(sortedCourses);
            setFilteredCourses(sortedCourses); // Inicialmente, muestra todos los cursos
            setCategories(uniqueCategories); // Establece las categorías únicas
        };
        courseValues();
    }, [dataset]);

    const totalCoursesNumber = filteredCourses.length;
    const totalPages = Math.ceil(totalCoursesNumber / coursesPerPage);

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

    const handleSearch = () => {
        let filtered = courses;

        if (searchTerm.trim()) {
            filtered = filtered.filter(course =>
                course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.smallDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.largeDescription.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter(course => course.categories.includes(selectedCategory));
        }

        setFilteredCourses(filtered);
        setCurrentPage(1);
    };

    // Se actualiza el filtro cada vez que cambia la búsqueda o la categoría
    useEffect(() => {
        handleSearch();
    }, [selectedCategory]);

    const handleClearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("");
        setFilteredCourses(courses);
        setCurrentPage(1);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisibleButtons = 5;
        let startPage, endPage;

        if (totalPages <= maxVisibleButtons) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const halfVisible = Math.floor(maxVisibleButtons / 2);
            startPage = Math.max(1, currentPage - halfVisible);
            endPage = Math.min(totalPages, currentPage + halfVisible);

            if (startPage === 1) {
                endPage = Math.min(maxVisibleButtons, totalPages);
            } else if (endPage === totalPages) {
                startPage = Math.max(1, totalPages - maxVisibleButtons + 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <Button
                    size="small"
                    key={i}
                    variant={i === currentPage ? "contained" : "outlined"}
                    onClick={() => handlePageClick(i)}
                    sx={{ margin: "0 4px", border: "2px solid var(--primary-color)", color: "black", backgroundColor: i === currentPage ? "var(--primary-color)" : "transparent", "&:hover": { backgroundColor: i === currentPage ? "var(--secondary-color)" : "var(--primary-color)" } }}
                >
                    {i}
                </Button>
            );
        }

        if (startPage > 1) {
            pageNumbers.unshift(
                <Button key={1} variant={1 === currentPage ? "contained" : "outlined"} onClick={() => handlePageClick(1)} sx={{ margin: "0 4px" }}>
                    1
                </Button>
            );
        }
        if (endPage < totalPages) {
            pageNumbers.push(
                <Button key={totalPages} variant={totalPages === currentPage ? "contained" : "outlined"} onClick={() => handlePageClick(totalPages)} sx={{ margin: "0 4px" }}>
                    {totalPages}
                </Button>
            );
        }

        return pageNumbers;
    };

    return (
        <Box sx={{ maxWidth: "1444px", px: { xs: "15px", sm: "40px" },  display: "flex", flexDirection: "column", margin: "0 auto" }}>
            <Typography sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" }, fontWeight: "500", marginTop: "35px", marginBottom: "20px", fontFamily: "Warung_Kopi", color:"var(--title-text-color)" }}>{pageTitle}</Typography>
            
            {/* Filters */}
            <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: {xs: "column", sm: "row"}, marginBottom: 2, gap: {xs:2, sm:10} }}>
                {/* Categories */}
                <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    displayEmpty
                    sx={{ marginRight: 1, minWidth: "200px", background: "var(--secondary-color)" }}
                >
                    <MenuItem value="">Todas las categorías</MenuItem>
                    {categories.map((category, index) => (
                        <MenuItem key={index} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
                {/* Search bar */}
                <Box sx={{display:"flex", width: {xs: "100%", sm:"70%"}}}>
                    <TextField
                        variant="outlined"
                        placeholder="Buscar cursos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ flexGrow: 1, marginRight: 1 }}
                        />
                    {/* Search bar button */}
                    <Button variant="contained" size="small" sx={{ background: "var(--primary-color)", "&:hover": { background: "var(--secondary-color)" } }} onClick={handleSearch}>
                        <SearchIcon />
                    </Button>
                </Box>
            </Box>

            {/* Clear filters button */}
            {searchTerm || selectedCategory ? (
                <Box sx={{ margin: "0 0 2px auto" }}>
                    <Button variant="contained" sx={{ background: "#C7839A", color: "black", "&:hover": { background: "var(--primary-color)" } }} onClick={handleClearFilters}>
                        Limpiar filtros
                    </Button>
                </Box>
            ) : null}

            {/* Quantity number */}
            <Typography margin="5px 0 50px auto" fontWeight="normal" fontSize="18px" component="p">
                Se han encontrado{" "}
                <Typography fontSize="20px" color="var(--primary-color)" component="span">
                    {totalCoursesNumber}
                </Typography>{" "}
                resultados
            </Typography>


            {/* Courses */}
            {totalCoursesNumber === 0 ? (
                <Typography textAlign="center" fontSize="1.5rem" color="gray" marginY="50px">
                    No se han encontrado cursos.
                </Typography>
            ) : (
            <Grid container spacing={6} sx={{justifyContent: {xs: "center", sm:"center", md:"space-evenly"}}}>
                {currentCourses.map((course, index) => (
                    <Grid item size="auto" key={index}>
                        <CourseCard
                            id={course.id}
                            title={course.name}
                            shortDescription={course.smallDescription}
                            img={course.img}
                            largeDescription={course.largeDescription}
                            lessonHours={course.numLessons}
                        />
                    </Grid>
                ))}
            </Grid>
            )}

            {/* Pagination */}
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
                <Button sx={paginationColor} variant="text" onClick={handlePrevPage} disabled={currentPage === 1}>
                    Anterior
                </Button>
                {renderPageNumbers()}
                <Button variant="text" onClick={handleNextPage} disabled={currentPage === totalPages} sx={{...paginationColor, marginLeft: 1 }}>
                    Siguiente
                </Button>
            </Box>
        </Box>
    );
}

const paginationColor = {
    color: "var(--primary-color)",
    "&:hover": {
        color: "var(--secondary-color)",
        border: "1px solid var(--secondary-color)"
    }
}

export default CourseTemplate;

CourseTemplate.propTypes = {
    dataset: PropTypes.string.isRequired,
    pageTitle: PropTypes.string,
    isScheduled: PropTypes.bool
};
