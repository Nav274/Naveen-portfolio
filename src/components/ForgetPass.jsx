import { Link, useNavigate } from "react-router-dom";
import "../styles/authpage.css";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Footer from "./Footer";

function ForgetPass(){

    const[formvalue, setformvalue] = useState("");
    const[verifyotp, setverifyotp] = useState("");
    const[otpresponse, setotpresponse] = useState("");
    const[otperror, setotperror] = useState("");
    const[userid, setuserid] = useState();

    const navigate = useNavigate();

    useEffect(()=>{document.title="Lynxi cart"},[])

    function handleEmailChange(e){

        setotpresponse("");
        setverifyotp("");

        const inputvalue = {[e.target.name]:e.target.value};
        setformvalue(inputvalue);
        
    }

    function handleOtpChange(e){

        const inputvalue = {[e.target.name]:e.target.value,"userid":userid};
        setverifyotp(inputvalue);
    }

    async function handleemailauthsubmit(e){

        e.preventDefault();
        
        try{

    
            const response  = await axios.get(`http://localhost:8086/forgotpass/emailauth?email=${formvalue.email}`, {headers:{"Content-Type":"application/json"}, withCredentials:true});

            setotpresponse(response.data.otpresponse);
            setuserid(response.data.userid);

            document.getElementById("otpauth").style.display="block";

        }
        catch(e){

            setotperror(e.response.data);

        }
    }

    async function handleverifyotpsubmit(e){

        e.preventDefault();

        try{

           const verifyauthotp = JSON.stringify(verifyotp);

            const response  = await axios.post(`http://localhost:8086/forgotpass/verifyotp`, verifyauthotp, {headers:{"Content-Type":"application/json"}, withCredentials:true});

            setotpresponse(response.data);
            navigate("/change_pass", {state:{userid:userid}});

        }
        catch(e){

            setotperror(e.response.data);

        }

    }

    return(
         <>
            
            <div className="form-inner-div" >

            <h1 className="form-header">Forget Password</h1>
           { otperror?<p style={{color:"red"}}>{otperror}</p>:<p style={{color:"green"}}>{otpresponse}</p> }

            <form onSubmit={handleemailauthsubmit} className="form-content">
                <label className="form-label" htmlFor="">Enter your E-mail</label><br/>
                <input className="form-text" type="email" name="email" placeholder='Enter your username' onChange={handleEmailChange} required/><br/>
                <button className="form-text butt" style={{"width":"120px","height":"50px",backgroundColor:"green",display:"inline-block",marginLeft:"140px"}} type="submit">Submit</button><br/>
            </form><hr/>

            <div style={{display:"none"}} id="otpauth">
            <form onSubmit={handleverifyotpsubmit} className="form-content-verifyotp">
                <label className="form-label" style={{"width":"120px","height":"50px",display:"inline-block"}} htmlFor="otp">Verify OTP:</label>
                <input className="form-text" type="text" style={{"width":"120px","height":"50px",marginLeft:"0px",marginBottom:"30px",display:"inline-block"}} value={verifyotp.otp} name="otp" onChange={handleOtpChange} placeholder='Enter OTP' required/>
                <button type="submit" className="form-text butt" style={{"width":"120px","height":"50px",backgroundColor:"green",display:"inline-block",marginLeft:"10px"}}  name="verifyotp">Verify</button>
            </form>

            </div>

            <Link to="/user_register" className="form-link" >Not a user? sign up</Link>
            

            </div>

        <Footer/>   
           
        </>
    )


}

export default ForgetPass;