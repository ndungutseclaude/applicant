import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationDone=()=>{
    return(
        <div className="ui container">
            <h1>you have done your registration please, wait we will call you!!!</h1>
            <Link to="/"> back to Home</Link>
        </div>
    )
}
export default RegistrationDone;