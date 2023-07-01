import React, { useState } from "react";
import Card from "./Card";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import banner from '../assets/istockphoto-1217108207-1024x1024.jpg'

const Home = () => {
    const [meal,setMeal] = useState('')
    //data not needed here
    const [data,setData] = useState({})
    const [id,setId] = useState('')
    const [flag,setFlag] = useState(false)
    console.log('meal:' ,meal);
    console.log('data at home:' ,data);

    const msg = () => {
        toast.error('Recipe can\'t be found')
    }

    const fetchData = () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
        .then(res => res.json())
        .then(r => {
            console.log(r.meals[0])
            const data = r.meals[0]
            setData(data)
            setId(data.idMeal)
            setFlag(true)
            setMeal('')
        })
        .catch((error) => {
            console.log('error fecthing data on home page',error);
            setFlag(false)
            msg()
        })
    }

    return(
    <div>
        <ToastContainer />
        <div className="w-screen h-5/6 max-h-fit flex flex-col  items-center">
            <div className=" w-full  bg-red-700 relative ">
                <img className=" w-full  max-[480px]:h-full" src={banner} />
                <div className="absolute top-[35%] left-[40%] m-4 mb-8  max-[768px]:left-[50%] max-[768px]:-translate-x-1/2 max-[768px]:top-[25%] max-[480px]:left-[45%] max-[480px]:top-[25%]">
                    <input 
                    className="bg-gray-200 mt-8 p-2 rounded-md max-[480px]:p-1 max-[480px]:text-sm  max-[480px]:w-1/2" 
                    placeholder="Meal" 
                    value={meal} 
                    onChange={(e)=>setMeal(e.target.value)} />
                    <button className="ml-2 bg-blue-200 py-2 px-2 rounded-sm max-[480px]:p-1  max-[480px]:text-sm" onClick={fetchData} >search</button>
                </div>
            </div>

            {flag? (
                <div className="h-fit" >
                    <Card id={id}/>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    </div>
    )
}

export default Home