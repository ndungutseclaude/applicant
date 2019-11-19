import React from 'react';
import axios from 'axios';
import './Questionlist.css';
import { withRouter } from 'react-router-dom';

import './App.css';
import Footer from './Footer';
import { getJwt } from './utils/jwt';


class QuestionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            questionslist:[],
            answer:''
             
        }
        this.goToProject = this.goToProject.bind(this)
    }

    

    componentDidMount(){ 
        const jwt = getJwt()
        //console.log(jwt);

        if (!jwt) {
            console.log('no token found');
            this.props.history.push('/')
        }
        // else if(this.questionsLength === 0){
        //     console.log('you have answered your question go with the project')
        //     this.props.history.push('/project')
        // }
        
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
    if(!jwt){
        console.log('you are not logged in')
        this.props.history.push('/')
    }

    //console.log(this.questionsLength)
    axios.post(`https://codecatalyst-test.herokuapp.com/api/${this.myVariable}`,
    {description: this.state.answer},
    {headers: {Authorization: `Token ${jwt}`}}
    )
    .then(res=>{
        //console.log(res)
        window.location.reload(false)
        this.setState({answer:''})
    })
    .catch(err =>{
        console.log(err)
    })
    //console.log(jwt)
    
}

//FUNCTION WHICH ROUTE TO THE PROJECT PAGE
goToProject(e){
    e.preventDefault()
    if(this.questionsLength === 0){
        this.props.history.push('/project')
    }
    console.log('answer all question')
    window.location.reload(false)
}

    render(){
        
        const q=this.state.questionslist;
// ASSIGNING QUESTIONS INTO A NEW ARRAY CALLED qArray
    let qArray = []
    q.forEach((question)=> qArray.push(question.description));
    this.questionsLength = qArray.length
// ASSINGING QUESTIONS IDs INTO A NEW ARRAY CALLED idArray
    let idArray = []
    q.forEach((question)=>idArray.push(question.id));
    
//VARIABLE TO PASS ID ON THE POST REQUEST
    this.myVariable = idArray[0]
    //console.log(idArray.length)
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

                            <div className=" icon col-sm-3">
                                <div><i className="fab fa-facebook-f"></i></div>
                                <div> <i className="fab fa-twitter"></i></div>
                                <div><i className="fab fa-linkedin-in"></i></div>
                                <div> <i className="fas fa-paper-plane"></i></div>
                            </div>
                            <div className=" col-sm-6 ">
                                <h3 className="title">Code Catalyst </h3>
                                <h3 className="title">Rwanda</h3>
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
                                    <button className="ui green button" style={{marginTop: '2rem'}}
                                        onClick={this.goToProject}
                                    >NEXT</button>
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
                            </div>
                        </div>
                        <div className="middle row">
                            <div className="col-sm-3">

                            </div>
                            <div className="col-sm-9">
                                <small>Please complete the following questions</small>
                            </div>
                        </div>
                    </div>
                    {/* DIV WHICH HOLDS THE QUESTIONS AND ANSWERS */}
//                     <div className="container" >
//                         <div className="qustions row">
//                             <div className="col">
//                                 {
//                                     this.state.questionslist.map ? this.state.questionslist.slice(0, devideArray).map((question) => {
//                                         return (
//                                             <div key={question.id}>
//                                                 <p>{question.description}</p>

//                                                 <input type="text" className="form-control" id="inputStyling"
//                                                     name="description"
//                                                     value={this.state.description}
//                                                     onChange={this.handleInputChange}
//                                                 />
//                                             </div>

//                                         )
//                                     })
//                                         : null
//                                 }
//                             </div>
//                             <div className="col">
//                                 {
//                                     this.state.questionslist.map ? this.state.questionslist.slice(devideArray).map((question) => {
//                                         return (
//                                             <div key={question.id}>
//                                                 <p>{question.description}</p>

//                                                 <input type="text" className="form-control" id="inputStyling"
//                                                     name="description"
//                                                     value={this.state.description}
//                                                     onChange={this.handleInputChange}
//                                                 />
//                                             </div>
//                                         )
//                                     })
//                                         : null
//                                 }
//                             </div>

//                         </div>

//                         <div className="row">
//                             <div className="buttonsStyling">
//                                 <button className="btn1" id="laterbtn">
//                                     save to continiou later
//                                         </button>
//                                 <button className="btn btn-danger" id="nextbtn">
//                                     NEXT
//                                         </button>
//                                     </div>
                
//                                 </div> 
                                
//                             </div> */}
                        
                        {/* FOOTER     */}
                            <Footer/>

            </div>
        )



    }
}





export default QuestionsList;
