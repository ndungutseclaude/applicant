import React, { Component } from 'react'
import './Component.css';

export default class Success extends Component {
    render() {
        return (
            <div class="alert alert-success success" role="alert">
                <p>URLs submitted successfully !!!</p>
</div>
        )
    }
}