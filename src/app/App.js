<<<<<<< HEAD
const ranking = require('./ranking.json');

export const App = ({ options }) => {
};


const textToView = {
  'people': {
    'title': 'people title',
    'Rules': 'people rules',
  },
  'vehicles': {
    'title': 'vehicle title',
    'Rules': 'vehicle rules',
  },
  'starships': {
    'title': 'Starships title',
    'Rules': 'Starships rules',
  },
};

function updateText(item) {
  //ranking sort, better if sort while saving score after game in file
  ranking[item.id].sort((a, b) =>
    (a.score / a.max_score > b.score / b.max_score) ? -1 :
      ((b.score / b.max_score > a.score / a.max_score) ? 1 : 0));
  modeTitle.textContent = textToView[item.textContent].title;
  modeContent.innerHTML = rulesRankingButton.textContent === 'Ranking' ?
    '<div><h2>Mode rules:</h2><p>' + textToView[item.textContent].Rules + '</p></div>' :
    '<div><h2>Mode ranking:</h2><table><tr><th>Place</th><th>Player</th><th>Answered</th></tr>' +
    ranking[item.id].filter((e, i) => i < 3).map((person, id) => {
      const i = id+1;
      return '<tr><td>' + i + '</td><td>' + person.name + '</td> <td>' + person.score + '/' + person.max_score + '</td></tr>';
    }) +
    '</table></div>';
}

const rulesRankingButton = document.querySelector('.sw-quiz-mode-button-rules');
const playButton = document.querySelector('.sw-quiz-mode-button-play');
const modeTitle = document.querySelector('.swquiz-mode-title');
const modeContent = document.querySelector('.swquiz-mode-content');

rulesRankingButton.addEventListener('click', handleRulesButtonClick);

function handleRulesButtonClick(e) {
  if (e.target.textContent === 'Rules') {
    e.target.textContent = 'Ranking';
  } else if (e.target.textContent === 'Ranking') {
    e.target.textContent = 'Rules';
  }
  listItems.forEach(item => {
    if (item.classList.contains('selected')) {
      updateText(item);
    }
  });
}


const listItems = document.querySelectorAll('.menu-option');
listItems.forEach(item => item.addEventListener('click', handleModeUpdate));

listItems.forEach(item => {
  if (item.classList.contains('selected')) {
    updateText(item);
  }
});

function handleModeUpdate(e) {
  if (!e.target.classList.contains('selected')) {
    for (let i = 0; i < listItems.length; i++) {
      listItems[i].classList.remove('selected');
    }
    e.target.classList.add('selected');
  }
  updateText(e.target);
}
=======
import { Questions} from "./Questions";
import {handleModeUpdate, category} from "./MainMenu";
import {handleRulesButtonClick, saveHighScore} from "./rankingAndMode";
import {setWidth} from "./update_width";
export let acceptingMode = true;
export const App = ({options}) => {
  const start = document.getElementsByClassName('play-the-game')[0];
  const rules = document.getElementById("rules__wrapper");


  setWidth()
  start.addEventListener("click", () => {
    Questions(options.swApiBaseUrl,`${category}`);
    rules.style.display="none";
    acceptingMode = false;
    setWidth()
  })

  const rulesRankingButton = document.querySelector('.hall-of-fame');
  rulesRankingButton.addEventListener('click', handleRulesButtonClick);

  const saveScoreBtn = document.getElementById("save-hall-of-fame-button");
  saveScoreBtn.addEventListener('click',e =>{ saveHighScore(e); acceptingMode = true;});
  setWidth()

}

>>>>>>> develop
