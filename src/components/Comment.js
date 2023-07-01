import React, { useContext, useState } from "react";
import {db,auth} from '../firebase/firebase'
import { collection,addDoc,getDocs, query, where, deleteDoc,doc } from "firebase/firestore";
import { myContext } from '../App'
import { useEffect } from "react";

const Comment = ({idMeal}) => {
    const [ commentData,setCommentData] = useState('')
    const [comments,setcomments] = useState([])
    const [userName,setUserName] = useState('anonymous') 
    const [randomkey,setRandomKey] = useState(0)
    const user = useContext(myContext)
    const commentsRef = collection(db,'comment')

    const renderkey = () =>{
        //
    }

    const displayComment = async() => {
        try{
            const q = query(commentsRef, where('idMeal', '==', idMeal))
           // const data = await getDocs(collection(db,'comment'))
            const data = await getDocs(q)
            console.log('data.docs fetched',data.docs)

            //why it is working cant understand properly
           const comments =  data.docs.map((doc)=>({id:doc.id,...doc.data()}))
            console.log('comments fetched',comments)
            setcomments(comments)
        }catch(err){
            console.error('error while fetching data from firestore',err)
        }
    }

    const onComment = async(e) => {
        e.preventDefault()
        try{
            await addDoc(collection(db,'comment'),{
                commentData:commentData,
                userName:userName,
                idMeal:idMeal
            })
            setCommentData('')
            displayComment()
        }catch(err){
            console.log ('error while uploading data',err)
        }
    }

    const deleteComment = async(e,id) => {
        e.preventDefault()
        try{
            await deleteDoc(doc(db,'comment',id))
            //setRandomKey(Math.random())
            displayComment()
        }catch(err){
            console.error('error while deleting comment:',err)
        }
    }

    useEffect(()=>{
        if(user){
            setUserName(user?.auth?.currentUser?.email)
        }else{
            setUserName('anonymous')
        }
    },[user])

    useEffect(()=>{
        displayComment()
    },[])
    //console.log('comments fetched',comments)
    console.log('random key :',randomkey)

    return(
        <div className="mt-8 mx-auto w-2/3  flex flex-col items-start box-border" >
            <h1 className="font-semibold my-3 text-xl" >Comments</h1>
            <hr className="w-full mb-5" />
            <form className="flex flex-col w-full" >
                <textarea className="w-full border-2 border-solid p-3 mb-2" value={commentData} onChange={(e)=>setCommentData(e.target.value)} ></textarea>
                <div className="flex justify-between items-center max-[480px]:flex-col  max-[480px]:items-start">
                    <div className=" flex max-[480px]:flex-col max-[480px]:items-start my-2">
                        <label className="mr-2" >Post As : </label>
                        <input className="border-2 border-solid px-1 max-[480px]:ml-0" value={userName} onChange={(e)=>setUserName(e.target.value)}  />
                    </div>
                    <button onClick={(e)=>onComment(e)} className="bg-blue-500 py-1 px-2 rounded-sm text-center "  >comment</button>
                </div>
         </form>

         <div className="w-full" >
         {
            comments.map(com=>(
                <div key={com} className=" flex justify-between w-full gap-3 mb-2" >
                    <div className="flex flex-col items-start justify-start my-2 w-[90%]">
                        <div className="text-base font-semibold">{com.userName} : </div>
                        <div className=" text-sm text-left " >{com.commentData}</div>
                    </div>
                    <button className="bg-red-300 py-0 px-1 text-xs rounded-sm text-center w-[7%] h-6 " onClick={(e)=>deleteComment(e,com.id)} >delete</button>
                </div>
            ))
         }
         </div>
         
        
        </div>
    )
}

export default Comment