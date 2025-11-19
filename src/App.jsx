import './App.css'
import { HashRouter, Route, Routes } from 'react-router';
import { createContext, useState } from 'react';
import Home from './components/Home'
import AboutMe from './components/AboutMe'
import Questionnaire from './components/Questionnaire'
import BucketList from './components/BucketList'
import LoginSignup from './components/LoginSignup'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import AllLocations from './components/AllLocations';

export const AuthContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/about" element={<AboutMe/>}></Route>
          <Route path="/questionnaire" element={<Questionnaire/>}></Route>
          <Route path="/bucket-list" element={<BucketList/>}></Route>
          <Route path="/locations" element={<AllLocations />} />
          <Route path="/login" element={<LoginSignup/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
}

export default App
