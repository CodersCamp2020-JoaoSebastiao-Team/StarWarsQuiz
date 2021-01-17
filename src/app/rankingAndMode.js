import { category } from './MainMenu';

const ranking = require('./ranking.json');

const textToView = {
  'people': {
    'title': 'Who is this character?',
    'Rules': 'You have one minute (1m) to answer as many queestions as' +
      'possible. During the game on each qustion you need to' +
      'select who from Star Wars is showed on left (Jar Jar' +
      'Binks ringt now) from available options.',
  },
  'vehicles': {
    'title': 'Do you recognize this vehicle?',
    'Rules': 'You have one minute (1m) to answer as many questions as possible.' +
      ' During the game on each question you need to select who from Star Wars' +
      ' is showed on the left (Jar Jar Binks right now) from available options.',
  },
  'starships': {
    'title': 'Do you recognize this starship?',
    'Rules': 'You have one minute (1m) to answer as many questions as possible.' +
      ' During the game on each question you need to select which starship' +
      ' from Star Wars is showed on the left.',
  },
};

const listItems = document.querySelectorAll('.main-menu--option');
listItems.forEach(item => {
  if (item.classList.contains('main-menu--selected')) {
    updateText(item);
  }
});

export function handleRulesButtonClick(e) {

  let listItems = document.querySelectorAll('.main-menu--option');
  if (e.target.textContent === 'Rules') {
    e.target.textContent = 'Hall of fame';
  } else if (e.target.textContent === 'Hall of fame') {
    e.target.textContent = 'Rules';
  }
  listItems.forEach(item => {
    if (item.classList.contains('main-menu--selected')) {
      updateText(item);
    }
  });
}

export function updateText(item) {
  const modeTitle = document.querySelector('.rules-head');//'.swquiz-mode-title'
  const modeContent = document.querySelector('.rules');//'.swquiz-mode-content'
  const rulesRankingButton = document.querySelector('.hall-of-fame');//'.sw-quiz-mode-button-rules'

  //ranking sort, better if sort while saving score after game in file
  ranking[item.id].sort((a, b) =>
    (a.score / a.max_score > b.score / b.max_score) ? -1 :
      ((b.score / b.max_score > a.score / a.max_score) ? 1 : 0));
  modeTitle.textContent = textToView[item.textContent].title;
  modeContent.innerHTML = rulesRankingButton.textContent === 'Hall of fame' ?
    '<div><h2>Mode rules:</h2><p>' + textToView[item.textContent].Rules + '</p></div>' :
    ranking[item.id].length?
    '<div><h2>Mode ranking:</h2><table><tr><th>Place</th><th>Player</th><th>Answered</th></tr>' +

    ranking[item.id].filter((e, i) => i < 3).map((person, id) => {
      const i = id + 1;
      return '<tr><td>' + i + '</td><td>' + person.name + '</td> <td>' + person.score + '/' + person.max_score + '</td></tr>';
    })+ '</table></div>':
      '<div><h2>Mode ranking:</h2><p>The leadership is empty</p></div>';
}

const MAX_HIGH_SCORES = 5;

const username = document.getElementById("player-name-hall-of-fame");
//const mostRecentScore = localStorage.getItem('mostRecentScore');

// localStorage.setItem("highScoresPeople", JSON.stringify([]));
// localStorage.setItem("highScoresVehicle", JSON.stringify([]));
// localStorage.setItem("highScoresStarship", JSON.stringify([]));

const highScoresPeople = JSON.parse(localStorage.getItem(`highScoresPeople`)) || [];
const highScoresVehicle = JSON.parse(localStorage.getItem(`highScoresVehicle`)) || [];
const highScoresStarship = JSON.parse(localStorage.getItem(`highScoresStarship`)) || [];

export function saveHighScore (e) {
    console.log("clicked");
    e.preventDefault();

    const lastScore = {
        score: localStorage.getItem('mostRecentScore'),
        name: username.value,
    };

    switch(category) {
      case "people":
        highScoresPeople.push(lastScore);
        highScoresPeople.sort((a,b) => {
          return b.score - a.score;
        });
        highScoresPeople.splice(MAX_HIGH_SCORES);
        localStorage.setItem("highScoresPeople", JSON.stringify(highScoresPeople));
        break;
      case "vehicles":
        highScoresVehicle.push(lastScore);
        highScoresVehicle.sort((a,b) => {
          return b.score - a.score;
        });
        highScoresVehicle.splice(MAX_HIGH_SCORES);
        localStorage.setItem("highScoresVehicle", JSON.stringify(highScoresVehicle));
        break;
      case "starships":
        highScoresStarship.push(lastScore);
        highScoresStarship.sort((a,b) => {
          return b.score - a.score;
        });
        highScoresStarship.splice(MAX_HIGH_SCORES);
        localStorage.setItem("highScoresStarship", JSON.stringify(highScoresStarship));
    }
}
