import React from 'react';
import axios from 'axios';

import './App.css';
import Footer from './Footer';
import { getJwt } from './utils/jwt';


class QuestionsList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            questionslist:[],
            description:''
             
            }
    }

    componentDidMount(){ 
        const jwt = getJwt()
        //console.log(jwt);

        if(!jwt){
            console.log('no token found');
            this.props.history.push('/')
        }
        //https://codecatalyst-test.herokuapp.com/ 
        
        axios.get('https://codecatalyst-test.herokuapp.com/api/',
        {headers: {Authorization: `Token ${jwt}`}})
        .then(res =>{
            this.setState({questionslist: res.data})
            //console.log(this.state.questionslist)
            //console.log(res.data.length);
        })
        .catch(err =>{
            localStorage.removeItem("user-token")
            this.props.history.push('/')
        })
    }
//FUNCTION TO LOGOUT
    logoutFunctin=(e)=>{
        localStorage.removeItem('user-token')
        this.props.history.push('/')
        console.log('you are loggedOut')
    }
//ONCHANGE HANDLER
handleInputChange=(e)=>{
    this.setState({
        [e.target.name]: e.target.value
    })
    console.log(this.state.description)
}
    render(){
    const devideArray = this.state.questionslist.length/2;
    //console.log(devideArray)
    if(this.state.questionslist){
        return (
            <div>
                        {/* DIV WHICH HOLD HEADER */}
                            <div>
                                
                                    <img src="code_catalyst.svg" alt="not available"/>
                                    <button onClick={this.logoutFunctin} 
                                            style={{float:'right'}}
                                            className="btn">
                                            LOGOUT
                                    </button>
                                
                                
                            </div>
                        {/* DIV WHICH HOLDS THE QUESTIONS AND ANSWERS */}
                            <div className="container" style={{ paddingRight:'10rem', paddingLeft:'5rem'}}>
                                
                                <div className="row">
                                    <div className="col">
                                        {
                                            this.state.questionslist.map ? this.state.questionslist.slice(0,devideArray).map((question)=>{
                                                return (
                                                    <div key={question.id}>
                                                        <p>{question.description}</p>
                                                        
                                                        <input type="text" className="form-control" id="inputStyling"
                                                            name="description"
                                                            value={this.state.description}
                                                            onChange={this.handleInputChange}
                                                        />
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
                                                        
                                                        <input type="text" className="form-control" id="inputStyling"
                                                            name="description"
                                                            value={this.state.description}
                                                            onChange={this.handleInputChange}
                                                        />
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
                        {/* FOOTER     */}
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