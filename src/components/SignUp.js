import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer,toast } from "react-toastify";

const SignUp = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const signUp = async(e) => {
        e.preventDefault()
        try{
            await createUserWithEmailAndPassword(auth,email,password)
                    .then(userCredential=>{
                        const user = userCredential.user
                        console.log('user successfully signed up',user)
                        console.log('user successfully signed up',auth.currentUser)
                    })
        }
        catch(err){
            console.error('error signup user',err)
            //toast.error(err)
        }
    }

    return(
        <div>
            <ToastContainer/>
            <div>
                <h1>Register</h1>
                <form>
                    <input type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} />
                    <button onClick={(e)=>signUp(e)} >Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp