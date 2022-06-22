import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

const Header = () => <div>Dashboard - Header</div>;
const Settings = () => <div>Hello - Settings</div>;
const Chats = () => <div>Hello - Chats</div>;

const Dashboard = ({}) => {
  // ملكش دعوه بدول يغالي
  // const { token, user } = useSelector((state) => state.auth);
  // if (!token) return <Navigate to="/login" />;

  return (
    <>
      <Header />
      <Routes>
        <Route path="settings" element={<Settings />} />
        <Route path="chats" element={<Chats />} />
      </Routes>
    </>
  );
};

export default Dashboard;
