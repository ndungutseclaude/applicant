import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './App.css';


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            isPasswordShown:false,
            loading: false
        }
    }

    // onChange Methode
    handleChange=(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //TOGGLE PASSWORD VISIBILITY
    togglePasswordVisibility=()=>{
        const { isPasswordShown } = this.state;
        this.setState({ isPasswordShown: !isPasswordShown})
    }

    //FORM SUBMITION
    formSubmit=(e)=>{
        e.preventDefault();
        this.setState({loading: true})
        axios.post('https://codecatalyst-test.herokuapp.com/api/login',{email: this.state.email, password: this.state.password})
        .then(res => {
            //console.log(res)
    
            if(res.data.token){
                localStorage.setItem("user-token",res.data.token)
                this.props.history.push('/QuestionsList')
                
            }else if(res.data.message){
                this.setState({email:'',password:''})
                alert(res.data.message)
            }
        })
        .catch(err => {
            alert(' email or password is incorrect')
            this.setState({email:'',password:''})
            this.setState({loading: false})
            console.log(err)
        })
        
    };
    render(){
        const { isPasswordShown } = this.state;
        return(
            <div>
                <Header/>
                <div className="ui container">
                    <div className=" wrapper">
                        <div className="myicons" style={{marginRight: '2rem'}}>
                            <i className="fab fa-facebook-f" id="facebookIcon"></i>
                            <i className="fab fa-twitter" id="twitterIcon"></i>
                            <i className="fab fa-linkedin-in" id="linkedIcon"></i>
                            <i className="fas fa-paper-plane" id="paperplaneIcon"></i>                  
                        </div>
                        <div>   
                            <h1 style={{fontFamily: 'time new roman'}}> <b>Code Catalyst <br/><span style={{paddingLeft: '2rem'}}> Rwanda</span></b></h1>
                            <p >Welcome back! Fill in the information to continue</p>
                            <form onSubmit={this.formSubmit} className="ui form form_containing_login">
                                <label> Email:</label>
                                <input type="email" style={{background: '#F4F9FF', borderRadius: '0px'}} required
                                    placeholder="Your email address"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <label> Password: </label>
                                <div className="ui field">
                                <input type= {(isPasswordShown)? "text": "password"} style={{background: '#F4F9FF', borderRadius:'0px'}} required
                                    placeholder="Your password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <i className={(isPasswordShown)? "eye fas fa-eye-slash":"eye fas fa-eye"} onClick={this.togglePasswordVisibility} id="eyeONrightLogin"></i>
                                </div>
                                <div className="ButtonsOnLoginForm">

                                
                                    <button type="submit" className="ui button" id="loginButton" disabled={this.state.loading}>
                                        {this.state.loading && <i className="fas fa-spinner fa-spin"></i>}
                                        Login
                                    </button>
                                    <p id="orStyling">or</p>
                                    <Link to="/SignUp" id="dontHaveAccount">
                                        Don't have an account? click here
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Login;