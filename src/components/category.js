import React from "react"
import "./Category.css"
import {Link} from "react-router-dom"
import axios from "axios"
class Category extends React.Component
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
            <div class="Category-Container">
            <div class="Category-head">
                All Categories
                </div>
                <hr />
                
            {this.state.category!=null && (this.state.category.map((item,index)=>{
               return(<Link to={`/category/${item.category}`}><p>{item.category} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.count}</p></Link>) 
            }))}


</div>
    )
        }
}
export default Category