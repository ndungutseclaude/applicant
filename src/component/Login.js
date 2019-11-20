import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './SignUp.css'


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
        localStorage.removeItem("user-token")
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
            alert('try again')
            this.setState({email:'',password:''})
            console.log(err)
        })
        
    };
    render(){
        const { isPasswordShown } = this.state;
        return(
            <div>
                <Header/>
                <div className="ui container" style={{margin: '10px'}}>
                <h1> Login Form</h1>
                    <form onSubmit={this.formSubmit} className="ui form" style={{marginRight: '30rem', marginLeft: '8rem', marginBottom: '2px'}}>
                        <label> Email:</label>
                        <input type="email" required
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <label> Password: </label>
                        <div className="ui field">
                        <input type= {(isPasswordShown)? "text": "password"} required
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <i className={(isPasswordShown)? "eye fas fa-eye-slash":"eye fas fa-eye"} onClick={this.togglePasswordVisibility}></i>
                        </div>
                        <button type="submit" className="ui button" style={{margin:'2rem'}}>Login</button>
                        <Link to="/SignUp">
                            Don't have an accoutn?
                        </Link>
                    </form>
                
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Login;