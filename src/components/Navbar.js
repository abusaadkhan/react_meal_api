import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from '../assets/talab_logo.png'
import navIcon from '../assets/navigation-bar.png'
import { auth } from "../firebase/firebase";
import { logOut } from "./logOut";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "./User";

const Navbar = () => {
    const [flag,setFlag] = useState(false)

    const [user,setUser] = useState(null)
    
    const getUser = async() => {
        try{
            await onAuthStateChanged(auth,(user)=>{
                setUser(user)
            })
        }catch(err){
            console.error('cant find user')
        }
    }

    useEffect(()=>{
        getUser()
    },[])

    return(
        <>
        <div className="flex items-center gap-10 px-2 bg-[#129b9b] max-[480px]:flex-col max-[480px]:gap-2  max-[480px]:items-start  max-[480px]:p-1 max-[480px]:h-">
            <div className="logo" >
                <img src={logo} className='w-24 max-[480px]:w-16' />
            </div>
            <div className="w-0 absolute top-5 right-5 cursor-pointer max-[480px]:w-7 " onClick={()=>setFlag(!flag)} ><img src={navIcon} ></img></div>
            {flag? (
                <ul className="flex flex-col gap-5 absolute  top-16 bg-red-400/95 items-start p-4 w-full  left-0 font-semibold text-lg min-[480px]:hidden z-10 " >
                <Link to="/" >
                    <li className="hover:underline underline-offset-8 decoration-2 " >Home</li>
                </Link>
                <Link to="/recipes" >
                    <li className="hover:underline underline-offset-8 decoration-2">Recipes</li>
                </Link>
                <Link to="/about" >
                    <li className="hover:underline underline-offset-8 decoration-2">About</li>
                </Link>
                <Link to="/contact" >
                    <li className="hover:underline underline-offset-8 decoration-2">Contact</li>
                </Link>
                <Link to="/signUp" >
                <li className="hover:underline underline-offset-8 decoration-2">SignUp</li>
                </Link>
                {
                    user? (
                        
                        
                        <li className="hover:underline underline-offset-8 decoration-2 cursor-pointer" onClick={logOut}>logout</li>
                        
                    ) : (
                        <Link to="/signIn" >
                            <li className="hover:underline underline-offset-8 decoration-2">SignIn</li>
                        </Link>
                    )
                 }
            </ul>
            ) : (
               <div></div>
            )}
            <ul className="flex gap-10 font-semibold text-lg max-[480px]:hidden" >
            <Link to="/" >
                <li className="hover:underline underline-offset-8 decoration-2" >Home</li>
            </Link>
            <Link to="/recipes">
                <li className="hover:underline underline-offset-8 decoration-2">Recipes</li>
            </Link>
            <Link to="/about" >
                <li className="hover:underline underline-offset-8 decoration-2">About</li>
            </Link>
            <Link to="/contact" >
                <li className="hover:underline underline-offset-8 decoration-2">Contact</li>
            </Link>
            <Link to="/signUp" >
                <li className="hover:underline underline-offset-8 decoration-2">SignUp</li>
            </Link>
            
            {
                user? (
                    
                    
                    <li className="hover:underline underline-offset-8 decoration-2 cursor-pointer" onClick={logOut}>logout</li>
                    
                ) : (
                    <Link to="/signIn" >
                        <li className="hover:underline underline-offset-8 decoration-2">SignIn</li>
                    </Link>
                )
             }
            
        </ul>
        <div className="user font-semibold absolute right-2 max-[480px]:right-14 max-[480px]:top-5 ">{user?.email}</div>
        </div>
        </>
    )
}

export default Navbar