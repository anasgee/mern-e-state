import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import ProtectedRoute from './pages/ProtectedRoute';
import CreateListing from "./pages/CreateListing";
import UpdateListing from './pages/UpdateListing';


const App = () => {
  return  <>
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route element={<ProtectedRoute/>}>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/createListing' element={<CreateListing/>}/>
    <Route path='/updateListing/:id' element={<UpdateListing/>}/>
    </Route>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/signup' element={<SignUp/>}/>
  </Routes>
  </BrowserRouter>
  </>
  
}

export default App;