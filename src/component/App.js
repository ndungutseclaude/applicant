import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import QuestionsList from './QuestionsList';
import SignUp from './SignUp';
import Login from './Login';
import Project from './project';
import RegistrationDone from './registrationDone';
import AddUrl from './AddUrl';
import Success from './Success';


const App =()=>{
    return (
            <BrowserRouter>
            <Switch>
                <React.Fragment>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/QuestionsList" component={QuestionsList}/>
                    <Route exact path="/SignUp" component={SignUp}/>
                    <Route exact path="/project" component={Project}/>
                    <Route exact path="/registrationDone" component={RegistrationDone}/>
                    <Route exact path="/AddUrl" component={AddUrl}/>
                    <Route exact path="./Success" component={Success}/>
                    {/* <Route exact path="/SignUp" component={SignUp}/>
                    <Route exact path="/QuestionsList" component={QuestionsList}/>
                    <Route exact path="/Test" component={Test}/> */}
                </React.Fragment>
            </Switch>
        </BrowserRouter>
    )
}
export default App;