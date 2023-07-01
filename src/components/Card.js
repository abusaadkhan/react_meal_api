import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createContext } from "react";




// const Card = () => {
//     const [data,setData] = useState({})
//     const randomMealId = useSelector((state)=>state.meal.value)
//     const fetchData = () => {
//         console.log('randomId fetched from store:',randomMealId)

//         fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMealId}`)
//         .then(response => response.json())
//         .then(res => {
//          const data = res.meals[0]
         
 
//          setData(data)
//          console.log("card data : ",data )
   
//         })
//         .catch(error => {
//          console.log('error fetching data by using meal id  : ',error)
//         })
       
//      }
//     useEffect(()=>{
//         setTimeout(()=>{
//             fetchData()
//         },3000)
//     },[])
//     //console.log("card getting data:",data)

//     return(
//         <>
//         <div className="flex flex-col  items-start w-64 rounded-sm p-2 bg-[#f0f9f9]" >
//         <img src={data.strMealThumb} width={"40px"} className='w-60 h-52 rounded-sm'/>
//         <h4 className="text-red-600 font-medium text-sm my-2" >{data.strCategory}</h4>
//         <h1 className="font-semibold text-xl text-left " >{data.strMeal}</h1>
//         <h4 className="text-[#6679ab] font-medium text-sm mt-4" >{data.strTags}</h4>

//        </div>
//         </>
//     )
// }
const Card = ({id}) => {
    console.log('card getting id',id);
    // console.log('card getting data',data);
    const [data,setData] = useState({})

    const fetchData = () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(res => res.json())
            .then(r => {
                const data = r.meals[0]
                setData(data)
                console.log('data fetched in card',r.meals[0])
                localStorage.setItem('data',JSON.stringify(data))
            })
            .catch(error => {
                console.log('error fetching data at card',error)
            })
    }
    useEffect(()=>{
        fetchData()
    },[])
    return(
        

                
               <Link to='/recipeDetail' state={data}>
                    <div className="flex flex-col  items-start w-64 rounded-sm p-2 bg-[#f0f9f9]" >
                        <img src={data.strMealThumb} width={"40px"} className='w-60 h-52 rounded-sm'/>
                        <h4 className="text-red-600 font-medium text-sm my-2" >{data.strCategory}</h4>
                        <h1 className="font-semibold text-xl text-left " >{data.strMeal}</h1>
                        {/* creating responsive problem deal with it
                            <p className="text-[#6679ab] font-medium text-sm mt-4" >{data.strTags}</p>
                        */}
                
                    </div>
               </Link>
               
    )
}

export default Card