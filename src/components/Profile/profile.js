import React from "react"
import axios from "axios";
class Profile extends React.Component{
    constructor()
    {
        super()
        this.state={

        }
    }
componentDidMount(){
    axios.post("http://localhost:5000")
}
}
export default Profile