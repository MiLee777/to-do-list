import { Component } from "react";
import Swal from 'sweetalert2';

export class ToDoList extends Component {
    constructor() {
        super();
        this.state = {
            task: '',
            taskArray: [],
            completedTasks: []
        }
    }

    onChangeEvent(e) {
        this.setState({task: e})
    }

    addTask(task) {
        if(task === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please, add a task!',
            });
        } else {
            let taskList = this.state.taskArray;
            taskList.push(task);
            this.setState({taskArray: taskList, task: ''});
        }
    }

    crossedWord(taskIndex) {
        const completedTasksArray = this.state.taskArray[taskIndex];
        const newTaskArray = this.state.taskArray.filter((task, index) => index !== taskIndex);
        this.setState({
        taskArray: newTaskArray,
        completedTasks: [...this.state.completedTasks, completedTasksArray]
    });
    }

    deleteTask() {
        let taskList = this.state.taskArray;
        let completedList = this.state.completedTasks;
        taskList = [];
        completedList = [];
        this.setState({taskArray: taskList, completedTasks: completedList});
    }

    onFormSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <div>
                    <h2>Add Task</h2>
                    <div className="container">
                        <input type='text'
                        className='field'
                        placeholder='What do you want to do?'
                        value={this.state.task}
                        onChange={(e) => {this.onChangeEvent(e.target.value)}} />
                        <button onClick={() => this.addTask(this.state.task)} className='btn btn-add'>Add</button>
                    </div>
                    <div>
                        <h2>Tasks</h2>
                        <ul>
                            {this.state.taskArray.map((el, taskIndex) => (
                                <li key={taskIndex}>
                                    <input type='checkbox'
                                    onChange={() => this.crossedWord(taskIndex)}/>
                                    {el}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2>Completed</h2>
                        <ul>
                            {this.state.completedTasks.map((el, task) => (
                                <li key={task} className='crossed'>
                                    <input type='checkbox' checked/>
                                    {el}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="container">
                        <button onClick={() => this.deleteTask()} className='btn btn-delete'>Delete All</button>
                    </div>
                </div>
            </form>
        )
    }
}