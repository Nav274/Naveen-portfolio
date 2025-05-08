import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import '../styles/profilepage.css'

const Userprofile = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [isReadonly, setisReadOnly] = useState(true);
    const[apiresponse, setapiresponse] = useState("");
    const { userid, username, emailid, contactno, role, address, age } = location.state?.user || {};

    const[formdata, setformdata] = useState({ name:"", email:"", phone:"", address:"", age:"" })

    function handleinputchange(e){

      setformdata({...formdata, [e.target.name]:e.target.value})

    }

      async function handleprofilesubmit(e){

        e.preventDefault();

        if(role==="ADMIN"){

        try{

          const response = await fetch(`http://localhost:8086/admin/user/modify/${userid}`,{ 

              method:"PUT", 
              headers:{"Content-Type":"application/json"}, 
              credentials:"include", 
              body:JSON.stringify(formdata)
            })
   
            const text = await response.text();
            setapiresponse(text);

            if(response.ok){

              navigate("/sign_in", { replace: true });
            }

        }
        catch(e){

          console.log(e);

        }

      }

        else if(role==="CUSTOMER"){

          try{

            const response = await fetch(`http://localhost:8086/api/usermodify/${userid}`,{ 
  
                method:"PUT", 
                headers:{"Content-Type":"application/json"}, 
                credentials:"include", 
                body:JSON.stringify(formdata)
              })
              
              const text = await response.text();
              setapiresponse(text);

              if(response.ok){

                navigate("/sign_in", { replace: true });
              }
  
          }
          catch(e){
  
            console.log(e);
  
          }

        }

      }
    
    function handleEditClick(){

      document.getElementById("savebtn").disabled=false;
      document.getElementById("savebtn").style.backgroundColor="green";
      setisReadOnly(false);

    }

    function handleCancelClick(){

      document.getElementById("savebtn").disabled=true;
      document.getElementById("savebtn").style.backgroundColor="lightgreen";
      setisReadOnly(true);
      navigate("/profile");
        
    }

   
  return (
    
    <>
    <Header />

          <div>

                <div id="editcontroller">
                  <button className='editbutt' onClick={handleEditClick}> <FontAwesomeIcon icon={faPenToSquare} /></button>
                  <div className='hoveredit'>Edit</div>
                </div> 

                <form className='profile-form' name="profileform" onSubmit={handleprofilesubmit}>

                  <h1 className="profile-heading">Profile</h1>
                  <p>{apiresponse}</p><br/>

                  <label className="profile-label" htmlFor='username'>Username:</label>
                  <input className="profile-input" name="name" type="text" defaultValue={username} onChange={handleinputchange} readOnly={isReadonly}></input><br/>

                  <label className="profile-label" htmlFor='email'>E-mail:</label>
                  <input name="email" className="profile-input" type="email" defaultValue={emailid} onChange={handleinputchange} readOnly={isReadonly}></input><br/>

                  <label className="profile-label" htmlFor='phone'>Contact no:</label>
                  <input name="phone" className="profile-input" type="tel" defaultValue={contactno} onChange={handleinputchange} readOnly={isReadonly}></input><br/>

                  <label className="profile-label" htmlFor='address'>Address:</label>
                  <input name="address" className="profile-input" type="text" defaultValue={address} onChange={handleinputchange} readOnly={isReadonly}></input><br/>

                  <label className="profile-label" htmlFor='age'>Age:</label>
                  <input name="age" className="profile-input" type="number" defaultValue={age} onChange={handleinputchange} readOnly={isReadonly}></input><br/>

                  <button className="profile-butt" id="savebtn" type="submit" disabled>Save</button>
                  <button className="profile-butt cancelbutt" id="cancelbtn" onClick={handleCancelClick} >Cancel</button>
        
                </form>
      
          </div>

        <Footer />

    </>
  )
}

export default Userprofile
