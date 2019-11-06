import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store';
import QuestionsList from './QuestionsList';
import SignUp from './SignUp';
import Login from './Login';
import Test from './test';

const App =()=>{
    return (
        <Provider store={store}>
            <BrowserRouter>
            <Switch>
                <div>
                    <Route exact path="/" component={SignUp} />
                    <Route exact path="/Login" component={Login}/>
                    <Route exact path="/QuestionsList" component={QuestionsList}/>
                    <Route exact path="/Test" component={Test}/>
                </div>
            </Switch>
        </BrowserRouter>
        </Provider>
    )
}
export default App;