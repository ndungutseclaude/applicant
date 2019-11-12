import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import QuestionsList from './QuestionsList';
import SignUp from './SignUp';
import Login from './Login';


const App =()=>{
    return (
            <BrowserRouter>
            <Switch>
                <React.Fragment>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/QuestionsList" component={QuestionsList}/>
                    <Route exact path="/SignUp" component={SignUp}/>
                    {/* <Route exact path="/SignUp" component={SignUp}/>
                    <Route exact path="/QuestionsList" component={QuestionsList}/>
                    <Route exact path="/Test" component={Test}/> */}
                </React.Fragment>
            </Switch>
        </BrowserRouter>
    )
}
export default App;