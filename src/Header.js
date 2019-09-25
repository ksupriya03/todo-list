import { connect } from 'react-redux';
import React from 'react';

const useStyles = {
  root: {
    margin: '10px',
    padding: '10px',
  },
};

const Header = () => (
  <header className={useStyles.root}>
    <h1> My Todo List App</h1>
  </header>
);

export default Header;
