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
            nameForm: '' ,
            remove: '',
            expand: '',
            bubbleClicked: false ,
            opacityChange: ''
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
    }
    handleAddition = (emailList) => {
        this.props.inviteToFamily(emailList)
    }

    expand = () => {
        
    }

    renderNewStuff() {
        setTimeout(() => {
            this.setState({opacityChange:'opacity-change'})
        }, 1000)
        return (
            <div className={`container-fluid  `}>
                <div className='row'>
                    <form onSubmit={this.handleSubmit}className={`creating-form ${this.state.opacityChange}`}>
                        <div className='form-group'>
                            <h3 style={{paddingBottom: '30px'}}>Name Your Family.</h3>
                            <input name='familyName' type='text' className='form-control' placeholder='Enter Family Name'/>
                        </div>
                        <button id='final-submit' type="submit" className="btn btn-primary">Submit</button>   
                    </form>
                </div>
            </div>
        )
    }
    render() {
        console.log('wlakthrough is rendering ')
        return ( 
            <div className='container-fluid'>
                <div onClick={() => this.setState({remove: 'remove'})} className={`big-img row ${this.state.remove}`}>
                    <div className='text-box'>
                        <h3>Welcome To The Beta</h3>
                        <h5>This is Fa-Manager, a managing platform for family's</h5>
                        <h6>Click anywhere to get started</h6>
                    </div>
                </div>
                <div onClick={() => this.setState({expand: 'bubble-huge-1', bubbleClicked: true})}className={`bubble bubble-1 
                    ${this.state.remove === '' ? '' : 'bubble-show-1'}
                    ${(this.state.expand === 'bubble-huge-1') ? 'bubble-huge': ''}
                    ${(this.state.expand === 'bubble-huge-2') ? 'bubble-remove': ''}
                `}>
                {this.state.expand === 'bubble-huge-1' ? this.renderNewStuff() :
                    <div className='bubble-box'>
                        <h4>If you're creating a new family, click here</h4>
                    </div>
                }
                </div>
                <div onClick={() => this.setState({expand: 'bubble-huge-2', bubbleClicked: true})} className={`bubble bubble-2 
                    ${this.state.remove === '' ? '' : 'bubble-show-2'}
                    ${(this.state.expand === 'bubble-huge-2') ? 'bubble-huge' : ''}
                    ${(this.state.expand === 'bubble-huge-1') ? 'bubble-remove': ''}
                `}>
                    <div className='bubble-box'>
                        <h4>If you're joining a family, click here</h4>
                    </div>
                </div>
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