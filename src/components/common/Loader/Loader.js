import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Loader.css';

const Loader = () => (
  <div className={s.loader}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default withStyles(s)(Loader);
