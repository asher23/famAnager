import React, {Component} from 'react'
import { BlockList, NewTaskForm, TaskList } from '../components';
import {connect, } from 'react-redux';
import TaskCalendar from './taskCalendar';
import {inviteToFamily, getYourFamily, createTask, logout, getTasks } from '../store';
import './familyHome.css'
import Settings from './settings'

class FamilyHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            member: this.props.user,
            view: 'main',
            openForm: false,
            openList: false
        }
    }

    componentDidMount() {
        this.props.getYourFamily()
        this.props.getTasks()
    }
    setViewTo = (member) => {
        this.setState({member})
    }
    renderView () {
        const { view } = this.state
        const { family, user, tasks } = this.props        
        if (view === 'calendar') {
            return (
                <div className='row'>
                    <TaskCalendar/>
                </div>
            )
        } else if (view === 'settings') {
            return <Settings/>
        } else if (view === 'main' ){
            return (
                <div className='row'>
                    <div className='full-width col-md-1'>
                    </div>

                    <div className='col-md-10'>
                        <div className='family-home-task-form'>
                            <div className='task-form-description' onClick={() => this.setState({openForm: !this.state.openForm})}>
                                <h5>Create a task or a chore for family members to do</h5><br/>
                            </div>
                            <div className={`${this.state.openForm ? 'show-task-form' : 'hide-task-form' } `}>
                                <NewTaskForm user={user} createTask={this.props.createTask} family={family}/>
                            </div>
                        </div>
                        <div className='task-list'>
                            <div className='task-form-description' onClick={() => this.setState({open: !this.state.openList})}>
                                <h5>View all your tasks</h5><br/>
                            </div>
                            <div className={`${this.state.openList ? 'show-task-form' : 'hide-task-form' } `}>
                                <TaskList tasks={this.props.tasks}/>
                            </div>
                        </div>

                    </div>

                    <div className='full-width col-md-1'>
                    </div>
                </div>
            )
        }
    }
    render() {
        const { family, user, tasks } = this.props
        return (
            <div className='container-fluid family-home'>
                <div className='row'>
                    <div className='family-home-sidebar col-md-3'>
                        <div className='switch row'>
                            <div className='col-md-3'>
                                    <button onClick={() => this.setState({view: 'main'})}type="button" className="btn btn-link btn-sm"><i className="fas fa-home" aria-hidden="true"></i><br/>Home</button>
                            </div>   
                            <div className='col-md-3'>
                                    <button onClick={() => this.setState({view: 'calendar'})} type="button" className="btn btn-link  btn-sm"><i className="fas fa-calendar-alt" aria-hidden="true"></i><br/>Calendar</button>
                            </div>
                            <div className='col-md-3'>
                                    <button className='btn btn-link  btn-sm' onClick={() => this.props.logout()}><i className="fas fa-sign-out-alt"></i><br/>Sign Out</button>
                            </div>
                            <div className='col-md-3'>
                                <button onClick={() => this.setState({view: 'settings'})} type="button" className="btn btn-link  btn-sm"><i className="fas fa-cog"></i><br/>Settings</button>
                            </div>           
                        </div>
                        <BlockList setViewTo={this.setViewTo} handleAddition={this.props.inviteToFamily} main={user} members={family.users}/>
                    </div>
                    <div className='family-home-main col-md-9'>   
                        {this.renderView()}
                    </div>                
                </div>
            </div>
        )
    }
}

const mapState = (state) => ({
    family: state.family,
    user: state.user,

})

export default connect(mapState, {inviteToFamily, getTasks,getYourFamily, createTask, logout})(FamilyHome)



{/* <div onClick={this.switch}className='row add-member-div'>
<h4 className='center-text'>Add a member to your family</h4>
</div>
<div className={`row ${this.state.hide ? 'hide-this' : 'show-this'}`}>
<AddMemberForm handleAddition={handleAddition}/>
</div> */}