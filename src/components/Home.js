import React from "react"
import Navbar from "./Navbar"
import Alert from "./alert"
import Footer from "./footer"
import "./footer.css"
import SideBar from "./sidebar"
import axios from "axios"
import HomeBody from "./homeBody"
import Category from "./category"

class Home extends React.Component
{
    constructor(){
        super()
        this.state={
            quotes:null,
            category:[]
        }
    }
    componentDidMount(){
        const arrayCategories=[]
        axios.get("http://localhost:5000/")
            .then((response)=>{
                //this.setState({quotes:response.data.quotes})
               // this.setState({category:response.data.category})
               
                for(let i=0;i<response.data.category.length;i++)
                {
                    arrayCategories.push(response.data.category[i])
                }
                this.setState({category:arrayCategories})
                console.log("Category",this.state.category)
            })
    }
   render(){
    return(
        <div>
        <Navbar/>
        <Alert/>
        <SideBar quote={this.state.quotes}/>
        <HomeBody/>
        <Footer/>
        <Category category={this.state.category}/>
        </div>
    )
   }
}
export default Home