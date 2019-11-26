import React, { Component } from 'react';
import axios from 'axios';
import { getJwt } from './utils/jwt';

class Project extends Component {
        
      constructor(props){
        super(props);
        this.state={
            detail:'',
          errorMessage:""
        }
        }
       
        componentDidMount(){
    const jwt = getJwt()
    //console.log(jwt);

    if(!jwt){
        console.log('no token found');
        //this.props.history.push('/')
    }
    
    //var link={link:this.state.link}
       
       console.log(jwt)
          axios.get("https://codecatalyst-test.herokuapp.com/api/project",
          {headers: {Authorization: `Token ${jwt}`}})
          .then(res=>{
            this.setState({detail: res.data})
            console.log('successful');
          })
      
          .catch(err =>{
            localStorage.removeItem("user-token")
            console.log('something went wrong')
            this.props.history.push('/')
        })
        }
         
    render() {
        //const{detail}=this.state
        return (
            <div>
                <h1>PROJECT TO WORK ON</h1>
            </div>
        );
    }
}

export default Project;
