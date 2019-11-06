import React from 'react';
import axios from 'axios';

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

    //FORM SUBMITION
    formSubmit=(e)=>{
        e.preventDefault();
        const response = axios.post('https://codecatalyst-test.herokuapp.com/api/register',this.state)
        .then((res)=>{
            console.log(res.data.message)
        })
        console.log(response)
        this.props.history.push('/Login')
    }
    render(){
        
        return(
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
                    <input type="password" required
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    
                    <button type="submit" className="ui button" style={{margin:'2rem'}}>SIGN UP</button>
                </form>
                
            </div>
        )
    }
}
export default SignUp;