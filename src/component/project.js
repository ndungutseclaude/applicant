import React from 'react'
import { Link } from 'react-router-dom'

class Project extends React.Component{
    render(){
        return (
            <div style={{padding: '10rem'}}> 
                <h1> PROJECT PAGE</h1>
                <hr/>
                <h3 style={{fontFamily: 'Time new roman'}}>
                    This student will use this page to see the project, <br/>
                    and submit the url his github repo and heroku link where he deployed his project
                </h3>
                <Link to='/QuestionsList' style={{margin: '3rem'}}>BACK TO QUESTIONS PAGE FOR YOU TO LOGOUT</Link>
                
            </div>
        )
    }
}
export default Project;