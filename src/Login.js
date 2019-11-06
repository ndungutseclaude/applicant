import React from 'react';
import axios from 'axios';

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
        //console.log(this.state)   
    }

    //FORM SUBMITION
    formSubmit=(e)=>{
        e.preventDefault();
        //console.log(this.state)
        axios.post('https://codecatalyst-test.herokuapp.com/api/login',this.state)
        .then((res)=>{
            console.log(res.data.message)
        })
        .catch(err=>{
            console.log("please check your email or password")
        })
        this.props.history.push('/QuestionsList')
        //this.props.history.push('/SignUp')
    }
    render(){
        
        return(
            <div className="ui container" style={{marginTop: '10px'}}>
                <h1> Login Form</h1>
                <form onSubmit={this.formSubmit} className="ui form" style={{marginRight: '30rem', marginLeft: '8rem'}}>
                    <label> Email:</label>
                    <input type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <label> Password: </label>
                    <input type="text"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <button type="submit">SIGN UP</button>
                </form>
                
            </div>
        )
    }
}
export default Login;