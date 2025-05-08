import React, { useState,useEffect } from 'react'
import  '../styles/productdisplay.css'
import axios from 'axios'
import Cartcount from './Cartcount'
import Navbar from './Navbar'
import Noproduct from './Noproduct'
import SkeletonTheme from 'react-loading-skeleton'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';

const HomeContent = () => {

  const[productinfo,setproductinfo] = useState([]);
  const[cartresponse,setcartresponse] = useState("");
  const[searchTerm, setSearchTerm] = useState("");
  const[isquantityupdated, setquantityupdated] = useState(0);
  const[isLoading, setisLoading] = useState(true);

  useEffect(()=>{

    document.title = "Lynxi cart";

    async function fetchdata(){

      try{

        setisLoading(true);

        const response = await axios.get('http://localhost:8086/api/products',{headers:{"Content-Type":"application/json"},withCredentials:true})
              
        setproductinfo(response.data);

      } catch(e) {

        console.log(e);
        
      } finally{

        setisLoading(false);

      }
    }
    fetchdata()
  },[isquantityupdated]);


  const filteredproducts = searchTerm ? productinfo.filter((product)=>product["product name"].toLowerCase().includes(searchTerm.toLowerCase())) : productinfo;

  function handleaddcartclick(productid, quantity){

    axios.post('http://localhost:8086/api/cart/item/add',{"productid":productid, "quantity":quantity},{headers:{"Content-Type":"application/json"},withCredentials:true}).then((response)=>{setquantityupdated(response.data.count); setquantityupdated(response.data.count)}).catch((error)=>setcartresponse(error.data.message));

  }

   function handleAddButton(productid, productquantity){

    axios.put('http://localhost:8086/api/cart/item/update',{"productid":productid, "quantity":productquantity+1},{headers:{"Content-Type":"application/json"},withCredentials:true}
    ).then((response)=>{setcartresponse(response.data.message);setquantityupdated(response.data.count)})
      .catch((e)=>setcartresponse(e));

}

 function handleSubButton(productid, productquantity){

    axios.put('http://localhost:8086/api/cart/item/update',{"productid":productid, "quantity":productquantity-1},{headers:{"Content-Type":"application/json"},withCredentials:true}
    ).then((response)=>{setcartresponse(response.data.message);setquantityupdated(response.data.count)})
      .catch((e)=>setcartresponse(e));

}

  return (
<>
    <Navbar />

      <div id="cartresponse">{<p >{cartresponse}</p>}</div>

      <div className="search-div">
        <input placeholder="Search products..."  value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)} className="search-input"/>
      </div><br/>

  

    { isLoading ? (<SkeletonTheme baseColor="white" highlightColor="darkgray"><Skeleton/> </SkeletonTheme>) : (filteredproducts.length > 0 ? (

    <div className="grid-container">

        {filteredproducts.map((product,index)=>(

          <div key={index} >
            <div style={{height:"55%" }}>
              <img src={product.image} alt={product["product name"]} loading="lazy" />
            </div>
            <div style={{textAlign:'center',height:"45%" }} >
              <h2>{product["product name"]}</h2>
              <p> <span style={{fontWeight:'bold'}}>Price: &#8377;</span>{product["product price"].toLocaleString("en-IN")}</p><br/>
              <p><span style={{fontWeight:'bold'}}>In stock:</span> {product["product stock"]}</p><br/>

              {product["cart quantity"] ? <button className="notaddtocartbtn"><button className='minusbtn' onClick={()=>handleSubButton(product.productid, product["cart quantity"])}>-</button><Cartcount quantity={product["cart quantity"]}/><button className='plusbtn' onClick={()=>handleAddButton(product.productid, product["cart quantity"])}>+</button>
              </button> :
              <button onClick={()=>handleaddcartclick(product.productid, 1)} className="addtocartbtn">Add to cart</button>
              }
            </div>
          </div>))}
    </div>) :

          (<Noproduct />))}

</>
  )
}

export default HomeContent