import React, { useContext } from "react";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { randomId } from "../features/categorySlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { myContext } from "../App";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

     

export const Recipes = () => {
    
    const [data,setData] = useState([])

    const cat = ["Beef","Breakfast","Chicken","Dessert","Goat","Lamb","Miscellaneous","Pasta","Pork","Seafood","Side","Starter","Vegan"]
    const user = useContext(myContext)
    const navigate = useNavigate()

   const fetchData = (val) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${val}`)
        .then( res => res.json())
        .then(r => {
            console.log('recipe fetching data',r.meals);
            const data = r.meals
            setData(data)
            //console.log('data stored in data var',data);

        })
        .catch(error => {
            console.log('error fetching data in recipe',error);
        })
   }

    console.log('user email at recipe',user?.auth?.currentUser?.email)

    useEffect(()=>{
        if(!user?.auth?.currentUser?.email){
            navigate("/signIn")
        }
    },[user])
  
  
    return(
        <div >
        <h1>Recipes by Category</h1>

        <div>
            <form>
                <label htmlFor="cat">Select Category</label>
                <select name="cat" onChange={(e)=>{fetchData(e.target.value)}} >
                    <option value="Beef">Beef</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Goat">Goat</option>
                    <option value="Lamb">Lamb</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                    <option value="Pasta">Pasta</option>
                    <option value="Pork">Pork</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Side">Side</option>
                    <option value="Starter">Starter</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Chicken">Chicken</option>
                </select>
            </form>
        </div>
        {/*doubt: this below jsx element was not re rendering when state changes unless key attribute was used, although whenever state changes element should re render automatically */}
        <div key={data} className="mb-10" >
            {data? (
                <div className="grid grid-cols-4 gap-2 bg-slate-900 " >
                    {data.map((category)=>(
                    
                        <Card  id={category.idMeal} />
                    ))}
                </div>
            ) : (
                <div></div>
            )}
        </div>
        
            
        </div>
        
    )
}






