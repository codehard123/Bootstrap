import React from "react"
import Home from "./components/Home"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Profile from "./components/Profile/profile"
import Questions from "./components/Questions/questions"

class App extends React.Component{      
    
    render(){
            return(
        <Router>
        <Route path="/" exact component={Home}></Route>
        <Route path="/profile" exact component={Profile}></Route>   
        <Route path="/category/:id" exact component={Questions}></Route>     
        </Router>
        
            )
        }

        }
export default App;