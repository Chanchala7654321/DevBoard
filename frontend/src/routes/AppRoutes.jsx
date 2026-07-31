import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Board from "../pages/Board";
import MyTasks from "../pages/MyTasks";
import Projects from "../pages/Projects";
import Team from "../pages/Team";
import Contact from "../pages/Contact";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/board" element={<Board />} />
      <Route path="/my-tasks" element={<MyTasks />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/team" element={<Team />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default AppRoutes;