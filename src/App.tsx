import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TaskManager from './components/TaskManager';
import RobotManager from './components/RobotManager';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/DashboardNew';
import { ToastProvider } from './components/Toast';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [tabValue, setTabValue] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastProvider>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard, task and robot tabs">
                <Tab label="Dashboard" />
                <Tab label="Tasks" />
                <Tab label="Robots" />
              </Tabs>
            </Box>
            {tabValue === 0 && <Dashboard />}
            {tabValue === 1 && <TaskManager />}
            {tabValue === 2 && <RobotManager />}
          </Container>
          <Footer />
        </Box>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
