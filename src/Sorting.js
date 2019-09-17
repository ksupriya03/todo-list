import { connect } from 'react-redux';
import React from 'react';
import { setVisibilityFilter, setSortOrder } from './Action';
import { VisibilityFilters, SortOrder } from './Action';
import Button from '@material-ui/core/Button';
import useStyles from './ContainedButtons';

const Sorting = () => (
  <p>
    <FilterLink filter={SortOrder.SORT_ASC}>Asc</FilterLink>
    {', '}
    <FilterLink filter={SortOrder.SORT_DSC}>Dsc</FilterLink>
  </p>
);

const Link = ({ active, onClick, children }) => {
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      color="secondary"
      className={classes.button}
      style={{ backgroundColor: active && 'green' }}
      onClick={e => {
        e.preventDefault();
        onClick();
      }}>
      {children}
    </Button>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.sortAscDsc,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  //console.log('ownProps.filter', ownProps.filter);
  return {
    onClick: () => {
      dispatch(setSortOrder(ownProps.filter));
    },
  };
};

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Link);

export default Sorting;
