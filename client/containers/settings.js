import React, { Component} from 'react';
import {connect, } from 'react-redux';
import { AddMemberForm} from '../components'
import {inviteToFamily, getYourFamily, createTask, logout, updateUser, setInvite } from '../store';
import './settings.css'

class Settings extends Component {
    constructor(props) {
        super(props)
    }

    updateUser = (userId, e) => {
        console.log('something ran,', userId)
        this.props.updateUser({role: e.target.value}, userId)
    }

    remove = (userId, e) => {
        var txt;
        if (confirm("Are you sure you want to remove this member?")) {
            this.props.updateUser({familyId: null}, userId)
            setTimeout(()=> {
                location.reload();
            }, 1000)
        } else {
            txt = "You pressed Cancel!";
        }
        console.log('txt',  txt)
        // this.props.updateUser({family: })
    }
    
    render() {
        const {family} = this.props
        const membersJSX =  family.users.map((member, i) => {
            return (
                <div key={member.id} className='setting-member-block row'>
                    <div className='col-md-5'>
                        <h4>{member.firstName} {member.lastName}</h4>
                    </div>
                    <div className='col-md-5'>
                        <select  onChange={this.updateUser.bind(this, member.id)}>
                            <option value='adult' selected={`${member.role === 'adult' ? 'selected' : ''}`}>Adult</option>
                            <option value='child'selected={`${member.role === 'adult' ? '' : 'selected'}`}>Regular</option>
                        </select>
                    </div>
                    <div className='col-md-2'>
                        <button className='btn btn-primary btn-sm remove-btn' onClick={this.remove.bind(this, member.id)} value={member.id}><i className="fas fa-times"></i></button>
                    </div>
                </div>
            )
        })
        return (
            <div className='row settings'>
                <div className='full-width col-md-1'>
                </div>



                <div className='col-md-10'>
                    {membersJSX}
                    <div className='row setting-add-member-form'>
                        <AddMemberForm handleAddition={this.props.inviteToFamily} setInvite={this.props.setInvite} invite={this.props.invite}/>
                    </div>
                </div>



                <div className='full-width col-md-1'>
                </div>                  
            </div>
          
            
        )
    }
}



const mapState = (state) => ({
    family: state.family,
    user: state.user,
    invite:state.invite
})

export default connect(mapState, {inviteToFamily, getYourFamily, createTask, logout, updateUser, setInvite})(Settings)
