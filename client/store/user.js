import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

export const auth = (info, method) =>
  dispatch =>
    axios.post(`/auth/${method}`,  info)
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/familyHome')
      }, authError => { // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      })
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

// export const signup = (info) => async (dispatch) => {
//   try {
    
//   } catch (err) {

//   }
//   const res = await axios.post('/auth/signup', info)
//   dispatch(getUser(res.data))
//   history.push('/familyHome')


export const updateUser = (updatedInfo, userId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/users/${userId}`, updatedInfo )
  } catch (err) {
      console.error(err)
  }
}
export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
