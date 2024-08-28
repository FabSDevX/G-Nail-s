import { Box, Button, Typography } from "@mui/material";
import TableScheduledCourses from "./components/TableScheduledCourses";
import Calendar from "./components/Calendar";

import { useMediaQuery } from '@mui/material';


export function Calendario (){
    const isMobile = useMediaQuery('(max-width:1090px)');

    // const style = {
    //     box:{
    //         display: isMobile ? "inline":'flex'
    //     }
    // }

    return (
        <Box>
            <Typography fontSize={30} ml={12}>Cursos agendados</Typography>
            <Box  margin={'20px 0 20px auto'} justifyContent={'center'}>
                <TableScheduledCourses />
                <Calendar />
            </Box>
        </Box>
    )
}