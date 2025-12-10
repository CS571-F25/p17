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
import TravelPosts from './components/TravelPosts';
import Cookies from "js-cookie";
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchFavorites, addToBucketList, removeFromBucketList } from './utils/bucket';

export const AuthContext = createContext();
export const BucketListContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("auth"));
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [bucketList, setBucketList] = useState([]);

  useEffect(() => {
    const token = Cookies.get('auth');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token));
        setIsLoggedIn(true);
        setUserId(decoded._id);
        setUsername(decoded.username);
        
        // Fetch favorites when user is logged in
        fetchFavorites({
          userId: decoded._id,
          username: decoded.username,
          setBucketList
        });
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
      setBucketList([]);
    }
  }, []);

  const toggleBucketItem = async (destination) => {
    console.log("toggleBucketItem called", { destination, userId, username, bucketList });
    
    if (!destination || !destination.id) {
      console.warn("Invalid destination");
      return;
    }

    if (!userId && !username) {
      console.warn("User not logged in, cannot modify bucket list");
      return;
    }

    const exists = bucketList.some(item => item.id === destination.id);
    console.log("Destination exists in bucket?", exists);
    
    try {
      if (exists) {
        console.log("Removing from bucket list...");
        await removeFromBucketList({
          destinationId: destination.id,
          userId,
          username,
          bucketList,
          setBucketList
        });
      } else {
        console.log("Adding to bucket list...");
        await addToBucketList({
          destination,
          userId,
          username,
          bucketList,
          setBucketList
        });
      }
      console.log("Toggle completed successfully");
    } catch (error) {
      console.error("Error toggling bucket item:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userId, setUserId, username, setUsername }}>
      <BucketListContext.Provider value={{ bucketList, setBucketList, toggleBucketItem }}>
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/about" element={<AboutMe/>}></Route>
            <Route path="/questionnaire" element={<Questionnaire/>}></Route>
            <Route path="/bucket-list" element={<BucketList/>}></Route>
            <Route path="/locations" element={<AllLocations />} />
            <Route path="/posts" element={<TravelPosts />} />
          <Route path="/login" element={<LoginSignup/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
          </Routes>
        </HashRouter>
      </BucketListContext.Provider>
    </AuthContext.Provider>
  );
}

export default App
