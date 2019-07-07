import React from "react"
import Navbar from "./Navbar"
import Alert from "./alert"
import Footer from "./footer"
import "./footer.css"
import SideBar from "./sidebar"
import HomeBody from "./homeBody"
import Category from "./category"

class Home extends React.Component
{
    
   
   render(){
    return(
        <div>
        <Navbar/>
        <Alert/>
        <SideBar/>
        <HomeBody/>
        <Footer/>
        <Category/>
        </div>
    )
   }
}
export default Home