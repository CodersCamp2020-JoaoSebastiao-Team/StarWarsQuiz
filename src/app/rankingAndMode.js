import { category } from './MainMenu';


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
    updateText(item.id);
  }
});



const rp = [{
  "name":"asdasd",
  "score": 11,
  "max_score": 20
},{
  "name":"asdd",
  "score": 1,
  "max_score": 2
},{
  "name":"asd",
  "score": 101,
  "max_score": 200
}, {
    "name":"asasd",
    "score": 11,
    "max_score": 200
  },
]
export function handleRulesButtonClick(e) {

  let listItems = document.querySelectorAll('.main-menu--option');
  if (e.target.textContent === 'Rules') {
    e.target.textContent = 'Hall of fame';
  } else if (e.target.textContent === 'Hall of fame') {
    e.target.textContent = 'Rules';
  }
  listItems.forEach(item => {
    if (item.classList.contains('main-menu--selected')) {
      console.log(item.id);
      updateText(item.id);

    }
  });
}

export function updateText(category) {
  const modeTitle = document.querySelector('.rules-head');//'.swquiz-mode-title'
  const modeContent = document.querySelector('.rules');//'.swquiz-mode-content'
  const rulesRankingButton = document.querySelector('.hall-of-fame');//'.sw-quiz-mode-button-rules'
  let ranking = []
  switch (category) {
    case "people":
      ranking = JSON.parse(localStorage.getItem(`highScoresPeople`)) || [];
      break;
    case "vehicles":
      ranking = JSON.parse(localStorage.getItem(`highScoresVehicle`)) || [];
      break;
    case "starships":
      ranking = JSON.parse(localStorage.getItem(`highScoresStarship`)) || [];
  }
  /*
  //ranking sort, better if sort while saving score after game in file
  ranking[item.id].sort((a, b) =>
    (a.score / a.max_score > b.score / b.max_score) ? -1 :
      ((b.score / b.max_score > a.score / a.max_score) ? 1 : 0));*/
  console.log(category);
  modeTitle.textContent = textToView[category].title;
  modeContent.innerHTML = rulesRankingButton.textContent === 'Hall of fame' ?
    '<div><h2>Mode rules:</h2><p class="rule-on-change">' + textToView[category].Rules + '</p></div>' :
    ranking.length ?
      '<div><h2>Mode ranking:</h2><table><tr><th>Place</th><th>Player</th><th>Answered</th></tr>' +
      ranking.filter((e, i) => i < 3).map((person, id) => {
        const i = id + 1;
        return '<tr><td>' + i + '</td><td>' + person.name + '</td> <td>' + person.score + '/' + person.max_score + '</td></tr>';
      }) + '</table><div class="all-ranking-btn-flex"><button id="all-ranking-btn">See all</button></div></div>' :
      '<div><h2>Mode ranking:</h2><p>The leadership is empty</p></div>';

  if (rulesRankingButton.textContent !== 'Hall of fame' && ranking.length) {
    handleAllRanking(ranking)
  }
}
function handleAllRanking(rankingArray) {
  let modal = document.getElementById('Hall-of-fame-modal');
  let seeAllButton = document.getElementById('all-ranking-btn');
  let span = document.getElementsByClassName('close')[0];
  seeAllButton.addEventListener('click', () => {
    let rankingModalBody = document.querySelector('.modal-body');
    rankingModalBody.innerHTML = '<div><table><tr><th>Place</th><th>Player</th><th>Answered</th></tr>' +
      rankingArray.map((person, id) => {
        const i = id + 1;
        return '<tr><td>' + i + '</td><td>' + person.name + '</td> <td>' + person.score + '/' + person.max_score + '</td></tr>';
      }) + '</table></div>';
    modal.style.display = 'block';
  });
  span.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click',
    (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
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








