import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
//import './SignUp.css';
import './App.css'

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            email:'',
            password:'',
            isPasswordShown: false,
            loading:false
        }
    }

    // onChange Methode
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        //console.log(this.state)   
    }

    //TOGGLE PASSWORD VISIBILITY
    togglePasswordVisibility=()=>{
        const { isPasswordShown } = this.state
        this.setState({ isPasswordShown: !isPasswordShown})
    }

    //FORM SUBMITION
    formSubmit = (e) => {
        e.preventDefault();
        this.setState({loading: true})
       axios.post('https://codecatalyst-test.herokuapp.com/api/register',{username: this.state.username, 
            email: this.state.email, password:this.state.password})
            .then((res)=>{
                if(res.data.message ==='You were registered, now you can login and a welcoming message was sent to your email box'){
                    this.props.history.push('/')
                }
                alert(res.data.message)
                //console.log(res.data.message)
            })
            .catch(err=>{
                alert('email already registered')

            })
            //console.log(response)  
        }
        render() {
            const { isPasswordShown } = this.state
            return (
                <div>
                    <Header/>
                    <div className="ui container">
                        <div className="wrapper">
                            <div className="myicons">
                                <i className="fab fa-facebook-f" id="facebookIcon"></i>
                                <i className="fab fa-twitter" id="twitterIcon"></i>
                                <i className="fab fa-linkedin-in" id="linkedIcon"></i>
                                <i className="fas fa-paper-plane" id="paperplaneIcon"></i>
                            </div>
                            <div>
                                <h1 style={{fontFamily: 'Taviraj',fontStyle: 'normal', fontWeight: 'bold'}}>Code Catalyst <br/><span style={{paddingLeft: '4rem'}}>Rwanda</span></h1>
                                <p className="textStyling">
                                    Want to become a top developer in Rwanda<br/>
                                    and work with US-based startup companies?<br/>
                                    Complete our coding application now.
                                </p>
                                    <form onSubmit={this.formSubmit} className="ui form form-container">
                                        <div>
                                            <div>
                                                <label className="labelStyling"> UserName:</label>
                                                <input id="inputStyling"
                                                    type="text" required
                                                    name="username"
                                                    placeholder="Your username"
                                                    value={this.state.username}
                                                    onChange={this.handleChange}
                                                />
                                                <label className="labelStyling"> Email:</label>
                                                <input id="inputStyling"
                                                    type="email" required
                                                    name="email"
                                                    placeholder="Your email address"
                                                    value={this.state.email}
                                                    onChange={this.handleChange}
                                                />
                                                <label className="labelStyling"> Password:</label>
                                                <input id="inputStyling"
                                                    type={(isPasswordShown)? "text":"password"} required
                                                    name="password"
                                                    placeholder="Your password"
                                                    value={this.state.password}
                                                    onChange={this.handleChange}
                                                />
                                                <i className={(isPasswordShown)? "eye fas fa-eye-slash":"eye fas fa-eye"}  onClick={this.togglePasswordVisibility}id="eyeONright" ></i>
                                            </div>
                                            <div className="ButtonsOnSugnupForm">
                                                <button type="submit" className="ui button" id="loginButton">
                                                    {this.state.loading && <i className="fas fa-spinner fa-spin"></i>}
                                                    START MY APPLICATION
                                                </button>
                                                <p id="orStyling">or</p>
                                                <Link to="/" id="dontHaveAccount">already have account?</Link>
                                                
                                            </div>
                                        </div>

                            </form>
                            </div>
                            <div>
                                
                                {/* this div is the div to add much space in right */}
                            </div>
                        </div>
                        
                    </div>
                    <Footer/>
            </div>

        )
    }
}
export default SignUp;