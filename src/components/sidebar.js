import React from "react"
import "./sidebar.css"
import axios from "axios"

class SideBar extends React.Component
{
    constructor()
    {
        super()
        this.state={
            quote:null
        }
    }
    componentDidMount(){
    axios.get("http://localhost:5000/quotes")
        .then((res)=>{
            this.setState({quote:res.data.quotes})
        })    
    }
    render()
    {
return(
    <div class="sideBar-container">
            <div>
<div class="sideBar-text"> Welcome to Wonderflow: A unique platform where students can interact with teachers/experts/students to get solutions to their queries. Students preparing for,JEE (Mains+Advance) can ask questions from any subject and get quick answers by subject teachers/ experts/mentors.</div>
<div class="sideBar-thought-headText">Thought of the Day</div>            
<div class="sideBar-textHeader">
    <div class="sideHead">
            <div class="sideHead-background">
                <div class="quote">{this.state.quote}</div>
                </div> 
    </div>
    
</div>
</div>
        </div>
)
    }

}
export default SideBar;