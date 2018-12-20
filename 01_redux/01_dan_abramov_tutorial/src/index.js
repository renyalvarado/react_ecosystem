/* eslint-env es6 */
'use strict';

let score;

const changeScore = (newScore) => {
  const scoreText = document.querySelector('#score');
  score = newScore;
  scoreText.innerHTML = score;
};

const addButton = document.querySelector('#add');
addButton.addEventListener('click', () => {
  changeScore(score + 1);
  console.log('Add click');
});

const subtractButton = document.querySelector('#subtract');
subtractButton.addEventListener('click', () => {
  changeScore(score - 1);
  console.log('Subtract click');
});

changeScore(0);
