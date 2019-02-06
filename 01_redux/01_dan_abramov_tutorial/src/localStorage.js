/* eslint-env es6 */
'use strict';

export const loadState = () => {
  try {
    const serializeState = window.localStorage.getItem('state');
    if (serializeState === null) {
      return undefined;
    }
    return JSON.parse(serializeState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    window.localStorage.setItem('state', JSON.stringify(state));
  } catch (err) {
    console.log('Error serializing state');
  }
};
