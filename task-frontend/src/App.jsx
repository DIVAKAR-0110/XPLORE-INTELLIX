import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeLogin from "./components/EmployeeLogin";
import EmployeeDashboard from "./components/EmployeeDashboard";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import EmployeeRegister from "./components/EmployeeRegister";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Employee Module */}
        <Route path="/" element={<EmployeeLogin />} />
        <Route path="/employee_register" element={<EmployeeRegister />} />
        <Route path="/employee_dashboard" element={<EmployeeDashboard />} />

        {/* Admin Module */}
        <Route path="/admin_login" element={<AdminLogin />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
