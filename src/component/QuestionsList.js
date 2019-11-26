import React from 'react';
import axios from 'axios';
//import './Questionlist.css';
import './question.css';

//import './App.css';
import Footer from './Footer';
import { getJwt } from './utils/jwt';


class QuestionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            questionslist:[],
            answer:'',
            loading: false
             
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
        axios.get('https://codecatalyst-test.herokuapp.com/api/',
        {headers: {Authorization: `Token ${jwt}`}})
        .then(res =>{
            if(res.data.length === 0){
                this.props.history.push('/project')
                //this.props.history.push('/AddUrl')
                //console.log('done')
            }
            
            else if(res.data){
                console.log(res)
                this.setState({questionslist: res.data})
            }
            
        })
        .catch(err =>{
            
            //this.props.history.push('/')
            

            localStorage.removeItem("user-token")
            this.props.history.push('/registrationDone')
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
    this.setState({loading: true})
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
        //this.props.history.push('/AddUrl')
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
                <div className="container">
                        {/* DIV WHICH HOLD HEADER */}
                            <div >
                                
                                    <img src="code_catalyst.svg" alt="not available"/>
                                    <button onClick={this.logoutFunctin} 
                                            style={{float:'right'}}
                                            className="btn">
                                            LOGOUT
                                    </button>
                            </div>

                            <div className=" tops row">
                        <div className=" icons col-sm-3">
                            <div><i className="fab fa-facebook-f"></i></div>
                            <div> <i className="fab fa-twitter"></i></div>
                            <div><i className="fab fa-linkedin-in"></i></div>
                            <div> <i className="fas fa-paper-plane"></i></div>
                        </div>
                        <div className="col-sm-6">
                            <h3 className="title">Code Catalyst </h3>
                            <h3 className="title">Rwanda</h3>
                        </div>
                        <div className=" col-sm-3 ">
                            <div className="sign">
                                <i className=" sticky fas fa-sticky-note"></i>
                                <i className="ba  fas fa-bars"></i>
                                <i className="bar  fas fa-bars"></i>
                                <i className="pencil fas fa-pencil-alt"></i>
                            </div>
                        </div>
                    </div>
                    <div className="middle row">
                        <div className="col-sm-3">
                        </div>
                        <div className="col-sm-9">
                            <small style={{marginBottom: "2rem"}}> lease complete the following questions</small>
                        </div>
                    </div>



{/* DISPLAY QUESTIONS AND POST ANSWERS ONE BY ONE */}
                            <div className="table row">
                                <small> <b>You still have {qArray.length} questions, answer all questions and click on NEXT BUTTON to see the project </b></small>
                                <div className="col-sm-3">
                                </div>
                                <div className="col-sm-6">
                                <form onSubmit={this.answerSubmition} className="ui form">
                                    <h2>{qArray[qID]}</h2> 
                                    <input type="text" required 
                                        name='answer' 
                                        value={this.state.answer} 
                                        onChange={this.handleInputChange} 
                                    /> 
                        
                                    <button className="btn">
                                        { this.state.loading && <i className="fas fa-spinner fa-spin"></i>}
                                        SUBMIT ANSWER
                                    </button>
                                    <button className="ui green button" style={{marginTop: '2rem'}} 
                                        onClick={this.goToProject}
                                    >NEXT</button>
                                </form> 
                                </div> 
                            </div>
                            
                                    
                </div>
                        
                {/* FOOTER     */}
                <Footer/>

            </div>
        )



    }
}
}




export default QuestionsList;

