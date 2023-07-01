import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";



    
export const User = async() => {
    try{
        await onAuthStateChanged(auth,(user)=>{
            return user
        })
    }catch(err){
        console.error('cant find user')
    }
    }
    
    