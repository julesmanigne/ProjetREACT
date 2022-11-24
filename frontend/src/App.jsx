import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Typography, AppBar, CssBaseline, Grid, Toolbar} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import WidgetCard from './components/WidgetCard';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import WidgetAlarm from './components/WidgetAlarm';
import WidgetWeather from './components/WidgetWeather';
import Widget4 from './components/Widget4';
import Widget5 from './components/Widget5';
import Widget6 from './components/Widget6';


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

const App = () => {
  return (
        <>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <AppBar position="relative">
                <Toolbar>
                    <DashboardIcon />
                    <Typography variant='h6'>
                        Widget Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>                  
        </ThemeProvider>
        <main>
            <Container maxWidth="xxl">
                <Box sx={{ bgcolor: '#e6e6e6', height: '100%', padding: 5, margin: 5}}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={5} columns={16}>

                            <Grid item lg={8} md={8}>
                                
                                    <WidgetCard>

                                    </WidgetCard>
                                
                            </Grid>
                            <Grid item lg={8} md={4}>
                            
                                    <WidgetAlarm>
                                        
                                    </WidgetAlarm>
                               
                            </Grid>
                            <Grid item lg={5} md={4}>
                            
                                    <WidgetWeather>

                                    </WidgetWeather>
                            </Grid>
                            <Grid item lg={6} md={4}>
                       
                                    <Widget4>

                                    </Widget4>
                             
                            </Grid>
                            <Grid item lg={5} md={8}>
                        
                                    <Widget5>

                                    </Widget5>

                            </Grid>
                            <Grid item lg={18} md={4}>

                                    <Widget6>

                                    </Widget6>
                     
                            </Grid>
                        </Grid>
                    </Box>
                </Box> 
            </Container>
        </main>
        </>
  )
}

export default App;