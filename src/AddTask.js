import React from 'react';
import { connect } from 'react-redux';
import { addTodo, populateTodo } from './Action';

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
    //this.populateList = this.populateList.bind(this);
  }
  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  addTask() {
    //console.log('name is', this.state.name);
    if (this.state.name === '') {
      alert('Please enter the value');
    } else {
      this.props.addTask(this.state.name);
      this.setState({ name: '' });
    }
  }
  //dummy populate list for testing
  /* populateList() {
    const arrlist = {
      todos: [{ name: 'task1', id: 1 }, { name: 'task2', id: 2 }],
    };
    this.props.populateList(arrlist.todos);
  } */

  render() {
    return (
      <div>
        <input value={this.state.name} onChange={this.handleChange} />
        <button type="button" onClick={this.addTask}>
          Add
        </button>
        {/* <button type="button" onClick={this.populateList}>
          PopulateList
        </button> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTask: text => dispatch(addTodo(text)),
    //populateList: todolist => dispatch(populateTodo(todolist)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(AddTask);
