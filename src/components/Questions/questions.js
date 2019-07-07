import React from "react"
import './questions.css'
import axios from "axios"
import Navbar from "../Navbar"

import Footer from "../footer"
import "../footer.css"
import SideBar from "../sidebar"
import RecentQuestions from "../Questions/recentQuestions"
import "../Questions/recentQuestions.css"
import Category from "../category"
class Questions extends React.Component{
    constructor()
    {
        super()
        this.state={
            data:[]
        }
       this.duparray=[]
    }
    
render()
{
     
    return(<div>

        {this.state.data!=null && (this.state.data.map((item,index)=>{
             return(<RecentQuestions votes={item.upvotes} title={item.title} author={item.author} dateTime={item.dateTime}/>
             )
        
        }))}
        <Navbar/> 
        <Footer/>
        <SideBar/>
        <Category/>
        
        
    
    
    </div>

        )
}
componentWillMount(){
    {console.log("compoennt will mount")}
    fetch(`http://localhost:5000${window.location.pathname}`)
        .then((response) =>response.json())
        .then((responseJson)=>{
            this.setState({data:responseJson.question})
            console.log(this.state.data)
        }) 
          
        }
     componentWillReceiveProps(){
    {console.log("compoennt will receive props")}
    fetch(`http://localhost:5000${window.location.pathname}`)
        .then((response) =>response.json())
        .then((responseJson)=>{
            this.setState({data:responseJson.question})
            console.log(this.state.data)
            
        }) 
        

}

}
    


export default Questions