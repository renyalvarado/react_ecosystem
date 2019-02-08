/* eslint-env es6 */
'use strict';

import { connect } from 'react-redux';
import Link from './Link';
import { setVisibilityFilter } from '../actions/actions';

const mapStateToLinkProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
});

const mapDispatchToLinkProps = (dispatch, ownProps) => ({
  onClick () {
    dispatch(setVisibilityFilter(ownProps.filter));
  }
});

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

export default FilterLink;
