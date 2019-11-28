import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './login.css'


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            isPasswordShown:false
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
        console.log('submitted')
        axios.post('https://codecatalyst-test.herokuapp.com/api/login',{email: this.state.email, password: this.state.password})
        .then(res => {
            localStorage.setItem("user-token",res.data.token)
            this.props.history.push('/QuestionsList')
            //console.log('you are logged in ')
        })
        .catch(err => {
            console.log(err + 'something went wront')
        })
        
    };
    render(){
        const { isPasswordShown } = this.state;
        return(
            <div>
                <Header/>
                <aside>
                                    <div><i className="fab fa-facebook-f facebook"></i></div>
                                    <div><i className="fab fa-twitter twitter"></i></div>
                                    <div><i className="fab fa-linkedin-in linked"></i></div>
                                    <div><i className="fas fa-paper-plane send"></i></div>
                                </aside>
                
            <div className="login-dark form">
                    <form onSubmit={this.formSubmit}>
                    <div className="text-center head">Code Catalyst Rwanda</div>
                        <div className="welcome">Welcome back! fill in the info to continue</div>
                        <div className="form-group">Email<br/>
                        <div className="ui right labeled input email">
                            <input type="email" required 
                            name="email" 
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange} 
                            className="form-control" />
                        </div>
                        </div>
                        
                        <div className="form-group">Password<br/>
                        <div className="ui right labeled input password">
                            <input type={(isPasswordShown)? "text": "password"} required 
                            name="password"
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.handleChange} />
                            <i className={(isPasswordShown)? "eye fas fa-eye-slash":"eye fas fa-eye"} onClick={this.togglePasswordVisibility}></i>
                    </div>
                    </div>
                    
                    <button type="subnit" className="btn btn-danger button">Log in</button> 
                    <div className="or">or<br/>

                            <Link to="/SignUp">
                            <div className='post'>START YOUR APPLICATION</div> 
                            </Link>
                            </div>
                    
                    </form>
                    </div>

                <Footer/>
            </div>
        )
    }
}

export default Login;