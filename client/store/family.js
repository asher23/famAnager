import axios from 'axios'
import history from '../history'
import {me} from './user'

/**
 * ACTION TYPES
 */
const SET_FAMILY = 'SET_FAMILY'

/**
 * INITIAL STATE
 */
const defaultFamily = {}

/**
 * ACTION CREATORS
 */
const setFamily = family => ({type: SET_FAMILY, family})

/**
 * THUNK CREATORS 1106CAFE
 */

export const createFamily =  (familyName, inviteEmail, admin) => async (dispatch, getState) => {
    try {
        const res = await axios.post('/api/families/', {familyName, inviteEmail, admin, userId: getState().user.id})
        dispatch(setFamily(res.data))
        await dispatch(me())
        history.push('/familyHome')
    } catch (err) {
        console.error(err)
    }
}

export const inviteToFamily =  (emailList) => async (dispatch, getState) => {
    try {
        for (var i = 0; i < emailList.length; i ++) {
            const res = await axios.post('/auth/email/sendInvite', {from: getState().user.email, to: emailList[i], family: getState().family.name, familyId: getState().family.id})            
        }
    } catch (err) {
        console.error(err)
    }
}


export const getYourFamily = () => (dispatch) => {
    axios.get('/api/families/mine')
    .then((res) => {
        dispatch(setFamily(res.data))
    })
    .catch(console.error)
}

export const joinFamily = (familyName, userId) => (dispatch) => {
    axios.put('/api/families/add', {familyName, userId})
    .then((res) => {
        dispatch(setFamily(res.data))
        dispatch(me())
    })
    .then((res) => {
        history.push('/family')        
    })
    .catch(console.error)
}


/**
 * REDUCER
 */

export default function (state = defaultFamily, action) {
  switch (action.type) {
    case SET_FAMILY:
      return action.family
    default:
      return state
  }
}
