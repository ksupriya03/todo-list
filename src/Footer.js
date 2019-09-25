import { connect } from 'react-redux';
import React from 'react';
import { setVisibilityFilter, setSortOrder } from './Action';
import { VisibilityFilters, SortOrder } from './Action';
import useStyles from './ContainedButtons';
import Button from '@material-ui/core/Button';

const Footer = () => (
  <p>
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
    {/*  {', '}
    <FilterLink filter={SortOrder.SORT_ASC}>Asc</FilterLink>
    {', '}
    <FilterLink filter={SortOrder.SORT_DSC}>Dsc</FilterLink> */}
  </p>
);

const Link = ({ active, onClick, children }) => {
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      color="secondary"
      className={classes.button}
      style={{ backgroundColor: active && 'yellow' }}
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
    active: ownProps.filter === state.visibilityFilter,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  //console.log('ownProps.filter', ownProps.filter);
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    },
  };
};

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Link);

export default Footer;
