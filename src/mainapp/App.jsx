import React from 'react'
import Register from '../components/Register'
import {  Route,Routes} from 'react-router-dom'
import UserLogin from '../components/UserLogin'
import ForgetPass from '../components/ForgetPass'
import  Home  from '../components/Home'
import Cart from '../components/Cart'
import { Navigate } from 'react-router-dom'
import Order from '../components/Order'
import Adminhome from '../components/Adminhome'
import Productspecific from '../components/Productspecific'
import Userprofile from '../components/Userprofile'
import Changepass from '../components/Changepass'


const App = () => {

  return (
    <>
    
    
        <Routes>
          
          <Route path="/user_register" element={<Register />} />
          <Route path="/sign_in" element={<UserLogin />} />
          <Route path="/forget_pass" element={<ForgetPass />} />
          <Route path="/home" element={< Home />} />
          <Route path="/home/cart" element={<Cart />} />
          <Route path="/" element={<Navigate to="/sign_in" />} />
          <Route path="/home/orders" element={<Order />} />
          <Route path="/adminhome" element={<Adminhome />} />
          <Route path="/our-products/:product" element={<Productspecific />} />
          <Route path="/profile" element={<Userprofile />} />
          <Route path="/change_pass" element={<Changepass />} />

        </Routes> 
   

    </>
  )
}

export default App

