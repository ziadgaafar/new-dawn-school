import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/NavBar/Navbar";
import Logo from "./components/NavBar/logo";
import Home from "./components/Pages/home";

import AdmissionsInfo from "./components/Pages/admissions-info ";
import Parents from "./components/Pages/parents";
import Pricing from "./components/Pages/pricing";
import About from "./components/Pages/about";
import Contact from "./components/Pages/contact";
import Footer from "./components/footer";
import Apply from "./components/Pages/apply";
import Form from "./components/Pages/form";
import Covid from "./components/Pages/covid";
import Login from "./components/Pages/login";
import Dashboard from "./components/Pages/Dashboard";

import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";

const dontShow = ["login", "dashboard"];

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Logo dontShow={dontShow} />
        <Navbar dontShow={dontShow} />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/Parents" element={<Parents />} />
          <Route path="/AdmissionsInfo" element={<AdmissionsInfo />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/form" element={<Form />} />
          <Route path="/covid" element={<Covid />} />
          <Route path="/login" element={<Login />} />
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Footer dontShow={dontShow} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
