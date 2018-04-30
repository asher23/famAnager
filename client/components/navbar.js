import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import './navbar.css'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className='zee'>
    <nav className='navbar-non navbar navbar-expand-lg'>
    <a className="navbar-brand navtags" href="#">Fa-Manager</a>
      {/* <p style={{fontSize: '30px'}} id='nav-header'>Fa-Manager</p> */}
      {isLoggedIn ? (
        <div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse">
            <ul className='navbar-nav'>
              <li className="nav-item ">
                <a className="nav-link navtags" href="/home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link navtags" href="/familyHome">Family</a>
              </li>
              <li className="nav-item">
                <a className='nav-link navtags' href="#" onClick={handleClick}>
                  Logout
                </a>            
              </li>
            </ul>
          </div>
          
          {/* The navbar will show these links after you log in */}
          {/* <Link className='navtags nav=item' to="/home">Home</Link>
          <Link className='navtags nav-item' to="/familyHome">Family</Link>
          <a className='navtags' href="#" onClick={handleClick}>
            Logout
          </a> */}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link className='navtags nav-item' to="/login">Login</Link>
          <Link className='navtags nav-item' to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
