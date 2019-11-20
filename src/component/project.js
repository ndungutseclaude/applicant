import React from 'react';

class Project extends React.Component{
    logoutFunction=(e)=>{

        localStorage.removeItem('user-token')
        this.props.history.push('/')
        console.log('you are loggedOut')
    }
    render(){
        return (
            <div style={{padding: '10rem'}}> 
                <h1> PROJECT PAGE</h1>
                <hr/>
                <h3 style={{fontFamily: 'Time new roman'}}>
                    This student will use this page to see the project, <br/>
                    and submit the url his github repo and heroku link where he deployed his project
                </h3>
                <button onClick={this.logoutFunction} className="btn" style={{margin: '3rem', color:'green', fontFamily: 'time new roman'}}>TYPE TO LOGOUT</button>
                
            </div>
        )
    }
}
export default Project;