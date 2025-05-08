import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faInstagram} from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "../styles/homepage.css";

export default function Footer(){

    return(
        <div className="footer">
            <h3 className="followheader">Follow me on</h3>
            <div className="footer_container">
            <ul className="follow-list">
                <a href="https://www.instagram.com/its_naveen274/#" target="_blank"><li><FontAwesomeIcon icon={faInstagram} /></li></a>   
                <a href="https://www.linkedin.com/in/naveen274/" target="_blank"><li><FontAwesomeIcon icon={faLinkedin} /></li></a>
                <a href="https://github.com/Nav274" target="_blank"><li><FontAwesomeIcon icon={faGithub} /></li></a>
                <a href="https://www.google.com" target="_blank"><li><FontAwesomeIcon icon={faGoogle} /></li></a>
            </ul>
            </div>
        
        <div className="footer-list">
            <ul>
            <a href="#" target="_blank" ><li>About us</li></a> 
            <a href="#" target="_blank"><li>FAQ</li></a> 
            <a href="#" target="_blank"><li>Help</li></a>  
            <a href="#" target="_blank"><li>Contact us</li></a>  
            <a href="#" target="_blank"><li>Send Feedback</li></a>  
            </ul>
        </div>

            <p className="copyrightsinfo" style={{textAlign:"center"}}><span style={{fontSize:"17px"}}>&copy;</span>Copyrights reserved</p>
            <p className="copyrightsinfo" style={{textAlign:"center"}}>Developed by V Naveen</p>
        </div>
    );
}