import React from "react"
import "./Category.css"
function Category(props)
{
    
    return(
<div class="Category-Container">
            <div class="Category-head">
                All Categories
                </div>
                <hr />
                
            {props.category!=null && (props.category.map((item,index)=>{
               return(<p>{item.category} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.count}</p>) 
            }))}


</div>
    )
}
export default Category