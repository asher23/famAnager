import React, { Component } from 'react';
import {connect} from 'react-redux'
import {createFamily, inviteToFamily} from '../store'
import {AddMemberForm} from '../components'
import './walkthrough.css'

class WalkThrough extends Component {
    constructor(props) {
        super(props)
        this.state = {
            side: '',
            creating: 'creating little',
            joining: 'joining little',
            memberForm: '',
            nameForm: ''            
        }
    }
    
    pickSide = (side) => {
        if (side === 'creating') { 
            this.setState({creating: 'creating full', joining: 'hide'} )
        } else if (side === 'joining') {
            this.setState({joining:  'joining full', creating: 'hide'})
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.createFamily(e.target.familyName.value)
        // this.setState({memberForm: 'center', nameForm: 'left'})
    }
    handleAddition = (emailList) => {
        this.props.inviteToFamily(emailList)
    }

    render() {
        console.log('wlakthrough is rendering ')
        return ( 
            <div className='container-fluid'>
                <div className='row'>
                    <div onClick={() => this.pickSide('creating')} className={this.state.creating}>
                        {this.state.creating !== 'creating full' ? 
                            <h3>If you're creating a new family, click here</h3> :
                            <div className='fam-for' >
                                <form className={`${this.state.nameForm}`} onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Give your family a name. It's recommended to be your family's last name</label>
                                        <input name='familyName' type="text" className="form-control" placeholder="Enter Family Name"/>
                                    </div>
                                    <button id='final-submit' type="submit" className="btn btn-dark">Submit</button>   
                                    <br/>
                                </form>
                                <AddMemberForm handleAddition={this.handleAddition}/>  
                            </div>   
                        }
                    </div>
                    <div onClick={() => this.pickSide('joining')} className={this.state.joining}>
                        <h3>If you're joining an existing family, click here</h3>
                    </div>
                </div>
            </div>
        )
    }
}


const mapState = (state) => ({
    family: state.family
})

export default connect(mapState, {createFamily, inviteToFamily})(WalkThrough)