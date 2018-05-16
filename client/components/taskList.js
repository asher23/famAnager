import React, {Component } from 'react';

export default class TaskList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {tasks} = this.props
        console.log('but u get here tho?', tasks)
        if (!tasks) return null;        
        const tasksJSX = tasks.map((task, i) => {
            return (
                <div key={i}>
                    <h1>Something</h1>
                    <h4>{task.description}</h4>
                </div>
            )
        })
        console.log('are u running')
        return (
            <div>
                someithnignign
                {tasksJSX}
            </div>
        )
    }
}
