import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import AddMember from './pages/AddMember';
import Graph from './pages/Graph';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { Toaster } from 'react-hot-toast';

// Wrapper component to handle Layout visibility
const AppRoutes = () => {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname.toLowerCase());


  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }


  return (
    <Layout>
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <AppRoutes />
    </Router>
  );
}

export default App;
