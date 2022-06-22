import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

const Sidebar = () => <div>Dashboard - Sidebar</div>;
const Student = () => <div>Dashboard - Student</div>;
const Settings = () => <div>Dashboard - Settings</div>;
const Chats = () => <div>Dashboard - Chats</div>;

const Dashboard = ({}) => {
  // ملكش دعوه بدول يغالي
  // const { token, user } = useSelector((state) => state.auth);
  // if (!token) return <Navigate to="/login" />;

  return (
    <>
      <Sidebar />
      <Student />
      <Routes>
        <Route path="settings" element={<Settings />} />
        <Route path="chats" element={<Chats />} />
      </Routes>
    </>
  );
};

export default Dashboard;
