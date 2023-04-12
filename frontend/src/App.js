import SignInPage from "./component/signin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminDashboard from "./component/dashboard/admin.dashboard";
import InstructorDashboard from "./component/dashboard/instructor.dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
