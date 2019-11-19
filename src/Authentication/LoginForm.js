import React,{Component} from 'react';
import superagent from 'superagent';

//import {Redirect } from 'react-router-dom';
export default class LoginFom extends Component{
    constructor(){
        super();
        this.state={
            username:"",
            password:"",
            authenticate: false
        }
    }
    handleChangeUsername(event){
        this.setState({username: event.target.value})
      
    }
    handleChangepassword(event){
        this.setState({password: event.target.value})
    }
    submitform(event){
        event.preventDefault();
        superagent
        .post(' https://codecatalyst-test.herokuapp.com/api/my_api/token')
        .send({username: this.state.username,password: this.state.password})
        .end((err,res)=>{
           if(err) {
               this.setState({errormessage: "Authentication Failed"});
            }
        //Save the token in localStorage
        localStorage.setItem('token',res.body.token);
        console.log(res.body.token)
        //get the token in localStorage ==>localStorage.getItem()
       })
    }
    isauthenticated(){
       const token = localStorage.getItem('token');
          return token && token.length >10;   
    }
    render(){
      //  const isalreadyauthanticated= this.isauthenticated();
        return (
               <div>
                 {/* { isalreadyauthanticated ?<Redirect to={{pathname:'/loginauthentication'}}/>:( */}
                   <form onSubmit={this.submitform.bind(this)}>
                      <input className="form-control" 
                     type="text" 
                    placeholder="User Name"
                    value={this.state.username}
                    onChange={this.handleChangeUsername.bind(this)}
                    /> 
                     <input className="form-control" 
                     type="password" 
                     placeholder="Password"
                      value={this.state.password}
                    onChange={this.handleChangepassword.bind(this)}
                    /> 
                    <button>SUBMIT</button>
                    </form> 
                 {/* )}   */}
               </div>

            
          
        )
    }
}