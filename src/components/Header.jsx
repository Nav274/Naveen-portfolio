import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/homepage.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Header() {

    const navigate = useNavigate();
    const[cartitemscount,setcartitemscount]=useState(0);
    const[user,setuser]=useState("Guest");
    const[logoutmessage,setLogoutmessage] = useState("");


    useEffect(()=>{

        axios.get("http://localhost:8086/user/get", {headers:{"Content-Type":"application/json"},withCredentials:true}).then(response => {setuser(response.data)}).catch((error)=>console.log(error.data))

    }, [])

    useEffect(()=>{

        axios.get('http://localhost:8086/api/cart/items/count',{headers:{"Content-Type":"application/json"},withCredentials:true})
        .then(response => {setcartitemscount(response.data.count)}).catch(error=>console.log(error.data))
                        
    }, [])

    async function handleLogout(){

        axios.delete('http://localhost:8086/user/logout',{headers:{"Content-Type":"application/json"},withCredentials:true})
        .then(response=>{setLogoutmessage(response.data)
                            navigate('/sign_in')})
        .catch(error=>setLogoutmessage(error.data))

    }

    function handleOrderClick(){
        navigate('/home/orders');
    }

    return(

        <>
        <div className="header">

            <span id="logo">{user.role==="CUSTOMER"?<Link to="/home"><img src="/logo.png" alt="Logo"/></Link> : <Link to="/adminhome"><img src="/logo.png" alt="Logo"/></Link>}</span>

            <div className="profile-image-div"><Link to="/home/profile" ><FontAwesomeIcon icon={faUser} className="profile-image"  /></Link>

                <div className="subdiv">
                <h4 className="username-display">&nbsp;{user.username}</h4>
                <Link to="/profile" state={{user:user}}><p style={{color:"green"}}>Profile</p></Link>
                <p onClick={handleOrderClick}>Orders</p>
                <button onClick={handleLogout}>Logout</button> 
                </div>

            </div>
                
                <Link to="/home/cart" state={{user:user}}><FontAwesomeIcon icon={faCartShopping} className="cart-image"/><span className="cart-badge">{cartitemscount}</span>
                </Link>
            
            
        </div>

        </>
    )
}

export default Header;