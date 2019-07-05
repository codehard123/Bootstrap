import React from "react"
import "./alert.css"
function Alert()
{
    return(
        <div class="alert" style={{margin: "0 0 0.5em 0"}}> <span class="closebtn" onClick="this.parentElement.style.display='none';"></span> <a href="javascript:;" style={{color:"white",fontSize: "20px", fontWeight: "600"}}> Join Sarthaks eConnect Today - The Largest Online Education Community!</a><p style={{color: "white",fontSize: "18px"}}> A community for Students, Teachers, Parents &amp; Subject Expert.</p></div>
    
    )
}
export default Alert