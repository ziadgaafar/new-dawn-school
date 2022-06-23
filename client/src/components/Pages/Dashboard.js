import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import "./dashboard.css";

import Sidebar from "../Dashboard/sidebar";
import Student from "../Dashboard/student";
import Courses from "../Dashboard/courses";
import Chats from "../Dashboard/chats";
import Settings from "../Dashboard/settings";

const Dashboard = ({}) => {
  // ملكش دعوه بدول يغالي
  // const { token, user } = useSelector((state) => state.auth);
  // if (!token) return <Navigate to="/login" />;

  return (
    <div className="dashboard">
      <Sidebar>
        <Routes>
          <Route path="/" exact element={<Student />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Sidebar>
    </div>
  );
};

export default Dashboard;
