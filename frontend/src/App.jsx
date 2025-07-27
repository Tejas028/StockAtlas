import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Login from './Pages/Login'
import About from './Pages/About'
import {Toaster} from 'react-hot-toast'
import PoliciesAndSecurity from './Pages/PoliciesAndSecurity'
import MeetTheDevelopers from './Pages/MeetTheDevelopers'
import Stock from './Pages/Stock'
import CompanyProfile from './Components/CompanyProfile'

const App = () => {
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/policies' element={<PoliciesAndSecurity/>}></Route>
        <Route path='/meet-the-developers' element={<MeetTheDevelopers/>}></Route>
        <Route path='/stock/:symbol' element={<Stock/>}></Route>
        <Route path='/company/:symbol' element={<CompanyProfile/>}></Route>
      </Routes>
    </div>
  )
}

export default App