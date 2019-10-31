import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {getQuestions} from './action/questionAction';
import './App.css';
import Header from './Header';
import Footer from './Footer';





class App extends React.Component{
    componentDidMount(){
        this.props.getQuestions();
    }
    render(){
    const {questions} = this.props;
    const devideArray = this.props.questions.length/2;
    //console.log(this.props.questions.length/2)
    console.log(devideArray)

    
        return (
            <div>
            <div className="container"><Header/></div>
            <div className="container" style={{ paddingRight:'10rem', paddingLeft:'5rem'}}>
            
                <div className="row">
                    <div className="col">
                        {
                            this.props.questions.map ? this.props.questions.slice(0,devideArray).map((question)=>{
                                return (
                                    <div key={question.id}>
                                        <lable>{question.description}</lable>
                                        <input type="text" className="form-control" id="inputStyling"/>
                                    </div>
                                    
                                )
                            })
                            :null
                        }
                    </div>
                    <div className="col">
                        {
                            this.props.questions.map? this.props.questions.slice(devideArray).map((question)=>{
                                return (
                                    <div key={question.id}>
                                        <lable>{question.description}</lable>
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
            <Footer/>
            </div>
        )
    }
}

App.propTypes={
    questions: PropTypes.array.isRequired,
    getQuestions: PropTypes.func.isRequired
}
const mapStateToProps =(state)=>{
    return {
        questions: state.question
    }
}
export default  connect(mapStateToProps,{getQuestions}) (App);