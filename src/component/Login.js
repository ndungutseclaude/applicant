import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';


class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        }
    }

    // onChange Methode
    handleChange=(event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //FORM SUBMITION
    formSubmit=(e)=>{
        e.preventDefault();
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
        
        return(
            <div>
                <Header/>
                <div className="ui container" style={{marginTop: '10px'}}>
                <h1> Login Form</h1>
                <form onSubmit={this.formSubmit} className="ui form" style={{marginRight: '30rem', marginLeft: '8rem'}}>
                    <label> Email:</label>
                    <input type="email" required
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <label> Password: </label>
                    <input type="password"  required
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
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