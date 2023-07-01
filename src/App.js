import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import axios from "axios"
import { createContext, useEffect, useState } from 'react';
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
export const myContext = createContext()

function App() {
 const [user,setUser] = useState({})

 const getUser = async() => {
  try{
      await onAuthStateChanged(auth,(user)=>{
          setUser(user)
      })
  }catch(err){
      console.error('cant find user',err)
  }
  }

  useEffect(()=>{
    getUser()
  },[])
  console.log('user at app',user)

  return (
    <myContext.Provider value={user}>
      <div className="App">
      <Navbar/>
      <Outlet/>
      <Footer/>
      </div>
    </myContext.Provider>
  );
}

export default App;
