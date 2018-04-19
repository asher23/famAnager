import React, {Component} from 'react'
import { BlockList, NewTaskForm } from '../components';
import {connect, } from 'react-redux';
import {inviteToFamily, getYourFamily, createTask } from '../store';
import './taskCalendar.css'
import $ from 'jquery'

class TaskCalendar extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        $(function() {
            
                // page is now ready, initialize the calendar...
            
                $('#calendar').fullCalendar({
                // put your options and callbacks here
                })
            
        });
    }

    render() {
        const { family, user } = this.props
        return (
            <div className='calendar-container'>
                <div id='calendar'>
                </div>
            </div>
        )
    }
}

const mapState = (state) => ({
    family: state.family,
    user: state.user
})

export default connect(mapState, {inviteToFamily, getYourFamily, createTask})(TaskCalendar)







