import React, {Component} from 'react'
import { BlockList, NewTaskForm } from '../components';
import {connect, } from 'react-redux';
import TaskCalendar from './taskCalendar';
import {inviteToFamily, getYourFamily, createTask } from '../store';
import './familyHome.css'

class FamilyHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
            member: this.props.user,
            view: 'main'
        }
    }

    componentDidMount() {
        this.props.getYourFamily()
    }

    setViewTo = (member) => {
        this.setState({member})
    }
    render() {
        const { family, user } = this.props
        return (
            <div className='container-fluid family-home'>
                <div className='row'>
                    <div className='family-home-sidebar col-md-3'>
                        <BlockList setViewTo={this.setViewTo} handleAddition={this.props.inviteToFamily} main={user} members={family.users}/>
                    </div>
                    <div className='family-home-main col-md-9'>   
                        <div className='switch row'>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button onClick={() => this.setState({view: 'main'})}type="button" className="btn btn-success">Main</button>
                                <button type="button" className="btn btn-success">Middle</button>
                                <button onClick={() => this.setState({view: 'calendar'})} type="button" className="btn btn-success">Calendar</button>
                            </div>                        
                        </div>

                        {this.state.view === 'calendar' ? 
                            <div className='row'>
                                <TaskCalendar/>
                            </div>
                        :
                        <div>
                            <div className='row'>
                                {user.role === 'adult' ? <h4>You are an adult so you have extra settings</h4> : null}
                                <h4>{this.state.member.email}</h4>
                                <h4>{this.state.member.firstName}</h4>
                                <h4>{this.state.member.lastName}</h4>
                            </div>
                            <div className='row'>
                                <h5>Create a task or a chore for other family members to do</h5>
                            </div>
                            <div className='row'>
                                <NewTaskForm user={user} createTask={this.props.createTask} family={family}/>
                            </div>
                        </div>
                        }
                    </div>
                    
                </div>
            </div>
        )
    }
}

const mapState = (state) => ({
    family: state.family,
    user: state.user
})

export default connect(mapState, {inviteToFamily, getYourFamily, createTask})(FamilyHome)