import React from "react"
import Home from "./components/Home"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Profile from "./components/Profile/profile"


class App extends React.Component{      
    
    render(){
            return(
        <Router>
        <Route path="/" exact component={Home}></Route>
        <Route path="/profile" exact component={Profile}></Route>        
        </Router>
        
            )
        }

        }
export default App;