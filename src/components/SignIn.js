import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [email,setEmail] = useState('test@gmail.com')
    const [password,setPassword] = useState('hitesh')
    const navigate = useNavigate()
    
    const signIn = async(e) => {
        e.preventDefault()
        try{
            await signInWithEmailAndPassword(auth,email,password)
                    .then(userCredential=>{
                        const user = userCredential.user
                        console.log('user successfully signed In',user.auth.currentUser.email)
                        // console.log('user successfully signed In',auth)
                        // why navigate is not for '/recipes' coz recipe we have used useeffect which is redirecting it to sign in page
                       navigate('/')
                    })
        }
        catch(err){
            console.error('error signup user',err)
            //toast.error(err)
        }
    }

    // const redirectToHome = () => {
    //     if(auth?.currentUser?.email){
    //         navigate('/')
    //     }
    // }
    // useEffect(()=>{
    //     redirectToHome()
    // },[auth])
    return(
        <div>
            <ToastContainer/>
            <div>
                <h1>Sign In</h1>
                <form>
                    <input type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    <button onClick={(e)=>signIn(e)} >Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default SignIn