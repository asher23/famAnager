import axios from 'axios'
import history from '../history'
import {me} from './user'

/**
 * ACTION TYPES
 */
const SET_TASKS = 'SET_TASKS'

/**
 * INITIAL STATE
 */
const defaultTasks = []

/**
 * ACTION CREATORS
 */
const setTasks = tasks => ({type: SET_TASKS, tasks})

/**
 * THUNK CREATORS 1106CAFE
 */

export const createTask = (information) =>  async (dispatch) => {
    try {
        const res = await axios.post('/api/tasks', information)
        dispatch(setTasks(res.data))
        await dispatch(me())
        // await dispatch(getYourFamily())
    } catch (err) {
        console.error(err)
    }
}

export const getTasks = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/tasks')
        dispatch(setTasks(res.data))
        await (dispatch(me()))
    } catch (err) {
        console.error(err)
    }
}


/**
 * REDUCER
 */

export default function (state = defaultTasks, action) {
  switch (action.type) {
    case SET_TASKS:
      return action.tasks
    default:
      return state
  }
}
