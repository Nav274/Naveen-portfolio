import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/authpage.css"
import Footer from "./Footer";
import "../styles/authpage.css";

function Changepass(){

    const locator = useLocation();
    const {userid} = locator.state || {};
    
    const navigate = useNavigate();

    useEffect(() => {
        
        document.title="Lynxi cart"

        if (!userid) {

          alert("Unauthorized access. Redirecting to login.");
          navigate("/sign_in");
        }
      }, [userid, navigate]);

    function handleChangePassSubmit(e){

        e.preventDefault();
         
        if (e.target.newpassword.value === e.target.confpassword.value) {

            fetch("http://localhost:8086/forgotpass/changepass", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
            credentials:"include",
            body: JSON.stringify({ userid: userid, newpassword: e.target.newpassword.value }),
            })
            .then(response => { if(!response.ok){

                    throw new Error("password change failed")
            }
            return response.text();})
            .then(() => {
                alert("Password successfully updated!");
                navigate("/sign_in");
              })
            .catch(error => console.error('Error:', error));   

        } 
        else {

            alert('Passwords do not match. Please try again.');
                    
            }
    }
    
    return(

        <>

            <h2>Change password</h2>

            <form onSubmit={handleChangePassSubmit} style={{width:"50%", margin: "0 auto", boxShadow:"0.2px 1px 2px grey"}}>

                <label className="form-label" htmlFor="password">Enter New Password:</label><br/>
                <input className="form-text" type="password" name="newpassword" placeholder='Enter your password' required/><br/>
                <label className="form-label" htmlFor="confpassword">Confirm Password:</label><br/>
                <input className="form-text" type="password" name="confpassword" placeholder='Confirm password' required/><br/>
                <button type="submit" className="form-text butt" name="submit">Confirm</button><br/>

            </form>

            <Footer/>
        </>
    )
}

export default Changepass;