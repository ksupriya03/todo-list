export const POPULATE_TODO = 'POPULATE_TODO';
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const SEARCH_TODO = 'SEARCH_TODO';
export const DELETE_TODO = 'DELETE_TODO';
//export const SORT_ASC = 'SORT_ASC';
export const SET_SORTORD = 'SET_SORTORD';
export const SortOrder = {
  SORT_ASC: 'SORT_ASC',
  SORT_DSC: 'SORT_DSC',
};
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  //SORT_ASC: 'SORT_ASC',
  //SORT_DSC: 'SORT_DSC',
};
export function populateTodo(todolist) {
  return { type: POPULATE_TODO, todolist };
}
export function addTodo(text) {
  return { type: ADD_TODO, text };
}
export function toggleTodo(id) {
  return { type: TOGGLE_TODO, id };
}
export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}
export function searchTodo(text) {
  //console.log('action for search', text);
  return { type: SEARCH_TODO, text };
}
export function removeTodo(id) {
  //console.log('action for delete', id);
  return { type: DELETE_TODO, id };
}
/* export function sortTodo(todolist) {
  //console.log('action for sorting', todolist);
  return { type: SORT_ASC, todolist };
} */
export function setSortOrder(filter) {
  return { type: SET_SORTORD, filter };
}
