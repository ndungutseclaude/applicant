import React from 'react';
import axios from 'axios';
import './Questionlist.css';

import './App.css';
import Footer from './Footer';
import { getJwt } from './utils/jwt';


class QuestionsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionslist: [],
            description: ''

        }
    }

    componentDidMount() {
        const jwt = getJwt()
     

        if (!jwt) {
            console.log('no token found');
            this.props.history.push('/')
        }
        //https://codecatalyst-test.herokuapp.com/ 

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
        console.log(this.state.description)
    }
    render() {
        const devideArray = this.state.questionslist.length / 2;
        //console.log(devideArray)
        if (this.state.questionslist) {
            return (
                <div>


                    <div>



                        <nav>
                            <div className="row">
                                <div className="col-sm-3 logo">
                                    <img src="code_catalyst.svg" alt="not available" />
                                </div>
                                <div className="col-sm-6" />
                                <div className=" logout col-sm-3">
                                    <button onClick={this.logoutFunctin}
                                        style={{ float: 'right' }}
                                        className="btn">
                                        LOGOUT
                                    </button>
                                </div>
                            </div>
                        </nav>

                        <div className=" tops row">
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
                    </div>
                    {/* DIV WHICH HOLDS THE QUESTIONS AND ANSWERS */}
                    <div className="container" >
                        <div className="qustions row">
                            <div className="col">
                                {
                                    this.state.questionslist.map ? this.state.questionslist.slice(0, devideArray).map((question) => {
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
                                        : null
                                }
                            </div>
                            <div className="col">
                                {
                                    this.state.questionslist.map ? this.state.questionslist.slice(devideArray).map((question) => {
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
                                        : null
                                }
                            </div>

                        </div>

                        <div className="row">
                            <div className="buttonsStyling">
                                <button className="btn1" id="laterbtn">
                                    save to continiou later
                                        </button>
                                <button className="btn btn-danger" id="nextbtn">
                                    NEXT
                                        </button>
                            </div>

                        </div>


                    </div>
                    {/* FOOTER     */}
                    <div className="footer">
                        <Footer />
                    </div>
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





export default QuestionsList;