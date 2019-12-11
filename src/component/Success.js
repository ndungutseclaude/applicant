import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Success extends Component {
    render() {
        return (
            <div className="alert alert-success success" role="alert">
                <p>URLs submitted successfully !!!</p>
                <Link to="/"> Go Back To Home</Link>
            </div>
        )
    }
}
