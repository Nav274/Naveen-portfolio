import Header from "./Header"
import Footer from "./Footer"
import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/order.css'
import Noorder from "./Noorder";

function Order(){

    const [orderresponse, setorderresponse] = useState([]);

    useEffect(() => {
        const fetchOrderItems = async () => {
          try {
            const response = await axios.get('http://localhost:8086/api/order/items', {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            });
            setorderresponse(response.data);
          } catch (error) {
            setorderresponse([]);
          }
        };
      
        fetchOrderItems();
      }, []);
      

return(

    <>
    <Header/>
      {/* <div id="orderresponse">{<p >{"orderresponse"}</p>}</div> */}

      {orderresponse.length === 0 ? <Noorder/>:

    <>

        <h2 className="orderheading">Your Orders</h2>

        <div className="order-grid-container">

        

          {orderresponse.map((product,index)=>(
              
              <div key={index}>
                  <h3>&nbsp;<span>Order id:</span>&nbsp;{product["order-id"]}</h3>
                  <img src={product["order-product-image"]} alt={product["order-product-name"]} loading="lazy" onError={(e)=>e.target.src="https://via.placeholder.com/150"}/>
                  <div style={{textAlign:'center'}} >
                    
                      <span className="productname">{product["order-product-name"]}</span><br/>
                      <span className="productprice">&#8377;{product["order-product-price"]}</span><br/>
                      <span className="productstatus">{product["order-status"]}</span><br/>
                      <span className="productquantity">Quantity: {product["order-product-quantity"]}</span><br/>
                      <span className="ordertime"> Ordered on: {product["order-time"]}</span><br/>

                  </div>
              </div>))} 

      </div>
      
    </>}

    <Footer/>
    </>

)
}
export default Order;