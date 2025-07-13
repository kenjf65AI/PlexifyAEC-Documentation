import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './styles/theme';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Reports from './pages/Reports';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          } />
          <Route path="/chat" element={
            <MainLayout>
              <Chat />
            </MainLayout>
          } />
          <Route path="/reports" element={
            <MainLayout>
              <Reports />
            </MainLayout>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
