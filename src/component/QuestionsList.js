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
            answer:''
             
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
    //console.log(this.state.answer)
}

//ANSWER SUBMITION
answerSubmition=(e)=>{
    e.preventDefault()
    const jwt = getJwt();

    //console.log(this.myVariable)
    axios.post(`https://codecatalyst-test.herokuapp.com/api/${this.myVariable}`,
    {description: this.state.answer},
    {headers: {Authorization: `Token ${jwt}`}}
    )
    .then(res=>{
        console.log(res)
        this.props.history.push('/QuestionsList')
        this.setState({answer:''})
    })
    .catch(err =>{
        console.log(err)
    })
    //console.log(jwt)
}


    render(){
        
    console.log(this.state.questionslist)
    const q=this.state.questionslist;
// ASSIGNING QUESTIONS INTO A NEW ARRAY CALLED qArray
    let qArray = []
    q.forEach((question)=> qArray.push(question.description));

// ASSINGING QUESTIONS IDs INTO A NEW ARRAY CALLED idArray
    let idArray = []
    q.forEach((question)=>idArray.push(question.id));
    
//VARIABLE TO PASS ID ON THE POST REQUEST
    this.myVariable = idArray[0]
    console.log(idArray.length)
    let qID = 0
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
{/* TESTING POST OF QUESTION */}
                            <div>
                                <h1> You have {qArray.length} questions to Answer</h1>
                                <form onSubmit={this.answerSubmition} className="ui form">
                                    <label>{qArray[qID]}</label> 
                                    <input type="text" required 
                                        name='answer' 
                                        value={this.state.answer} 
                                        onChange={this.handleInputChange} 
                                    /> 
                                    <button className="btn ">SUBMIT ANSWER</button>
                                </form>
                            
                            
                                        
                                
                            </div>

                        {/* DIV WHICH HOLDS THE QUESTIONS AND ANSWERS  */}
                             {/* <div className="container" style={{ paddingRight:'10rem', paddingLeft:'5rem'}}>
                                
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
                                
                            </div> */}
                        
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