import React, { Component} from 'react';
import './newTaskForm.css'

export default class NewTaskForm extends Component {
    constructor(props) {
        super(props)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        var task = {
            description: e.target.description.value,
            payment: e.target.payment.value,
            dueDate: e.target.dueDate.value,
            assignee: e.target.assignee.value,
            familyId: this.props.family.id,
            userId: this.props.user.id
        }
        this.props.createTask(task)
    }

    render() {
        const { family, user } = this.props
        const { users} = family
        if (!users) return null;
        return (
            <form className='form-drop' onSubmit={this.handleSubmit}>
                    <label>Description</label>
                    <input required className='form-control' name="description" type="text" />
                <div className='form-group'>
                    <label>Payment</label>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                        </div>
                        <input required className='form-control' name="payment" type='number' step="0.01"/>
                    </div>
                </div>
                <div className='form-group'>
                    <label>Due Date</label>
                    <input required className='form-control' name='dueDate' id="date" type="datetime-local"/>
                </div> 
                <div className='form-group'>
                    <label>Assign</label>
                    <select required className='form-control' name='assignee' >
                        <option value={'open'}>Open</option>       
                        {
                            users.map((user, i) => {
                                return <option value={user.id} key={i}>{user.firstName + ' ' + user.lastName}</option>       
                            })
                        }
                    </select>

                </div>     
                <button type="submit" className="btn btn-dark">Create</button>
            </form>
        )
    }
}