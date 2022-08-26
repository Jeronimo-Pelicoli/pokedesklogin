import { Routes, Route } from 'react-router-dom';
import DashBoard from '../pages/Dashboard';
import Login from '../pages/Login';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRouter;
