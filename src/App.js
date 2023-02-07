import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Main from './layout/Main';
import ErrorPage from './components/ErrorPage';
import { router } from './routes/routes';

function App() {
 
  return (
    <RouterProvider router={router}></RouterProvider>
    // <div className='flex justify-center items-center min-h-screen'>
    //   <h1 className='text-3xl'>Welcome to Authentech</h1>
    // </div>
  )
}

export default App
