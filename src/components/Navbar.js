import React from 'react';
import CKEditor from 'ckeditor4-react';
import axios from 'axios'
import {Link} from "react-router-dom"
import Select from "react-select"
import optionsPhysics from "../data/optionsPhysics"
import optionsChemistry from "../data/optionsChemistry"
import optionsMaths from "../data/optionsMaths"
class Navbar extends React.Component{
  
    constructor(){
    super()
    this.state={
    data:"",
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    signUpResponse:"",
    tags:"",
    selectedSub:"",
    selectedCategory:"",
    title:"",
    currentSelected:"",
    showMSG:false,
    showError:false,
    showLoginMSG:false,
    loginError:false

    }
    this.changeValue=this.changeValue.bind(this)
    this.signUp=this.signUp.bind(this)
    this.submitQuestion=this.submitQuestion.bind(this)
    this.onEditorChange = this.onEditorChange.bind( this );
    this.Login=this.Login.bind(this);
    
  }
  signUp(event){
    event.preventDefault();
    console.log("Hello")
    const signupData={
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      email:this.state.email,
      password:this.state.password
    }
    axios.post("http://localhost:5000/signUp",signupData)
      .then(response =>{
        this.setState({
          signUpResponse:response.data.msg
        })
        console.log(this.state.signUpResponse)
        if(this.state.signUpResponse=="Record Added")
        {
          this.setState({showMSG:true})
        }
        if(this.state.signUpResponse=="Username already exists")
        {
          this.setState({showError:true})
        }
      })
      
      
  }
  changeValue(event){
    this.setState(
      {
        [event.target.id]:event.target.value
      }
    )
    
  }
  handleChange = selectedOption => {
    this.setState({ selectedSub:selectedOption.value});
    
    if(selectedOption.value=="Chemistry")
    {
      this.setState({currentSelected:optionsChemistry})
    }
    if(selectedOption.value=="Physics")
    {
      this.setState({currentSelected:optionsPhysics})
    }
    if(selectedOption.value=="Maths")
    {
      this.setState({currentSelected:optionsMaths})
    }
  }
  handleCategory= selectedOption =>{
    this.setState({selectedCategory:selectedOption.value})
  }
  submitQuestion(e)
  {
    e.preventDefault()
    const questionJson={
      title:this.state.title,
      tags:this.state.tags,
      upvotes:0,
      downvotes:0,
      description:this.state.data,
      subject:this.state.selectedSub,
      author:"Samarth",
      answered:false,
      addedtofavorites:false,
      comments:null,
      dateTime:new Date(),
      category:this.state.selectedCategory

    }
    console.log(questionJson);

    axios.post("http://localhost:5000/questions",questionJson)
  }
  onEditorChange(evt){
    this.setState({
      data: evt.editor.getData()
    })

  }
  Login(){
    this.setState({loginError:false,showLoginMSG:false})
    const loginJson={
      email:this.state.email,
      password:this.state.password
    }
    axios.post("http://localhost:5000/login",loginJson)
      .then((response)=>{
        console.log(response.data.result)
        if(response.data.result=="Invalid username or password")
        this.setState({loginError:true})
        else
        {
          this.setState({showLoginMSG:true})
          localStorage.setItem('cool-jwt',response.data.result)
        }
      })
  }
  render(){
    const optionsSub = [
      { value:'Physics',label: 'Physics'},
      { value:'Chemistry',label: 'Chemistry'},
      { value:'Maths',label: 'Maths'} 
    ]
    return (
      <div>
      <div>
       
        <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link className="navbar-brand" to="/"><i className="fa fa-futbol-o" aria-hidden="true">&nbsp;&nbsp;&nbsp;<span className="text-navbar">Wonderflow</span></i></Link>
      <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                  <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/QandA">Q&amp;A</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/unanswered">Unanswered</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/categories">Categories</Link>
              </li>
              
          </ul>
          <form className="form-inline ">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item" data-toggle="modal" data-target="#addPage">
                  <a className="nav-link">Ask a Question</a>
              </li>
         </ul>
          </form>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item" data-toggle="modal" data-target="#signupModal">
                  <a className="nav-link">Login</a>
                  
              </li>
              <li className="nav-item" data-toggle="modal" data-target="#myModal">
                  <a className="nav-link">Sign Up</a>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              
              </ul>
      </div>
  </nav>
  
  <div className="modal fade" id="myModal" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
          <h4 className="modal-title">Sign Up at Wonderflow</h4>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
           
          </div>
          <div className="modal-body">
            <p>Sign up to discuss your doubts related to IIT-JEE.</p>
            <form className="form-inline">
                <div className="form-group">
                    
                    <input type="text" name="firstName"  onChange={this.changeValue} id="firstName" className="form-control" placeholder="First Name" aria-describedby="helpId">
                    </input>&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" name="lastName" value={this.state.lastName} onChange={this.changeValue} id="lastName" className="form-control" placeholder="Last Name" aria-describedby="helpId">
                    </input>
                    <br /><br /><br /><br />
                   </div> 
                   
                   <div className="form-group">
                    <input type="text" name="email" value={this.state.email} onChange={this.changeValue} id="email" className="form-control" placeholder="Email" aria-describedby="helpId">
                    </input>&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="password" name="phoneNumber" value={this.state.phoneNumber} onChange={this.changeValue} id="phoneNumber" className="form-control" placeholder="Password" aria-describedby="helpId">
                    </input>
                    </div>
                    <br />
                    <button onClick={this.signUp} className="btn btn-primary" style={{position:"relative",left:"17px",top:"8px"}}>Sign Up</button>
                    {this.state.showMSG && (<p>SignUp successful! Login to continue</p>)}
                    {this.state.showError && (<p>Username Already Exists. Try different Email Id</p>)}
                    </form>
                    <br />
                   <p className="text-center">---------------OR----------------</p>
                   
                   
                   <p className="text-center">Sign Up with:</p>
                   <button type="button" className="btn btn-danger" style={{position:"relative",left:"100px"}}>Google</button>
                   <button type="button" className="btn btn-primary" style={{position:"relative",left:"200px"}}>Facebook</button>
  
                   
                                      
                </div>
            
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
        </div>
        </div>
            <div className="modal fade" id="addPage"  tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <form>
                <div className="modal-header">
                  <h4 className="modal-title" id="myModalLabel">Ask Question</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  
                </div>
                <div className="modal-body">
                <div className="form-group">
                    <input type="text" id="title" className="form-control" placeholder="Question Title..." onChange={this.changeValue}/>
                  </div>
                  
                  <div className="form-group">
                    <CKEditor
                    data={this.state.data}
                    onChange={this.onEditorChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" id="tags" className="form-control" placeholder="Add Some Tags..." onChange={this.changeValue}/>
                  </div>
                  <div className="form-group1">
                  
                  <Select placeholder="Select subject..."
        value={this.selectedSub}
        onChange={this.handleChange}
        options={optionsSub}
      />

                  </div>
                  <div className="form-group1">
                  
                  <Select placeholder="Select category..."
        value={this.selectedCategory}
        onChange={this.handleCategory}
        options={this.state.currentSelected}
      />

                  </div>
                  
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary" onClick={this.submitQuestion}>Save changes</button>
                </div>
              </form>
              </div>
            </div>
           
          </div>
          </div>
        <div className="modal fade" id="signupModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
            <h4 className="modal-title">Login at Wonderflow</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
             
            </div>
            <div className="modal-body">
              <p>Login to post,comment,share and resolve your doubts</p>
              <form className="form-inline">
                  <div className="form-group">
                      
                  
                     <div className="form-group">
                      <input type="text" name="email" value={this.state.email} onChange={this.changeValue} id="email" className="form-control" placeholder="Email" aria-describedby="helpId">
                      </input>&nbsp;&nbsp;&nbsp;&nbsp;
                      <input type="password" name="password" value={this.state.password} onChange={this.changeValue} id="password" className="form-control" placeholder="Password" aria-describedby="helpId">
                      </input>
                      </div>
                      <br />
                      </div>
                      </form>
                      <br />
                      <button onClick={this.Login} className="btn btn-primary" style={{position:"relative",left:"190px",top:"3px"}}>Login</button>
                      {this.state.loginError &&(<p>Invalid Username or password</p>)}
                      {this.state.showLoginMSG &&(<p>Login Successful</p>)}
                     <p className="text-center">---------------OR----------------</p>
                     
                     
                     <p className="text-center">Sign Up with:</p>
                     <button type="button" className="btn btn-danger" style={{position:"relative",left:"100px"}}>Google</button>
                     <button type="button" className="btn btn-primary" style={{position:"relative",left:"200px"}}>Facebook</button>
    
                     
                                        
                  </div>
              
            </div>
            </div>
            </div>
    
      </div>
  );
  }
  
}

export default Navbar;
