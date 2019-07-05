import React from "react"
import "./sidebar.css"
function SideBar(props)
{
return(
    <div class="sideBar-container">
            <div>
<div class="sideBar-text"> Welcome to Wonderflow: A unique platform where students can interact with teachers/experts/students to get solutions to their queries. Students preparing for,JEE (Mains+Advance) can ask questions from any subject and get quick answers by subject teachers/ experts/mentors.</div>
<div class="sideBar-thought-headText">Thought of the Day</div>            
<div class="sideBar-textHeader">
    <div class="sideHead">
            <div class="sideHead-background">
                <div class="quote">{props.quote}</div>
                </div> 
    </div>
    
</div>
</div>
        </div>

)
}
export default SideBar;