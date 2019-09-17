import {
  POPULATE_TODO,
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
  SEARCH_TODO,
  DELETE_TODO,
  SET_SORTORD,
  SortOrder,
  //SORT_ASC,
} from './Action';

const initialState = {
  todos: [{ name: 'First task', id: 1 }],
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  search: '',
  sortAscDsc: SortOrder.SORT_ASC,
};
export default function todoApp(state = initialState, action) {
  //console.log('switch type', action.type);
  switch (action.type) {
    case POPULATE_TODO:
      //console.log('pop todolist', action.todolist);
      return { ...state, todos: [...action.todolist] };
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          { name: action.text, id: state.todos.length + 1 },
        ],
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (action.id === todo.id) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        }),
      };
    case SET_VISIBILITY_FILTER:
      //console.log('visibility filter state', state);
      return {
        ...state,
        // todos: [...state.todos],
        visibilityFilter: action.filter,
        // search: state.search,
      };
    case SEARCH_TODO:
      //console.log('serach todo', action.text);
      return {
        ...state,
        search: action.text,
      };
    case DELETE_TODO:
      return {
        todos: state.todos.filter(t => t.id !== action.id),
      };
    /* case SORT_ASC:
      console.log('ascending order', action.todolist, state);
      return {
        ...state,
        todos: [
          ...action.todolist.sort(function(a, b) {
            const aa = a.name.toLowerCase();
            const bb = b.name.toLowerCase();
            //console.log('aa', aa, bb);
            return aa < bb ? -1 : aa > bb ? 1 : 0;
          }),
        ],
      }; */
    case SET_SORTORD:
      console.log('sorting in reducer');
      return {
        ...state,
        todos: [...state.todos],
        sortAscDsc: action.filter,
      };
    default:
      return state;
  }
}
