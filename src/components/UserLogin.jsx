import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import '../styles/authpage.css';

function UserLogin(){

    const [usersuccess,setusersuccess]=useState("");
    const [usererror,setusererror]=useState("");
    const navigation = useNavigate();
    const [formdata, setformdata] = useState(null);

    function handleChange(e){

        setformdata({...formdata, [e.target.name]:e.target.value});

    }

    async function handleSubmit(e){

        e.preventDefault();
        setusererror("");
        setusersuccess("");

        try{

            const jsonformdata =JSON.stringify(formdata);

            const response = await axios.post('http://localhost:8086/api/login', jsonformdata, {headers:{"Content-Type":"application/json"},withCredentials:true})
            
            setusersuccess(response.data);
        
                
                if(response.data.role==="CUSTOMER"){

                    navigation("/home");
                    
                }
                
                else if(response.data.role==="ADMIN"){

                    navigation("/adminhome");

                }

                else{

                    setusererror("INVALID USER");
                }
    
        }
        catch(e){

            setusererror(e.response?.data || "Login failed");
        }

    } 

    return(
        
         <>
            <div className="auth-page">
            <div className="form-inner-div" >
            <h1 className="form-header">Sign in</h1>

                {usererror?<p style={{textAlign:"center",color:"red"}}>{usererror}</p>:
                <p style={{textAlign:"center",color:"green"}}>{usersuccess.message}</p>}

            <form onSubmit={handleSubmit} className="form-content">

            <label className="form-label" htmlFor="user_name">Username:</label><br/>
            <input className="form-text" type="text" name="username" onChange={handleChange} placeholder='Enter your username' required/><br/>
            <label className="form-label" htmlFor="password">Password:</label><br/>
            <input className="form-text" type="password" name="password" onChange={handleChange} placeholder='Enter your password' required/><br/>
            <Link to="/forget_pass" className="forget_pass">Forgot password?</Link>
            <button type="submit" className="form-text butt" name="submit">Sign in</button><br/>
            <Link to="/user_register" className="form-link" >Not a user? sign up</Link>

            </form>

            </div>
            </div >
           
        </>
    )


}

export default UserLogin;