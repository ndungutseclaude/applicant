import React from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            email:'',
            password:'',
            isPasswordShown: false
        }
    }

    // onChange Methode
    handleChange=(event)=>{
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
    formSubmit=(e)=>{
        e.preventDefault();
        axios.post('https://codecatalyst-test.herokuapp.com/api/register',{username: this.state.username, 
        email: this.state.email, password:this.state.password})
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
        const { isPasswordShown } = this.state
        return(
            <div>
                <Header/>
                <div className="ui container" style={{marginTop: '10px'}}>
                <h1> SignUp Form</h1>
                <form onSubmit={this.formSubmit} className="ui form" style={{marginRight: '30rem', marginLeft: '8rem'}}>
                    <label> UserName:</label>
                    <input type="text" required
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <label> Email:</label>
                    <input type="email" required
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <label> password:</label>
                    <div>
                        <div>
                            <input type={(isPasswordShown)? "text":"password"} required
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <i className={(isPasswordShown)? "eye slash icon":"eye icon"} onClick={this.togglePasswordVisibility}></i>
                        </div>
                    </div>
                    
                    <button type="submit" className="ui button" style={{margin:'2rem'}}>SIGN UP</button>
                </form>
                
            </div>
                <Footer/>
            </div>
        )
    }
}
export default SignUp;