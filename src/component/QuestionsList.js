import React from 'react';
import axios from 'axios';

import './App.css';
import Header from './Header';
import Footer from './Footer';
import { getJwt } from './utils/jwt';


class QuestionsList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            questionslist:[]
            
        }
    }

    
    componentDidMount(){ 
        const jwt = getJwt()
        //console.log(jwt);

        if(!jwt){
            console.log('no token found');
            this.props.history.push('/')
        }

        axios.get('https://codecatalyst-test.herokuapp.com/api/',
        {headers: {Authorization: `Token ${jwt}`}})
        .then(res =>{
            this.setState({questionslist: res.data})
            //console.log(this.state.questionslist)
        })
        .catch(err =>{
            localStorage.removeItem("user-token")
            this.props.history.push('/')
        })
    }

    logoutFunctin=(e)=>{
        localStorage.removeItem('user-token')
        this.props.history.push('/')
        console.log('you are loggedOut')
    }
    render(){
    const devideArray = this.state.questionslist.length/2;
    //console.log(devideArray)
    if(this.state.questionslist){
        return (
            <div>
                            <Header/>
                            
                            <div className="container" style={{ paddingRight:'10rem', paddingLeft:'5rem'}}>
                                
                                <div className="row">
                                    <div className="col">
                                        {
                                            this.state.questionslist.map ? this.state.questionslist.slice(0,devideArray).map((question)=>{
                                                return (
                                                    <div key={question.id}>
                                                        <p>{question.description}</p>
                                                        <input type="text" className="form-control" id="inputStyling"/>
                                                    </div>
                                                    
                                                )
                                            })
                                            :null
                                        }
                                    </div>
                                    <div className="col">
                                        {
                                            this.state.questionslist.map? this.state.questionslist.slice(devideArray).map((question)=>{
                                                return (
                                                    <div key={question.id}>
                                                        <p>{question.description}</p>
                                                        <input type="text" className="form-control" id="inputStyling"/>
                                                    </div>
                                                )
                                            })
                                            :null
                                        }
                                    </div>
                
                                </div>
                                
                                <div className="row">
                                    <div className="buttonsStyling">
                                    <button className="btn" id="laterbtn">
                                            save to continiou later
                                        </button>
                                        <button className="btn btn-danger" id="nextbtn">
                                            NEXT
                                        </button>
                                    </div>
                
                                </div> 
                                
                            </div>
                            <button onClick={this.logoutFunctin} className="ui button">
                                <p style={{float:'right'}}>LOGOUT</p>
                            </button>
                            <Footer/>
            </div>
        )
    }

    return (
        <div>
            <div> Loading ...</div>
        </div>
    )
    

     
    }
}





export default  QuestionsList;