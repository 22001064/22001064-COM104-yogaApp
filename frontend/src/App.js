import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import Login from './pages/Login';
import Overview from './pages/Overview';
import Schedule from './pages/Schedule';
import AvailableClasses from './pages/AvailableClasses';
import Header from './components/Header';

function App() {
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));

  return (
    <Routes>
      <Route path="/" element={!user ? (<><Header /> <Login /></>) : (<Navigate to="/overview" />)}/>

      {user && (
        <Route path="/" element={<DashboardLayout />}>
          <Route path="overview" element={<Overview />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="available-classes" element={<AvailableClasses />} />
        </Route>
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;