import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

const Sidebar = () => <div>Dashboard - Sidebar</div>;
const Student = () => <div>Dashboard - Student</div>;
const Courses = () => <div>Dashboard - Courses</div>;
const Chats = () => <div>Dashboard - Chats</div>;
const Settings = () => <div>Dashboard - Settings</div>;

const Dashboard = ({}) => {
  // ملكش دعوه بدول يغالي
  // const { token, user } = useSelector((state) => state.auth);
  // if (!token) return <Navigate to="/login" />;

  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" exact element={<Student />} />
        <Route path="courses" element={<Courses />} />
        <Route path="chats" element={<Chats />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </>
  );
};

export default Dashboard;
