import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SigninForm from './components/SigninForm';
import ForgotPassword from './components/ForgotPassword';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees'; // 

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signin" element={<SigninForm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

    
     <Route path="/dashboard" element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="employees" element={<Employees />} />
    </Route>
    </Routes>
  );
}

export default App;
