import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const RegistrationDone=()=>{
    return(
        <div>
            <Header/>
            <div className="ui container" style={{ backgroundImage: 'image1.jfif', background: 'black', color: 'gray', margin: '3rem'}}>
                <h1>you have done your registration!! wait we will call you!!!</h1>
                <Link to="/"> back to Home</Link>
                <img className="ui circular image" src="image1.jfif" alt="not found" style={{marginLeft: '20rem'}}></img>
            </div>
            <Footer/>
        </div>
    )
}
export default RegistrationDone;