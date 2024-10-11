
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from './pages/Signup';
import Login from './pages/Login0';
import SocialLinksForm from './pages/SocialLinksForm';
import SocialPage from './pages/SocialPage';
import Dashboard from './pages/Dashboard';


function App() {
  return (
   <>
       <BrowserRouter>
      <Routes>

          <Route path="/" element={<Signup />} />
          <Route path="/:vanityLink" element={<SocialPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<SocialLinksForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
 
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
