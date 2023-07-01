import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import {Recipes ,loader} from './components/Recipes';
import RecipeDetail from './components/RecipeDetail';
import { store } from './store/store'
import { Provider } from 'react-redux'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/about',
        element:<About/>
      },
      {
        path:'/contact',
        element:<Contact/>
      },
      {
        path:'/recipes',
        element:<Recipes/>,
        // loader:loader,
      },
      {
        path:'/recipeDetail',
        element:<RecipeDetail/>
      },
      {
        path:'/signUp',
        element:<SignUp/>
      },
      {
        path:'/signIn',
        element:<SignIn/>
      },
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
