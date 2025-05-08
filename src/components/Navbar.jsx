import { NavLink } from "react-router-dom"

export default function Navbar(){

    const categories=["Mobile accessories","Pants","Shirts","Mobiles","Televisions"];

    return (
        <>

            <div>
                <nav className="nav">
                    <ul style={{textAlign:"center"}}>
                    {categories.map((category,index)=>(<li key={index} ><NavLink to={`/our-products/${category}`} className="nav-link">{category}</NavLink></li>))}
                    </ul>
                </nav>
            </div>

        

        </>
    )

}
