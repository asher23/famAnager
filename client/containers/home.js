import React, { Component } from 'react'
import {connect } from 'react-redux';
import { Login, Signup, } from '../components'
import {auth } from '../store'
import './home.css'

class Home extends Component {
    render() {
        return (
            <div className='home container-fluid'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='login-home authBlock'>
                            <h2>Login</h2>
                            <Login/>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='signup-home authBlock'>
                            <h2>Signup</h2>
                            <Signup handleSubmit={this.props.auth}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (state) => ({

})

export default connect(mapState, {auth})(Home)