import Header from "./Header"
import Footer from "./Footer"
import '../styles/adminhome.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faTrash, faPlus, faArrowRight, faPenToSquare, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {  useState } from "react"
import CustomModal from "./CustomModal"
import axios from 'axios'


function Adminhome(){

    const[modaltype, setModaltype] = useState("");
    const[response, setresponse] = useState("");


    function handleCardClick(modal){

        setModaltype(modal.modalType);
        
    }

    function handleadduser(data){

        axios.post('http://localhost:8086/admin/user/add',data,{headers:{"Content-Type":"application/json"}, withCredentials:true})
        .then((response)=>setresponse(response.data)).catch((error)=>setresponse(error.response.data))

    }

    function handlemodifyuser(data){

        const requestparam = data?.id;

        axios.put(`http://localhost:8086/admin/user/modify/${requestparam}`,data,{headers:{"Content-Type":"application/json"}, withCredentials:true})
        .then((response)=>setresponse(response.data)).catch((error)=>setresponse(error.response.data))

    }

    function handledeleteuser(data){

        const requestparam = data.userid;
        
        axios.delete(`http://localhost:8086/admin/user/delete/${requestparam}`,{headers:{"Content-Type":"application/json"}, withCredentials:true})
        .then((response)=>setresponse(response.data)).catch((error)=>setresponse(error.response.data))

    }

    function handlegetuser(data){

        const requestparam = data.email;

        axios.get(`http://localhost:8086/admin/user/get?emailid=${requestparam}`,{headers:{"Content-Type":"application/json"}, withCredentials:true})
        .then((response)=>setresponse(response.data)).catch((error)=>setresponse(error.response.data))

    }

    function handleaddproduct(data){

        axios.post('http://localhost:8086/admin/product/add',data,{headers:{"Content-Type":"application/json"}, withCredentials:true})
        .then((response)=>setresponse(response.data)).catch((error)=>setresponse(error.response.data))

    }

    function handlemodifyproduct(data){

        const requestparam = data?.id;

        axios.put(`http://localhost:8086/admin/product/modify/${requestparam}`,data,{headers:{"Content-Type":"application/json"}, withCredentials:true})
        .then((response)=>setresponse(response.data)).catch((error)=>setresponse(error.response.data))

    }

    function handledeleteproduct(data){

        const requestparam = data?.id;

        axios.delete(`http://localhost:8086/admin/product/delete/${requestparam}`,{headers:{"Content-Type":"application/json"}, withCredentials:true})
        .then((response)=>setresponse(response.data)).catch((error)=>setresponse(error.response.data))

    }

    function handlegetproduct(data){

        const requestparam = data?.id;

        axios.get(`http://localhost:8086/admin/product/view/${requestparam}`,{headers:{"Content-Type":"application/json"}, withCredentials:true})
        .then((response)=>setresponse(response.data)).catch((error)=>setresponse(error.response.data))

    }

return(

    <>

        <Header/>

            <div  className="admin-grid-container">
        
                <div key="1" style={{textAlign:'center'}} onClick={()=>handleCardClick({modalType:"adduser"})}>

                    <FontAwesomeIcon icon={faPlus} id="symbol"/>
                    <h2>Add new User</h2>                    
                    <p>Create a new user account</p><br/>
                    <span >Team: User Management</span>
                    <FontAwesomeIcon icon={faArrowRight} id="arrow"/>
                    
                </div>

                <div key="2" style={{textAlign:'center'}} onClick={()=>handleCardClick({modalType:"deleteuser",})}>

                    <FontAwesomeIcon icon={faTrash} id="symbol"/>
                    <h2>Delete User</h2>                    
                    <p>Delete a user account</p><br/>
                    <span >Team: User Management</span>                   
                    <FontAwesomeIcon icon={faArrowRight} id="arrow"/>

                </div>

                <div key="3" style={{textAlign:'center'}} onClick={()=>handleCardClick({modalType:"modifyuser",})}>

                    <FontAwesomeIcon icon={faPenToSquare} id="symbol"/>
                    <h2>Modify User Details</h2>
                    <p>Modify a user account</p><br/>
                    <span >Team: User Management</span>                    
                    <FontAwesomeIcon icon={faArrowRight} id="arrow"/>
                    
                </div>

                <div key="4" style={{textAlign:'center'}} onClick={()=>handleCardClick({modalType:"viewuser",})}>

                    <FontAwesomeIcon icon={faMagnifyingGlass} id="symbol"/>
                    <h2>View User Details</h2>
                    <p>Modify a user account</p><br/>
                    <span >Team: User Management</span>                                       
                    <FontAwesomeIcon icon={faArrowRight} id="arrow"/>
                    
                </div>

                <div key="5" style={{textAlign:'center'}} onClick={()=>handleCardClick({modalType:"addproduct",})}>

                    <FontAwesomeIcon icon={faPlus} id="symbol"/>
                    <h2>Add new Product</h2>
                    <p>Add a new Product</p><br/>
                    <span >Team: Product Management</span>                    
                    <FontAwesomeIcon icon={faArrowRight} id="arrow"/>
                    
                </div>

                <div key="6" style={{textAlign:'center'}} onClick={()=>handleCardClick({modalType:"modifyproduct",})}>

                    <FontAwesomeIcon icon={faPenToSquare} id="symbol" />
                    <h2>Modify Product Details</h2>
                    <p>Modify and manage a product</p><br/>
                    <span >Team: Product Management</span>     
                    <FontAwesomeIcon icon={faArrowRight} id="arrow"/>
                   
                </div>

                <div key="7" style={{textAlign:'center'}} onClick={()=>handleCardClick({modalType:"deleteproduct",})}>

                    <FontAwesomeIcon icon={faTrash} id="symbol"/>
                    <h2>Delete Product</h2>
                    <p>Delete a product</p><br/>
                    <span>Team: Product Management</span>
                    <FontAwesomeIcon icon={faArrowRight} id="arrow"/>
                   
                </div>

                <div key="8" style={{textAlign:'center'}} onClick={()=>handleCardClick({modalType:"viewproduct",})}>

                    <FontAwesomeIcon icon={faMagnifyingGlass} id="symbol"/>
                    <h2>View Product</h2>
                    <p>View a product</p><br/>
                    <span>Team: Product Management</span>
                    <FontAwesomeIcon icon={faArrowRight} id="arrow"/>
                   
                </div>

                {/* <div key="8" style={{textAlign:'center'}} onClick={()=>handleCardClick({modalType:"monthlybussiness",})}>

                    <h2>View Monthly Bussiness</h2>
                    <span >Team: Bussiness Management</span>
                    <p>Get your Monthly Bussiness records</p>
                    <FontAwesomeIcon icon={faCalculator} id="symbol"/>
                    <FontAwesomeIcon icon={faArrowRight} id="arrow"/>
                
                </div>

                <div key="9" style={{textAlign:'center'}} onClick={()=>handleCardClick({modalType:"yearlybussiness",})}>

                    <h2>View Yearly Bussiness</h2>
                    <span >Team: Bussiness Management</span>
                    <p>Get your Yearly Bussiness records</p>
                    <FontAwesomeIcon icon={faCalculator} id="symbol"/>
                    <FontAwesomeIcon icon={faArrowRight} id="arrow"/>
                    
                </div>

                <div key="10" style={{textAlign:'center'}} onClick={()=>handleCardClick({modalType:"dailybussiness",})}>

                    <h2>View Daily Bussiness</h2>
                    <span >Team: Bussiness Management</span>
                    <p>Get your Daily Bussiness records</p>
                    <FontAwesomeIcon icon={faCalculator} id="symbol"/>
                    <FontAwesomeIcon icon={faArrowRight} id="arrow"/>
                    
                </div>
                 */}

            </div>

            {modaltype && (<CustomModal modaltype={modaltype} response={response} onClear={()=>{setModaltype(""); setresponse("");}} onSubmit={(data)=>{

            switch(modaltype){

                case 'adduser': handleadduser(data);                  
                break;
                case 'modifyuser': handlemodifyuser(data);
                break;
                case 'viewuser': handlegetuser(data);
                break;
                case 'deleteuser': handledeleteuser(data);
                break;
                case 'addproduct': handleaddproduct(data);
                break;
                case 'modifyproduct': handlemodifyproduct(data);
                break;
                case 'deleteproduct': handledeleteproduct(data);
                break;
                case 'viewproduct': handlegetproduct(data);
                break;
                default: console.log("Invalid modal type");
                break;

                }
            }
            }/>)}


        <Footer/>

       
    </>

)
}

export default Adminhome;