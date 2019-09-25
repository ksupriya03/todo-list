import React from 'react';
import { connect } from 'react-redux';
import { addTodo, populateTodo } from './Action';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
//import useStyles from './ContainedButtons';
import {
  createMuiTheme,
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';

const styles = {
  root: {
    //padding: '2px 4px',
    //display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    //width: 400,
    padding: '2px 4px',
    margin: '10px',
    border: '1px',
  },
  formControl: {
    width: '400px',
    float: 'left',
    //padding: '2px 4px',
  },
  btnAlign: {
    backgroundColor: 'blue',
    padding: '10px',
    width: '100px',
    margin: '1px',
    //marginLeft: '-20%',
    height: '50px',
  },
};

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
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel htmlFor="component-outlined">Name</InputLabel>
          <OutlinedInput
            id="component-outlined"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormControl>

        {/* <input value={this.state.name} onChange={this.handleChange} /> */}
        <Button
          className={classes.btnAlign}
          variant="contained"
          /* color="primary"
          type="button" */
          onClick={this.addTask}>
          Add
        </Button>
        {/* <button type="button" onClick={this.populateList}>
          PopulateList
        </button> */}
      </div>
    );
  }
}

const EnhancedAddTask = withStyles(styles)(AddTask);

const mapDispatchToProps = dispatch => {
  return {
    addTask: text => dispatch(addTodo(text)),
    //populateList: todolist => dispatch(populateTodo(todolist)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(EnhancedAddTask);
