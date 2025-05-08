import { useState } from "react";
import "../styles/custommodal.css"
import axios from 'axios';


function CustomModal({modaltype, response, onSubmit, onClear}){

    const[formdata, setformdata]=useState(null);
    const[userresponse, setuserresponse ] = useState("");
    const[productresponse, setproductresponse] = useState(null);


    function handleInputChange(e){

        setformdata({...formdata, [e.target.name]:e.target.value});
        
    }

    function handleModifyUserChange(e){

        setformdata({...formdata, [e.target.name]:e.target.value, "id":userresponse.userid});
        
    }

    function handleModifyProductChange(e){

        setformdata({...formdata, [e.target.name]:e.target.value, "id":productresponse.productid});
        
    }

    function handleSearchUserSubmit(e){

       e.preventDefault();
       const useremail = e.target.email.value;

       axios.get(`http://localhost:8086/admin/user/get?emailid=${useremail}`,{headers:{"Content-Type":"application/json"}, withCredentials:true})
        .then((response)=>setuserresponse(response.data)).catch((error)=>setuserresponse(error))

    }

    function handleSearchProductSubmit(e){

        e.preventDefault();
        const productid = e.target.id.value;
 
        axios.get(`http://localhost:8086/admin/product/view/${productid}`,{headers:{"Content-Type":"application/json"}, withCredentials:true})
         .then((response)=>setproductresponse(response.data)).catch((error)=>setproductresponse(error))
 
    }

    function handleSubmit(e){

        e.preventDefault();
        onSubmit(formdata);

    }

    return (

        <div className="modal" >
                { modaltype === "adduser" && ( !response ? (
            <>
                <div className="modaldiv">

                    <h2 className="modalheading">Add new User</h2>

                    <form className="modal-form" onSubmit={handleSubmit}>
                        <label className="modal-form-label">Name:</label>
                        <input type="text" name="name" id="name" onChange={handleInputChange} className="modal-form-input" required/>
                        <br/>
                        <label className="modal-form-label">E-mail:</label>
                        <input type="email" name="email" id="email" onChange={handleInputChange} className="modal-form-input" required/>
                        <br/>
                        <label className="modal-form-label">Role:</label>
                        <select name="role" id="role" onChange={handleInputChange} className="modal-form-label" required>
                            <option value="">Choose role</option>
                            <option value="ADMIN" >Admin</option>
                            <option value="CUSTOMER" >Customer</option>  
                        </select>
                        <br/>
                        <label className="modal-form-label">Age:</label>
                        <input type="number" name="age" id="age" onChange={handleInputChange} max="100" min="18" className="modal-form-input" required/>
                        <br/>
                        <label className="modal-form-label">Address:</label>
                        <input type="text" name="address" id="address" onChange={handleInputChange} className="modal-form-input" required/>
                        <br/>
                        <label className="modal-form-label">Phone number:</label>
                        <input type="tel" name="contactno" id="phone" onChange={handleInputChange} minlength="10" maxlength="10" className="modal-form-input" required/>
                        <br/>

                        <button type="submit" className="modal-form-butt">Add</button>
                        <button className="modal-form-butt cancelbutt" onClick={onClear}>Cancel</button>
                    </form>

                </div>

            </> ) :(
             
            <>

                <h2 className="modalheading">Added User</h2>
            
                {response?.userid?.user_id ? (

                <>
                    <p style={{color:"green"}}>user added successfully!</p><br/>
                    
                    <p>Id: <strong>{response.userid?.user_id}</strong></p><br/>
                    <p>Username: <strong>{response.userid?.username}</strong></p><br/>
                    <p>Email: <strong>{response.userid?.email}</strong></p><br/>
                    <p>Role: <strong>{response.userid?.role}</strong></p><br/>
                    <p>Age: <strong>{response.age}</strong></p><br/>
                    <p>Address: <strong>{response.address}</strong></p><br/>
                    <p>Phone number: <strong>{response.contactno}</strong></p><br/>
                    <p>Created at : <strong>{response.userid?.created_at}</strong></p><br/>
                    <p>Last Updated at : <strong>{response.userid?.updated_at}</strong></p><br/>
                </>

                ):(<p style={{color:"red"}}>{response}</p>)}<br/>

                <button className="modal-form-butt cancelbutt" onClick={onClear}>Close</button>
                
            </>))}
     
                {modaltype === "deleteuser" && ( !response ? (

                <>
                    <div className="modaldiv">

                        <h2 className="modalheading">Delete User</h2>

                        <form className="modal-form" onSubmit={handleSubmit}>
                            <label  className="modal-form-label" >User id:</label>
                            <input className="modal-form-input" type="number" name="userid" id="userid" onChange={handleInputChange} required/>
                            <br/>
                            <button type="submit" className="modal-form-butt">Submit</button>
                            <button className="modal-form-butt cancelbutt" onClick={onClear}>Cancel</button>
                        </form>

                    </div>
            
                </>) : (
                
            <>
        
                <p style={{color:"green"}}>{response}</p><br/> 
                
                <button className="modal-form-butt cancelbutt" onClick={onClear} >Close</button>  
            
            </>))}

            { modaltype === "modifyuser" && ( !userresponse ? (

            <>
                <div className="modaldiv">

                    <h2 className="modalheading">Modify User</h2>

                    <form className="modal-form" onSubmit={handleSearchUserSubmit}>
                        <label  className="modal-form-label">E-mail:</label>
                        <input type="email" name="email" id="email"  className="modal-form-input"/>
                        <br/>
                        <button type="submit" className="modal-form-butt" >Search</button>
                        <button className="modal-form-butt cancelbutt" onClick={onClear}>Cancel</button>
                    </form>

                </div>

            </>) : (
                    
            <>

                <form className="modal-form" onSubmit={handleSubmit}>

                <h2 className="modalheading">Modify User</h2>

                <p style={{color:"green"}}>{response}</p><br/>

                <label  className="modal-form-label">Id:</label>
                <input type="number" name="id" id="id" defaultValue={userresponse.userid || "N/A"}  className="modal-form-input" disabled/>
                <br/>
                <label  className="modal-form-label">Username:</label>
                <input type="text" name="name" id="name" defaultValue={userresponse.username || "N/A"}  onChange={handleModifyUserChange} className="modal-form-input"/>
                <br/>
                <label  className="modal-form-label">Email:</label>
                <input type="email" name="email" id="email" defaultValue={userresponse.emailid || "N/A"} onChange={handleModifyUserChange} className="modal-form-input"/>
                <br/>
                <label  className="modal-form-label">Role:</label>
                <select name="role" id="role" onChange={handleModifyUserChange} defaultValue={userresponse.role || "N/A"} className="modal-form-input">
                    <option value="ADMIN">Admin</option>
                    <option value="CUSTOMER">Customer</option>
                </select>
                <br/>
                <label  className="modal-form-label">Age:</label>
                <input type="number" name="age" id="age" defaultValue={userresponse.age || 0} onChange={handleModifyUserChange} className="modal-form-input"/>
                <br/>
                <label  className="modal-form-label">Address:</label>
                <input type="text" name="address" id="address" defaultValue={userresponse.address || "N/A"} onChange={handleModifyUserChange} className="modal-form-input"/>
                <br/>
                <label  className="modal-form-label">Phone number:</label>
                <input type="tel" name="phone" id="phone" defaultValue={userresponse.contactno || 0} onChange={handleModifyUserChange} className="modal-form-input"/>
                <br/>
                <button type="submit" className="modal-form-butt">Submit</button>
                <button className="modal-form-butt cancelbutt" onClick={onClear}>Cancel</button>

                </form>

            </>))}

        { modaltype === "viewuser" && ( !response ? (

            <>
                <div className="modaldiv">

                    <h2 className="modalheading">View User</h2>

                    <form className="modal-form" onSubmit={handleSubmit}>
                        <label  className="modal-form-label">E-mail:</label>
                        <input type="email" name="email" id="email" onChange={handleInputChange} className="modal-form-input" required/>
                        <br/>
                        <button type="submit" className="modal-form-butt">Submit</button>
                        <button className="modal-form-butt cancelbutt" onClick={onClear}>Cancel</button>
                    </form>

                </div>

            </>) : (
                
            <>

                <h2>User details</h2>

                <p>Id: <strong>{response.userid || "N/A"}</strong></p><br/>
                <p>Username: <strong>{response.username || "N/A"}</strong></p><br/>
                <p>Email: <strong>{response.emailid || "N/A"}</strong></p><br/>
                <p>Role: <strong>{response.role || "N/A"}</strong> </p><br/>
                <p>Age: <strong>{response.age || "N/A"}</strong></p><br/>
                <p>Address: <strong>{response.address|| "N/A"}</strong></p><br/>
                <p>Phone number: <strong>{response.contactno || "N/A"}</strong></p><br/>
                <p>Created at: <strong>{response.created_at || "N/A"}</strong></p><br/>
                <p>Updated at: <strong>{response.updated_at || "N/A"}</strong></p><br/>
                <br/>

                <button className="modal-form-butt cancelbutt" onClick={onClear}>Close</button>

            </>))}

    

        { modaltype === "addproduct" && ( !response ? (
            <>
                <div className="modaldiv">

                    <h2 className="modalheading">Add new Product</h2>

                    <form className="modal-form" onSubmit={handleSubmit}>
                        <label  className="modal-form-label">Name:</label>
                        <input type="text" name="name" id="name" onChange={handleInputChange} className="modal-form-input" required/>
                        <br/>
                        <label  htmlFor="description" className="modal-form-label">Description:</label>
                        <textarea onChange={handleInputChange} rows={50} cols={50} name="description" className="modal-form-input" required></textarea>
                        <br/>
                        <label  className="modal-form-label">Price:</label>
                        <input type="number" name="price" id="price" onChange={handleInputChange} className="modal-form-input" required/>
                        <br/>
                        <label  className="modal-form-label">Stock:</label>
                        <input type="number" name="stock" id="stock" onChange={handleInputChange} className="modal-form-input" required/>
                        <br/>
                        <label  className="modal-form-label">Category:</label>
                        <select onChange={handleInputChange} className="modal-form-input" name="category" required>
                            <option defaultValue>select category</option>
                            <option value="Shirts">Shirts</option>
                            <option value="Television">Television</option>
                            <option value="Pants">Pants</option>
                            <option value="Mobile Accessories">Mobile Accessories</option>
                            <option value="Mobiles">Mobiles</option>
                        </select>
                        <br/>
                        <label  className="modal-form-label">Image url:</label>
                        <input type="text" name="imageurl" id="imageurl" onChange={handleInputChange} className="modal-form-input" required/>
                        <br/>

                        <button type="submit" className="modal-form-butt">Submit</button>
                        <button className="modal-form-butt cancelbutt" onClick={onClear}>Cancel</button>
                    </form>

                </div>

            </> ) :(
                
            <>

                <h2 className="modalheading">Added Product</h2>

                <img src={response.imageurl} alt={response.name} className="addedproductimage"/>

                <p>Id: <strong>{response.product.productid}</strong></p><br/>
                <p>Name: <strong>{response.product.name}</strong></p><br/>
                <p>Description: <strong>{response.product.description}</strong></p><br/>
                <p>Price: <strong>{response.product.price}</strong></p><br/>
                <p>Stock: <strong>{response.product.stock}</strong></p><br/>
                <p>Category: <strong>{response.product.category.name}</strong></p><br/>
                <p>Created at: <strong>{response.product.createdat}</strong></p><br/>
                <p>Updated at: <strong>{response.product.updatedat}</strong></p><br/>

                <button className="modal-form-butt cancelbutt" onClick={onClear}>Close</button>
                
                
            </>))}

        { modaltype=== "modifyproduct"  && (!productresponse ?(

            <>

                <form className="modal-form" onSubmit={handleSearchProductSubmit}>
                <h2 className="modalheading">Modify Product</h2>
                <label  className="modal-form-label">Product Id:</label>
                <input type="number" name="id" id="id"  className="modal-form-input"/>
                <br/>

                <button type="submit" className="modal-form-butt">Search</button>
                <button onClick={onClear} className="modal-form-butt cancelbutt">Cancel</button>
                </form>
            
            </>

        ):(
            <>

                <form className="modal-form" onSubmit={handleSubmit}>

                    <img className="addedproductimage" src={productresponse.productimage} alt={productresponse.productname}></img><br/>

                    <h2 className="modalheading">Modify product</h2>

                    <p style={{color:"green"}}>{response}</p><br/>
                    
                    <label  className="modal-form-label">Id:</label>
                    <input type="number" name="id" id="id" value={productresponse.productid} className="modal-form-input" disabled/>
                    <br/>
                    <label  className="modal-form-label">Change image:</label>
                    <input type="text" name="imageurl" id="imageurl" defaultValue={productresponse.productimage} placeholder="Enter image url" onChange={handleModifyProductChange} className="modal-form-input" required/>
                    <br/>
                    <label  className="modal-form-label">Name:</label>
                    <input type="text" name="name" id="name" defaultValue={productresponse.productname} onChange={handleModifyProductChange} className="modal-form-input" required/>
                    <br/>
                    <label  className="modal-form-label">Description:</label>
                    <textarea type="text" name="description" id="description" defaultValue={productresponse.productdesc} onChange={handleModifyProductChange} className="modal-form-input" required/>
                    <br/>
                    <label  className="modal-form-label">Price:</label>
                    <input type="number" name="price" id="price" defaultValue={productresponse.productprice} onChange={handleModifyProductChange} className="modal-form-input" required/>
                    <br/>
                    <label  className="modal-form-label">Stock:</label>
                    <input type="number" name="stock" id="stock" defaultValue={productresponse.productstock} onChange={handleModifyProductChange} className="modal-form-input" required/>
                    <br/>
                    <label  className="modal-form-label">Category:</label>
                    <select name="category" id="category" defaultValue={productresponse.productcategory} onChange={handleModifyProductChange} className="modal-form-input" required>
                        <option value="">Select category</option>
                        <option value="Shirts">Shirts</option>
                        <option value="Televisions">Televisions</option>
                        <option value="Pants">Pants</option>
                        <option value="Mobile Accessories">Mobile Accessories</option>
                        <option value="Mobiles">Mobiles</option>
                    </select>
                    <br/>

                    <button type="submit" className="modal-form-butt">Submit</button>
                    <button onClick={onClear} className="modal-form-butt cancelbutt">Cancel</button>
                </form>

    
            </>))}

        {modaltype==="deleteproduct" && (!response ?(

            <>
                <form className="modal-form" onSubmit={handleSubmit}>

                    <h2>Delete product</h2>

                    <label  className="modal-form-label">Enter id:</label>
                    <input type="number" name="id" id="id" onChange={handleInputChange} className="modal-form-input"/>
                    <br/>
                    <button type="submit" className="modal-form-butt">Submit</button>
                    <button onClick={onClear} className="modal-form-butt cancelbutt">Cancel</button>

                </form>

            </>
        ):(
            <>
                <h2 className="modalheading">Deleted product</h2>

                <p style={{color:"green"}}>{response}</p><br/>
                {/* <p>Name: {response.name}</p><br/>
                <p>Description: {response.description}</p><br/>
                <p>Price: {response.price}</p><br/>
                <p>Stock: {response.stock}</p><br/>
                <p>Category: {response.category}</p><br/>
                
                <p>Are you sure you want to delete this product?</p><br/>

                <button className="modal-form-butt" type="submit">Yes</button> */}
                <button onClick={onClear} className="modal-form-butt cancelbutt">Cancel</button>
             
            </>
        ))}

        {modaltype==="viewproduct" && (!response ?(

            <>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <h2 className="modalheading">View product</h2>
                    <label  className="modal-form-label">Enter id:</label>
                    <input type="number" name="id" id="id" onChange={handleInputChange} className="modal-form-input"/>
                    <br/>
                    <button  type="submit" className="modal-form-butt">Submit</button>
                    <button onClick={onClear} className="modal-form-butt cancelbutt">Cancel</button>
                </form>
            
            </>

        ):(

            <>
                <h2 className="modalheading">Product details</h2>

                {response.productid ? (
                <>
                    <img src={response.productimage} alt={response.name} className="addedproductimage"/>

                    <p>Id: <strong>{response.productid}</strong></p><br/>
                    <p>Name:<strong>{response.productname}</strong></p><br/>
                    <p>Description: <strong>{response.productdesc}</strong></p><br/>
                    <p>Price: <strong>{response.productprice}</strong></p><br/>
                    <p>Stock: <strong>{response.productstock}</strong></p><br/>
                    <p>Category: <strong>{response.productcategory}</strong></p><br/>
                    <p>Created at: <strong>{response.created_at}</strong></p><br/>
                    <p>Updated at: <strong>{response.updated_at}</strong></p><br/>

                </>) :

                    (<p style={{color:"red"}}>Product not found</p>)}<br/>
                
                <button onClick={onClear} className="modal-form-butt cancelbutt">Close</button>

            </>

        ))}

        {/* {modaltype==="viewyearbussiness" && (!response ?(

            <>
                        
                <label>Enter year:</label>
                <input type="date" name="year" id="year"/>

            </>

        ):(

            <>

                <span>Yearly Bussiness:</span><span>{response.yearlybussiness}</span>
                <span>Category Sales</span><span>{response.categorybussiness}</span>
            
            </>))}

        {modaltype==="viewmonthbussiness" && (!response ?(

            <>
                            
                <label>Enter Month:</label>
                <input type="date" name="month" id="month"/><br/>
                <label>Enter Year:</label>
                <input type="date" name="year" id="year"/>

            </>

            ):(

            <>

                <span>Yearly Bussiness:</span><span>{response.monthbussiness}</span><br/>
                <span>Category Sales</span><span>{response.categorybussiness}</span>

            </>))}

        {modaltype==="viewdaybussiness" && (!response ?(

            <>
                            
                <label>Enter Date:</label>
                <input type="date" name="year" id="year"/>

            </>

            ):(

            <>

                <span>Yearly Bussiness:</span><span>{response.daybussiness}</span><br/>
                <span>Category Sales</span><span>{response.categorybussiness}</span>

            </>))}
         */}
    </div>

    );

}
    

export default CustomModal;