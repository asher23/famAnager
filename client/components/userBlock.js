import React, { Component} from 'react';
import './userBlock.css';
import AddMemberForm from './addMemberForm';

export  class Block extends Component  {

    
    render() {
        const { member, setViewTo } = this.props
        return (
            <div onClick={() => {setViewTo(member)}} className='row block'>
                <div className='col-md-4'>
                    <img className='little-pic' src='https://i.imgur.com/9d7Q908.jpg'/>
                </div>
                <div className='col-md-8'>
                    <h6>{member.email}</h6>
                    <p>Relationship to you: Boss</p>
                </div>
            </div>
        )
    }
}

export class YourBlock extends Component  {
    constructor(props) {
        super(props) 
        this.state = {
            hide: true
        }
    }

    switch = () => {
        this.setState({hide: !this.state.hide})
    }
    render() {
        const { handleAddition, main, setViewTo } = this.props
        return (
            <div onClick={() => {setViewTo(main)}}  className='row your-block'>
                <div className='col-md-12'>
                    <div className='row'>
                        <img className='big-pic' src='https://i.imgur.com/9d7Q908.jpg'/>
                    </div>  
                    <div className='row'>
                        <h5>{main.email}</h5>
                        <br/>
                    </div>
                    <div onClick={this.switch}className='row add-member-div'>
                        <h4 className='center-text'>Add a member to your family</h4>
                    </div>
                    <div className={`row ${this.state.hide ? 'hide-this' : 'show-this'}`}>
                        <AddMemberForm handleAddition={handleAddition}/>
                    </div>
                </div>
            </div>
        )
    }
}
export class BlockList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { members, main, handleAddition, setViewTo } = this.props
        if (!members) {
            return null;
        }
        const membersJSX =  members.map((member, i) => {
            if (main.id !== member.id) {
                return (
                        <Block setViewTo={setViewTo} key={i} member={member}/>
                )
            }     
        })
        return (
            <div className='block-list'>
                    <YourBlock setViewTo={setViewTo} handleAddition={handleAddition} main={main}/>
                    {membersJSX}
            </div>
        )
    }
}