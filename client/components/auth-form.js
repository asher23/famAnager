import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div className='form-group'>
          <label>Email</label>
          <input required className='form-control' name="email" type="text" />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input required className='form-control'  name="password" type="password" />
        </div>
        <div>
          <button className='btn btn-dark' type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

export class Signup extends Component  {
  constructor(props) {
    super(props)
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const userInfo = {
        email: e.target.email.value,
        password: e.target.password.value,
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        familyId: this.props.familyId
    }
    this.props.handleSubmit(userInfo, 'signup')
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}> 
          <div className="form-group">
              <label>Email address</label>
              <input required  name="email"type="email" className="form-control" placeholder="Enter email"/>
          </div>
          <div className="form-group">
              <label>Password</label>
              <input required name="password" type="password" className="form-control" placeholder="Password"/>
          </div>
          <div className="form-group">
              <label >First Name</label>
              <input required name="firstName" type='text' className="form-control" placeholder="First Name"/>
          </div>
          <div className="form-group">
              <label >Last Name</label>
              <input required name="lastName" type='text' className="form-control" placeholder="Last Name"/>
          </div>
          <button type="submit" className="btn btn-dark">Submit</button>
        </form>
      </div>
    )
  }
}

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth({email, password}, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
