import React from 'react';
import logo from './logo.svg';
import './App.css';
import todoApp from './Reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import TodoList from './TodoList';
import AddTask from './AddTask';
import Footer from './Footer';
import Sorting from './Sorting';
import { addTodo, populateTodo } from './Action';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const store = createStore(todoApp);
const Applist = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <TodoApp />
      </div>
    </Provider>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // console.log('componnet did mount', this.props);
    const axios = require('axios');
    const { populateList } = this.props;
    axios
      .get('https://s3-ap-southeast-2.amazonaws.com/todo.app/list.json')
      .then(function(response) {
        //console.log(response.data);
        populateList(response.data);
      })
      .catch(function(error) {
        //console.log(error);
      });
  }
  render() {
    return (
      <div>
        <AddTask />
        <TodoList />
        <Footer />
        <Sorting />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    populateList: todolist => dispatch(populateTodo(todolist)),
  };
};
export const TodoApp = connect(
  null,
  mapDispatchToProps,
)(App);

export default Applist;
