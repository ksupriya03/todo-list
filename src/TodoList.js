import { connect } from 'react-redux';
import React from 'react';
import useStyles from './ContainedButtons';
import Button from '@material-ui/core/Button';
import {
  //sortTodo,
  removeTodo,
  searchTodo,
  toggleTodo,
} from './Action';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
    this.searchClick = this.searchClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  searchClick(props) {
    this.props.searchClick(this.state.search);
  }

  handleChange(e) {
    this.setState({ search: e.target.value });
  }

  render() {
    const { handleClick, todos, removeItem } = this.props;
    //const classes = useStyles();
    return (
      <div>
        <input
          style={{ marginleft: '100px' }}
          placeholder="search"
          ref="search"
          onChange={this.handleChange}
        />
        <Button
          //type="button"
          variant="contained"
          color="default"
          /* value="Search" */ onClick={this.searchClick}
        />
        <ol>
          {todos.map(todo => (
            <li
              onClick={() => handleClick(todo.id)}
              style={{ textDecoration: todo.completed ? 'line-through' : null }}
              key={todo.id}>
              {todo.name}
              <Button
                //component="span"
                variant="contained"
                color="secondary"
                //className={classes.button}
                onClick={() => removeItem(todo.id)}>
                Delete
              </Button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

const getVisibilityTodos = (todos, filter, searchval, sortord) => {
  let todofilter;

  console.log('getvisiblefilter and searcg value', sortord, filter);
  if (typeof searchval === 'undefined' || searchval === '') {
    todofilter = todos;
  } else {
    todofilter = todos.filter(t => t.name.includes(searchval));
  }

  switch (filter) {
    case 'SHOW_ALL':
      todofilter = todofilter;
      break;
    case 'SHOW_COMPLETED':
      todofilter = todofilter.filter(t => t.completed);
      break;
    case 'SHOW_ACTIVE':
      todofilter = todofilter.filter(t => !t.completed);
      break;
    default:
      return todofilter;
  }
  if (sortord === 'SORT_ASC') {
    console.log('ascending.....');
    return todofilter.sort(function(a, b) {
      const aa = a.name.toLowerCase();
      const bb = b.name.toLowerCase();
      return aa < bb ? -1 : aa > bb ? 1 : 0;
    });
  }
  console.log('todlist', todofilter);
  if (sortord === 'SORT_DSC') {
    console.log('decending....');
    return todofilter.sort(function(a, b) {
      const aa = a.name.toLowerCase();
      const bb = b.name.toLowerCase();
      return aa > bb ? -1 : aa < bb ? 1 : 0;
    });
  }
};

const mapStateToProps = (state, ownProps) => {
  console.log('redux state', state);
  return {
    todos: getVisibilityTodos(
      state.todos,
      state.visibilityFilter,
      state.search,
      state.sortAscDsc,
    ),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('disptach', ownProps.filter);
  return {
    handleClick: id => dispatch(toggleTodo(id)),
    searchClick: text => dispatch(searchTodo(text)),
    removeItem: id => dispatch(removeTodo(id)),
    //handleSort: todolist => dispatch(sortTodo(todolist)),
    //handleSort: filter => dispatch(setSortOrder(ownProps.filter)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);
