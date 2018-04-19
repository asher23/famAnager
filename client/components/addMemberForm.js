import React, { Component} from 'react';
import './addMemberForm.css';


export default class addMemberForm extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            count: 1
        }
    }

    renderForms = () => {
        var memberInputs = [];
        for (var i = 0; i < this.state.count;i++) {
            memberInputs.push(<input id={i} key={i} name={`inviteEmail${i}`} type="email" className="form-control member-form" placeholder="What's their email?"/>)
        }
        return memberInputs;
    }

    handleSubmit = (e) => {
        e.preventDefault()
        var emailList = [];
        for (var i = 0; i < this.state.count; i++) {
            var ele = e.target[`inviteEmail${i}`].value
            emailList.push(ele)
        }
        this.props.handleAddition(emailList)
    }
    handleAddition = () => {
        var count = this.state.count + 1
        this.setState({count})
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        {this.renderForms()}
                    </div>
                    {!this.props.onlyOne && (this.state.count < 5) ? 
                        <button onClick={ this.handleAddition }className='btn' type='button'>Add Another </button>
                        : null
                    }
                    <br/>
                    <button className='btn' type='submit'>Send Invitations </button>
                </form>
            </div>
        )
    }
}