import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/cartpage.css';
import { useLocation, useNavigate } from "react-router-dom";
import Nocart from "./Nocart";



function Cart(){

    const [cart, setCart] = useState([]);
    const[Cartitemscount,setCartitemscount] = useState(0);
    const[isquantityupdated, setquantityupdated] = useState("");
    const navigate = useNavigate();
    const locator = useLocation();
    const{ username, emailid, contactno } = locator.state?.user || {};
    // const [subtotal, setSubTotal] = useState(0);
    // const [email, setEmail] = useState(1);
    // const [username, setUsername] = useState(null);
    // const [contactno, setContactno] = useState(9999999999);
    

    const ordertotal = cart.reduce((acc, item) => acc + item.productprice * item.productquantity, 0);
    const discount = 50;
    const shipping_charges = 25;
    const subtotal = (ordertotal - discount);
    const grandtotal = (shipping_charges + subtotal);

    useEffect(()=>{
        
        axios.get('http://localhost:8086/api/cart/items/count',{headers:{"Content-Type":"application.json"},withCredentials:true}).then((response)=>setCartitemscount(response.data.count)).catch((e)=>(setCartitemscount(0)));
        
    },[isquantityupdated])

    useEffect(()=>{

        document.title = "Checkout";

        axios.get('http://localhost:8086/api/cart/items',{headers:{"Content-Type":"application.json"},withCredentials:true}).then((response)=>setCart(response.data)).catch((e)=>(setCart([])));
    },[isquantityupdated])


    async function handleAddButton(productid, productquantity){

        axios.put('http://localhost:8086/api/cart/item/update',{"productid":productid, "quantity":productquantity+1},{headers:{"Content-Type":"application/json"},withCredentials:true}
        ).then((response)=>setquantityupdated(response.data.count))
        .catch((e)=>console.log(e));
 
    }

    async function handleSubButton(productid, productquantity){

        axios.put('http://localhost:8086/api/cart/item/update',{"productid":productid, "quantity":productquantity-1},{headers:{"Content-Type":"application/json"},withCredentials:true}
        ).then((response)=>setquantityupdated(response.data.count))
        .catch((e)=>console.log(e));

    }

    async function handleCheckout(){


        const requestbody={
            totalamount:grandtotal,
        };

        const requestpay=JSON.stringify(requestbody);


    try{

            const response = await axios.post('http://localhost:8086/api/cart/payment/create',
                requestpay,
                {headers:{"Content-Type":"application/json"},withCredentials:true}
            )

                if(!response){

                    throw new Error("Error");
            
                }
            
            const orderid = response.data;

            const options= {

                key:"rzp_test_sZVUtaAD3ZyA8A",
                amount:grandtotal*100,
                name:"Lynxi cart",
                description:"Test transaction",
                order_id: orderid ,
                currency:"INR",
                handler: async function (response){

                    try{

                        const verifyResponse = await axios.post('http://localhost:8086/api/cart/payment/verify',{"razorpayOrderId":response.razorpay_order_id,"razorpayPaymentId":response.razorpay_payment_id, "razorpaySignature":response.razorpay_signature, "amountpaid":grandtotal}
                            ,{headers:{"Content-Type":"application/json"},withCredentials:true})

                            if(verifyResponse){
                                console.log("Payment successfull with order-id:",verifyResponse.data);
                                alert("Payment Successful");
                                navigate("/home/orders");
                                }
                                else{

                                    alert("Payment Failed ");
                                }

                    }catch(error){
                        console.log(error)
                        alert("verification failed, Please try again later",error)
                    }
            },
            prefill:{
                name:username,
                email:emailid,
                contact:contactno,
            },
            theme:'#3699cc'
            }

            const rzp = new window.Razorpay(options);
            rzp.open();

        }catch(error){
            console.log("Payment Failed");
            alert("Payment Failed", error);

            }
    }

    return(
    <>
        <Header/>

        {cart.length!==0 ?

        <>
            <div className="container">

                <div className="left-container">

                    {/* <p style={{display:"inline"}}><FontAwesomeIcon icon={faArrowLeft} id="arrow"/>Continue shopping</p>
                    <FontAwesomeIcon icon={faArrowLeft} id="arrow"/> */}
                    <p><span style={{fontSize:'35px'}}>&#8592;</span>Continue Shopping</p>
                    <h2> Cart Items</h2>
                    <p className="itemscount">Total items:&nbsp;{Cartitemscount}</p>
                    <p className="grandtotal">To pay:&nbsp;₹{grandtotal.toLocaleString("en-IN")}</p>

                    <div className="cart-items">

                                {cart.map((item,index)=>(

                                    <div className="product-card" key={index}>

                                        <div  className="cartproduct-image">{<img src={item.productimage} alt="item.productname"/>}</div><br/>
                                        <h3 className="cartitemname">{item.productname}</h3>

                                        <div className="product-details">

                                            <p className="cartdesc">{item.productdesc}</p>
                                            <p className="current-price">&#8377;{item.productprice.toLocaleString("en-IN")}</p>

                                            <div className="quantity-control">
                                                <button onClick={()=>handleSubButton(item.productid, item.productquantity)} className="quantity-btn">-</button><span className=".quantity-input">{item.productquantity}</span><button onClick={()=>handleAddButton(item.productid, item.productquantity)} className="quantity-btn">+</button>
                                            </div>

                                        </div>

                                       

                                    </div>

                                )) } 

                    </div>

            </div>

            

            <div className="right-container">

            <h2>Order Summary</h2>

                <table>
                    <tr>
                        <td><p>Order total</p></td>
                        <td><p style={{fontWeight:"bold"}}>&#8377;{ordertotal.toLocaleString("en-IN")}</p></td>
                    </tr>
                    <tr>
                        <td><p>Shipping charges</p></td>
                        <td><p>&#8377;{shipping_charges }</p></td>
                    </tr>
                    <tr>
                        <td><p>Discount</p></td>
                        <td><p style={{color:"green"}}>&#8377;{discount }</p><br/></td>
                    </tr>
                    <tr>
                        <td><p>Subtotal</p></td>
                        <td><p>&#8377;{subtotal.toLocaleString("en-IN")}</p><br/></td>
                    </tr>
                    <tr>
                        <td><p style={{fontWeight:"bold"}}>Grand Total</p></td>
                        <td><p style={{fontWeight:"bold"}}>&#8377;{grandtotal.toLocaleString("en-IN")}</p></td>
                    </tr>
                        <button onClick={handleCheckout}>Place Order</button>

                </table>

                </div>
                
            </div>

        </> : <Nocart/>}
 
        <Footer/>

    </>
    )

    }
export default Cart;