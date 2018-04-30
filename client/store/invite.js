import axios from 'axios'
import history from '../history'
import {me} from './user'

/**
 * ACTION TYPES
 */
const SET_INVITE = 'SET_INVITE'

/**
 * INITIAL STATE
 */
const defaultInvite= {}

/**
 * ACTION CREATORS
 */
export const setInvite= invite => ({type: SET_INVITE, invite})

/**
 * THUNK CREATORS 1106CAFE
 */


export const getInvite = (inviteCode) => async (dispatch) => {
    try {
        const res = await axios.get(`/auth/email/getInvite/${inviteCode}`)
        dispatch(setInvite(res.data))
    } catch (err) {
        console.error(err)
    }
}

export const acceptOrDecline = (inviteCode, response) => async (dispatch) => {
    try {
        const res = await axios.post('/auth/email/respondToInvite', {inviteCode, response})
    } catch (err) {
        console.error(err)
    }
}

export const inviteToFamily =  (email) => async (dispatch, getState) => {
    try {
        const res = await axios.post('/auth/email/sendInvite', {from: getState().user.email, to: email, family: getState().family.name, familyId: getState().family.id})            
        if (res.data === 'success!') {
            dispatch(setInvite('sent!!!'))
        }
    } catch (err) {
        dispatch(setInvite(err))
        console.error(err)
    }
}



/**
 * REDUCER
 */

export default function (state = defaultInvite, action) {
  switch (action.type) {
    case SET_INVITE:
      return action.invite
    default:
      return state
  }
}
