import './App.css';
import {  BrowserRouter, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBar/Navbar';
import Logo from './components/NavBar/logo';
import Home from './components/Pages/home';
import Student from './components/Pages/student';
import Staff from './components/Pages/staff';
import AdmissionsInfo  from './components/Pages/admissions-info ';
import Parents  from './components/Pages/parents';
import Pricing from './components/Pages/pricing';
import About from './components/Pages/about';
import Contact from './components/Pages/contact';
import Footer from './components/footer';
import Apply from "./components/Pages/apply";
import Form from "./components/Pages/form";

import './App.css';

function App() {

  return (
    <> 

    <BrowserRouter>
         <Logo/>
         <Navbar />
      <Routes>
        <Route path='/' exact element={<Home/>} />
        <Route path='/student'element={<Student/>} />
        <Route path='/staff' element={<Staff/>} />
        <Route path='/pricing' element={<Pricing/>} />
        <Route path='/Parents' element={<Parents/>} />
        <Route path='/AdmissionsInfo' element={<AdmissionsInfo/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/apply' element={<Apply/>} />
        <Route path='/form' element={<Form/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
 
   
     
    </>
  );
}

export default App;
