import React, { Component} from 'react';
import './addMemberForm.css';


export default class addMemberForm extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            count: 1,
            loading: false,
            inviteStatus: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({inviteStatus: nextProps.invite})
        nextProps.invite === 'sent!!!' ? this.setState({loading: false}) : null;
        setTimeout(() => {
            this.props.setInvite('');                    
            this.setState({inviteStatus: ''})
        }, 1000)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({loading: true})
        this.props.handleAddition(e.target.inviteEmail.value)
    }

    render() {
        return (
            <div className='add-member-form'>
                <form onSubmit={this.handleSubmit}>
                    <div className='add-text'> 
                            <h3> Add a member to your family </h3>
                    </div>
                    <div className="form-group">
                        <input name='inviteEmail' type="email" className="form-control member-form" placeholder="What's their email?"/>
                    </div>
                    {this.state.loading ? <h3><i className="fas fa-spinner"></i></h3> :
                    <button className='btn btn-dark' type='submit'>Send Invitations </button>
                    }
                    <h3>{this.state.inviteStatus}</h3>
                </form>
            </div>
        )
    }
}