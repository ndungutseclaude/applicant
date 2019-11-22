
import React from 'react';
import axios from 'axios';
import './Questionlist.css';
//import { withRouter } from 'react-router-dom';
import './App.css';
import Footer from './Footer';
import { getJwt } from './utils/jwt';
class QuestionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionslist: [],
            answer: ''
        }
        this.goToProject = this.goToProject.bind(this)
    }
    componentDidMount() {
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
            { headers: { Authorization: `Token ${jwt}` } })
            .then(res => {
                this.setState({ questionslist: res.data })
                //console.log(this.state.questionslist)
                //console.log(res.data.length);
            })
            .catch(err => {
                localStorage.removeItem("user-token")
                this.props.history.push('/')
            })
    }
    //FUNCTION TO LOGOUT
    logoutFunctin = (e) => {
        localStorage.removeItem('user-token')
        this.props.history.push('/')
        console.log('you are loggedOut')
    }
    //ONCHANGE HANDLER
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        //console.log(this.state.answer)
    }
    //ANSWER SUBMITION
    answerSubmition = (e) => {
        e.preventDefault()
        const jwt = getJwt();
        if (!jwt) {
            console.log('you are not logged in')
            this.props.history.push('/')
        }
        //console.log(this.questionsLength)
        axios.post(`https://codecatalyst-test.herokuapp.com/api/${this.myVariable}`,
            { description: this.state.answer },
            { headers: { Authorization: `Token ${jwt}` } }
        )
            .then(res => {
                //console.log(res)
                window.location.reload(false)
                this.setState({ answer: '' })
            })
            .catch(err => {
                console.log(err)
            })
        //console.log(jwt)
    }
    //FUNCTION WHICH ROUTE TO THE PROJECT PAGE
    goToProject(e) {
        e.preventDefault()
        if (this.questionsLength === 0) {
            this.props.history.push('/AddUrl')
        }
        console.log('answer all question')
        window.location.reload(false)
    }
    render() {
        const q = this.state.questionslist;
        // ASSIGNING QUESTIONS INTO A NEW ARRAY CALLED qArray
        let qArray = []
        q.forEach((question) => qArray.push(question.description));
        this.questionsLength = qArray.length
        // ASSINGING QUESTIONS IDs INTO A NEW ARRAY CALLED idArray
        let idArray = []
        q.forEach((question) => idArray.push(question.id));
        //VARIABLE TO PASS ID ON THE POST REQUEST
        this.myVariable = idArray[0]
        //console.log(idArray.length)
        let qID = 0
        if (this.state.questionslist) {
            return (
                <div>
                <div className="container">
                    {/* DIV WHICH HOLD HEADER */}
                    <nav>
                        <div className="row">
                            <div className="col-sm-3">
                                <img src="code_catalyst.svg" alt="not available" />
                            </div>
                            <div className="col-sm-6" />
                            <div className=" logout col-sm-3">
                                <p>LOGOUT</p>
                            </div>
                        </div>
                    </nav>


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
                            <small>Please complete the following questions</small>
                        </div>
                    </div>
                    
                     {/* DISPLAY QUESTIONS AND POST ANSWERS ONE BY ONE  */}
                    <div className="table row">
                        <small className="question"> You have {qArray.length} questions to Answer</small>
                        <div className="col-sm-2">
                        </div>
                        <div className="col-sm-5">
                        <small className="key_values">{qArray[qID]}</small>
                        <input 
                         id="texting"
                        placeholder="Write Your text here"
                        name='answer'
                        value={this.state.answer}
                        onChange={this.handleInputChange}
                        onClick={this.answerSubmition} 
                        />
                            
                        </div>
                    </div>

                    
                    <div className="set row">
            <div className=" save col-sm-6">
                  SAVE TO CONTINUE LATER
                 <div className="line"></div>
             </div>
    
           <div className="col-sm-6">
               <button  type="button" class="btn btn-danger"  onClick={this.goToProject}> NEXT</button>
           </div>
       </div>
       </div>
                    {/* FOOTER     */}
                    <div className="footer">
                   <Footer/>
                    </div>
                </div>
                
            )
        }
    }
}
export default QuestionsList;