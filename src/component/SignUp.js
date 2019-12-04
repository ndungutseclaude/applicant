import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import './SignUp.css';

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
                        <div className="signUpWrapper">
                            <div className="signUpIcons">
                                <i className="fab fa-facebook-f"></i>
                                <i className="fab fa-twitter"></i>
                                <i className="fab fa-linkedin-in"></i>
                                <i className="fas fa-paper-plane"></i>
                            </div>
                            <div>
                                <h1 className="headerStyling">Code Catalyst <br/><span style={{marginLeft: '6rem'}}>Rwanda</span></h1>
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
                                                <label className="labelStyling"> password:</label>
                                                <input id="inputStyling"
                                                    type={(isPasswordShown)? "text":"password"} required
                                                    name="password"
                                                    placeholder="Your password"
                                                    value={this.state.password}
                                                    onChange={this.handleChange}
                                                />
                                                <i className={(isPasswordShown)? "eye fas fa-eye-slash":"eye fas fa-eye"}  onClick={this.togglePasswordVisibility}></i>
                                            </div>
                                            <div className="buttonsDiv">
                                                <button type="submit" className="ui btn" id="submitButtonStyling">
                                                    {this.state.loading && <i className="fas fa-spinner fa-spin"></i>}
                                                    START MY APPLICATION
                                                </button>
                                                <p id="orStyling">or</p>
                                                <Link to="/" id="alreadyHaveAccount">already have account?</Link>
                                                
                                            </div>
                                        </div>

                            </form>
                            </div>
                            <div>
                                {/* this div is the div to add much space in right */}
                            </div>
                        </div>
                    </div>
                    
                    {/* <div className="container">
                        <Header />
                        <div className=" tops row">
                            <div className=" icons col-sm-3">
                                <div><i className="fab fa-facebook-f"></i></div>
                                <div> <i className="fab fa-twitter"></i></div>
                                <div><i className="fab fa-linkedin-in"></i></div>
                                <div> <i className="fas fa-paper-plane"></i></div>
                            </div>
                            <div className=" titles col-sm-6">
                                <h3 className="title">Code Catalyst </h3>
                                <h3 className="title1">Rwanda</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                            </div>
                            <div className="cont col-lg-6 col-sm-6 ">
                                <small className="content1">Want to become a top developer in Rwanda
                                      <p className="content2"> and work with US-based startup companies?</p>
                                    <p className="content3"> Complete our coding application now.</p>
                                </small>
                            </div>
                        </div>
                        <form onSubmit={this.formSubmit} className="ui form" style={{ marginRight: '8rem', marginLeft: '8rem' }}>
                            <div className="row">
                                <div className="details">
                                    <label> UserName:</label>
                                    <input style={{ background: ' #F4F9FF' }}
                                        type="text" required
                                        name="username"
                                        placeholder="Your username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                    />
                                    <label> Email:</label>
                                    <input style={{ background: ' #F4F9FF' }}
                                        type="email" required
                                        name="email"
                                        placeholder="Your email address"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                    <label> password:</label>
                                    <input style={{ background: ' #F4F9FF' }}
                                        type={(isPasswordShown)? "text":"password"} required
                                        name="password"
                                        placeholder="Your password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                    <i className={(isPasswordShown)? "eye fas fa-eye-slash":"eye fas fa-eye"}  onClick={this.togglePasswordVisibility}></i>
                                </div>
                                <div className="btn-post">
                                    <button type="submit" className="btn btn-danger">
                                        {this.state.loading && <i className="fas fa-spinner fa-spin"></i>}
                                        START MY APPLICATION
                                    </button>
                                    <p className="or" >or</p>
                                    <Link to="/" className="exit">already have account?</Link>
                                    
                                </div>
                            </div>

                        </form>

                    </div> */}
                    <Footer />
            </div>

        )
    }
}
export default SignUp;