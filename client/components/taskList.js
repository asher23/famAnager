import React, {Component } from 'react';

export default class TaskList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        
        const {tasks} = this.props
        if (!tasks) return null;        
        const tasksJSX = tasks.map((task, i) => {
            return (
                <div key={i}>
                    <h4>{task.description}</h4>
                </div>
            )
        })
        return (
            <div>
                {tasksJSX}
            </div>
        )
    }
}
