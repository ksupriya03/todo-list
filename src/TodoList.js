import { connect } from 'react-redux';
import React from 'react';
//import useStyles from './ContainedButtons';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {
  createMuiTheme,
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';

import {
  //sortTodo,
  removeTodo,
  searchTodo,
  toggleTodo,
} from './Action';

const useStyles = {
  root: {
    /* padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    flexGrow: 1,
    maxWidth: 752, */
    width: '100%',
    backgroundColor: 'cadetblue;',
    padding: '10px',
    /* width: 100%; */
    margin: '10px',
    border: '1px black',
    // float: left;
  },
  input: {
    //marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  demo: {
    margin: '10px',
    padding: '10px',
    border: '1px',

    color: 'black',
    /* background-color: cornsilk; */
    borderStyle: 'double',
  },
  listingitems: {
    margin: '1px',
    border: '1px',
    borderStyle: 'inset',
    backgroundColor: 'cornsilk',
  },
};

//const [dense] = React.useState(false);
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
    const { classes } = this.props;

    return (
      <div>
        {/*   <input
          style={{ marginleft: '100px' }}
          placeholder="search"
          ref="search"
          onChange={this.handleChange}
        />
        <Button
          //type="button"
          className={useStyles.iconButton}
          variant="contained"
          color="default"
           value="Search"  onClick={this.searchClick}>
          Search
        </Button> */}
        <Paper className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Enter item name to search"
            inputProps={{ 'aria-label': 'search Items' }}
            onChange={this.handleChange}
          />
          <IconButton
            className={classes.iconButton}
            aria-label="search"
            onClick={this.searchClick}>
            <SearchIcon />
          </IconButton>
        </Paper>
        <ul className={classes.demo}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div>
                <List className={classes.demo}>
                  {todos.map(todo => (
                    <ListItem
                      className={classes.listingitems}
                      onClick={() => handleClick(todo.id)}
                      style={{
                        textDecoration: todo.completed ? 'line-through' : null,
                      }}
                      key={todo.id}>
                      {todo.name}
                      {/*                       <Button
                        onClick={() => removeItem(todo.id)}>
                        <DeleteIcon></DeleteIcon>
                      </Button> */}
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments" onClick={() => removeItem(todo.id)} >
                          <DeleteIcon  />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </div>
            </Grid>
          </Grid>
        </ul>
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

const EnhancedTodoList = withStyles(useStyles)(TodoList);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EnhancedTodoList);
