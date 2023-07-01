import { auth } from "../firebase/firebase"
import { signOut } from "firebase/auth" 

export const logOut = async() => {
    try{
        await signOut(auth)
    }catch(err){
        console.error('user cant be sign out',err)
    }
}