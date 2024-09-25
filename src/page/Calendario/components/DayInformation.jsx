import { Box, Divider, Paper } from "@mui/material";
import { Typography } from "antd";
import { InfoScheduledCourse } from "./InfoScheduledCourse";

export const DayInformation =({todayActivities, isMobile, value, isEditable, onButtonClick}) => {
    return (
        <Paper
          elevation={isMobile?0:3}
          sx={{
            padding: '16px',
            borderRadius:isMobile? '0 0 15px 15px':'15px',
            border:isMobile?'1px black solid':'none',
            borderTop:'none',
            backgroundColor: '#ffd3e5',
            width:isMobile?'289px':'200px',
            margin:isMobile?'auto':'0 auto 0 5px'
          }}
        >
          <Typography variant="h6" mb={'5px'}>
              Agenda del 
              <em style={{fontSize:'16px', marginLeft:'5px'}}>
                <b>
                   {value.format('DD-MM-YYYY')}
                </b>
              </em>
          </Typography>
          <Divider />
          <Box justifyContent={'center'} alignContent={'center'} minHeight={isMobile?'fit-content':'312px'}>
            {todayActivities.map((item, index) => (
                  <Box key={index} margin={'20px auto'} >
                    <InfoScheduledCourse hours={item.hours} courseInfo={item.activity} date={value.format('DD-MM-YYYY')} isEditable={isEditable} onButtonClick={onButtonClick}/>
                  </Box>
                ))
            }
          </Box>
        </Paper>
    );
}