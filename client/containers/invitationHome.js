import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getInvite, acceptOrDecline, auth} from '../store'
import {Signup} from '../components'
class InvitationHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showForm: false
        }
    }

    componentWillMount() {
        this.props.getInvite(this.props.match.params.inviteCode)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.acceptOrDecline(this.props.match.params.inviteCode, e.target.response.value)
    }
    handleClick= (e) => {
        this.setState({showForm: !this.state.showForm})
    }

    render() {
        console.log('invite', this.props.invite)
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h3>Hey, it looks like someone invited you to join their family.</h3>
                        <h3>Below you can see the details of your invitation.</h3>
                    </div>
                </div>
                <div className='row'>
                    {this.state.showForm ? null: <div className='col-md-12'>
                        <h3>By clicking the button below you agree to proceed and join the family</h3>
                        <button className='btn btn-dark' onClick={this.handleClick}>Proceed</button>
                    </div>}
                </div>
                {this.state.showForm ? <div className='row'>
                    <Signup handleSubmit={this.props.auth} familyId={this.props.invite.familyId}/>
                </div> : null}
            </div>
        )
    }
}

const mapState = (state) => ({
    invite: state.invite
})

export default connect(mapState, {getInvite, acceptOrDecline, auth})(InvitationHome)