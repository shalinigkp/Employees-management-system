import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import DashBoard from "./pages/Dashboard";
import NoPage from "./pages/NoPage";
import AddEditEmployee from "./pages/AddEditEmployee";
import Department from "./pages/Department";
import Designation from "./pages/Designation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="addEditEmployee" element={<AddEditEmployee />} />
          <Route path="department" element={<Department/>}/>
          <Route path="designation" element={<Designation/>}/>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

