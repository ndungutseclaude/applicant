import React from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import './SignUp.css';

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            email:'',
            password:''
        }
    }

    // onChange Methode
    handleChange=(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
        //console.log(this.state)   
    }
    //Encript password
     encrypting(){
        var temp = document.getElementById("password");
           if (temp.type === "password") {
               temp.type = "text";
           }
           else {
               temp.type = "password";
           }
       }
       

    //FORM SUBMITION
    formSubmit=(e)=>{
        e.preventDefault();
        axios.post('https://codecatalyst-test.herokuapp.com/api/register',this.state)
        .then((res)=>{
            //console.log(res.data.message)
            this.props.history.push('/')
        })
        .catch(err=>{
            alert('email already registered')
            
        })
        //console.log(response)  
    }
    render(){
        
        return(
            <div className="container">
                <Header/>
                <div>
                <form onSubmit={this.formSubmit} className="ui form" style={{marginRight: '30rem', marginLeft: '8rem'}}>
                 <div className="row  signing">
                 <div className="col-sm-3"> 
                <aside className="icon">
                 <div><i class="fab fa-facebook-f"></i></div>
                 <div> <i class="fab fa-twitter"></i></div>
                 <div><i class="fab fa-linkedin-in"></i></div>
                 <div> <i class="fas fa-paper-plane"></i></div>
              </aside>
              </div> 
              <div className="col-sm-3">

              </div>
              <div className=" col-sm-6 titles"> 
                <h1 class="title">Code Catalyst</h1>
                <h1 class="title1">  Rwanda</h1>
                </div>
                </div> 
                  <div className="row">
                      <div className="col-sm-3">

                      </div>
                      <div className="col-sm-9 contents">
                   <small className="content1">Want to become a top developer in Rwanda 
                         <p className="content2"> and work with US-based startup companies?</p>
                        <p className="words"> Complete our coding application now.</p>  
                        </small>
                        </div>
                        </div>
                        <div className="details">
                    <label> UserName:</label>
                    <input style={{background: ' #F4F9FF'} }
                    type="text" required
                        name="username"
                        placeholder="Your username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <label> Email:</label>
                    <input style={{background: ' #F4F9FF'} }
                    type="email" required
                        name="email"
                        placeholder="Your email address"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <label> password:</label>
                    <input  style={{background: ' #F4F9FF'} }
                    type="password" required
                        name="password"
                        placeholder="Your password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <i className=" eye fas fa-eye" onclick="encrypting()"></i>
                    </div>
                    <div className="btn-post">
                     <button type="button" className="btn btn-danger">START MY APPLICATION</button>
                          <p className="or" >or</p>
                          <p class="exit">CONTINUE EXISTING APPLICATION</p>
                          </div>   
                </form>
        
            </div>
            <Footer/>
            </div>
        )
    }
}
export default SignUp;