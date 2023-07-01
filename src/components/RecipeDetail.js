import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import YoutubeEmbed from "../utils/youtubeEmbed";
import Comment from './Comment' 
import { useContext } from "react";
import { myRecipeContext } from "./Card";
import { myContext } from "../App";


const RecipeDetail = () => {
  //const location = useLocation()
   //const data = location.state
   const [Ingredients,setIngredients] = useState([])
   const [measures,setMeasures] = useState([])
   //const data = useContext(myRecipeContext)
   const data = JSON.parse(localStorage.getItem('data'))
   const user = useContext(myContext)
   const navigate = useNavigate()

   const fetchIngredients = () => {
    //console.log('ingridents before:',Ingredients)
    
    for(let i=0; i<20; i++){
        const ingridient = `strIngredient${i+1}`
        const measure = `strMeasure${i+1}`
        if(data[ingridient]){
            //console.log('ingridient and measure:',data[ingridient], data[measure])
            
            setIngredients(prevState => [...prevState,data[ingridient]])
            setMeasures(prevState => [...prevState,data[measure]])
        }

    }

   }

   useEffect(()=>{
    fetchIngredients()
   },[])

//    useEffect(()=>{
//     if(!user?.auth?.currentUser?.email){
//         navigate("/signIn")
//     }
//     },[user])

   const embedId = data?.strYoutube?.split("=").pop()
   //console.log('embeded id:',embedId)
  console.log('recipe detail:',data)
   //console.log('recipe detail:',data.strIngredient1)
  // console.log('ingridents and measure after:',Ingredients,measures)
   const len = 0
    return(
        <>
        <div className=" mt-8 mx-auto w-2/3  flex flex-col items-start box-border ">
            <h1 className="font-semibold text-6xl my-5 max-[600px]:text-3xl " >{data?.strMeal}</h1>
            <hr className="w-full mb-5" />

            <div className="w-full  flex justify-between max-[480px]:flex-col " >
                <div className="w-2/5 text-left  max-[600px]:w-full" >
                    <h2 className="text-3xl mb-5 max-[600px]:text-2xl" >Ingredients :</h2>
                    <ul>
                        {   
                            Ingredients.map((ingri,i)=>(
                                
                                <li key={ingri} >
                                    {ingri} : {measures[i]} 
                                </li>
                                
                            ))
                        }
                    </ul>
                </div>
                <div className="w-3/5 max-[600px]:w-full " > <img className="h-full"  src={data?.strMealThumb} alt="" /> </div>

            </div>

            <div className="w-full my-10 text-left " >
                    <h1 className="text-4xl font-medium my-3 max-[600px]:text-2xl " >Method</h1>
                    <hr />
                    <p className="mt-5 leading-loose " >{data?.strInstructions}</p>

            </div>

            <div className=" w-full mb-8 " ><YoutubeEmbed  embedId={embedId} /></div>
        </div>
        <Comment idMeal={data?.idMeal} />
        </>
    )
}
export default RecipeDetail