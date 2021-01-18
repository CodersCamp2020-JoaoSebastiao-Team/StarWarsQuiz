import { category } from './MainMenu';
import { AnswersRaport } from './Questions';


const textToView = {
  'people': {
    'title': 'Who is this character?',
    'Rules': 'You have one minute (1m) to answer as many queestions as' +
      ' possible. During the game on each qustion you need to' +
      ' select who from Star Wars is showed on left (Jar Jar' +
      'Binks ringt now) from available options.',
    'Src':'/35.d935f726.jpg'
  },
  'vehicles': {
    'title': 'Do you recognize this vehicle?',
    'Rules': 'You have one minute (1m) to answer as many questions as possible.' +
      ' During the game on each question you need to select who from Star Wars' +
      ' is showed on the left (Jar Jar Binks right now) from available options.',
    'Src':'/13.c1114be4.jpg '
  },
  'starships': {
    'title': 'Do you recognize this starship?',
    'Rules': 'You have one minute (1m) to answer as many questions as possible.' +
      ' During the game on each question you need to select which starship' +
      ' from Star Wars is showed on the left.',
    'Src': '/4.f5365065.jpg'
  },
};

const listItems = document.querySelectorAll('.main-menu--option');
listItems.forEach(item => {
  if (item.classList.contains('main-menu--selected')) {
    updateText(item.id);
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
      console.log(item.id);
      updateText(item.id);

    }
  });
}

export function updateText(category) {
  const modeTitle = document.querySelector('.rules-head');//'.swquiz-mode-title'
  const modeContent = document.querySelector('.rules');//'.swquiz-mode-content'
  const rulesRankingButton = document.querySelector('.hall-of-fame');//'.sw-quiz-mode-button-rules'
  const imageRule = document.querySelector('.img-rules');
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

  imageRule.attributes.Src.value = textToView[category].Src;
  modeTitle.textContent = textToView[category].title;
  modeContent.innerHTML = rulesRankingButton.textContent === 'Hall of fame' ?
    '<div><h2>Mode rules:</h2><p class="rule-on-change">' + textToView[category].Rules + '</p></div>' :
    ranking.length ?
      '<div><h2>Mode ranking:</h2><table><tr><th>Place</th><th>Player</th><th>Answered</th><th>Percents</th></tr>' +
      ranking.filter((e, i) => i < 5).map((person, id) => {
        const i = id + 1;
        return '<tr><td>' + i + '</td><td>' + person.name + '</td> <td>' + person.score + '/' + person.max_score +
          '</td><td>'+person.scorePercents.toFixed(2)+'%'+'</td></tr>';
      }) + '</table><div class="all-ranking-btn-flex"><button id="all-ranking-btn">See all</button></div></div>' :
      '<div><h2>Mode ranking:</h2><p>The leadership is empty</p></div>';

  if (rulesRankingButton.textContent !== 'Hall of fame' && ranking.length) {
    handleAllRankingButton(ranking)
  }
}
const modal = document.getElementById('Hall-of-fame-modal');
let span = document.getElementsByClassName('close')[0];
span.addEventListener('click', () => modal.style.display = 'none');

window.addEventListener('click',
  (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

function handleAllRankingButton(rankingArray) {
  let seeAllButton = document.getElementById('all-ranking-btn');
  seeAllButton.addEventListener('click', () => {
    modalRankingView(rankingArray)
  });
}


function modalRankingView(rankingArray){
  let rankingModalBody = document.querySelector('.modal-body');
  rankingModalBody.innerHTML = '<div><table><tr><th>Place</th><th>Player</th><th>Answered</th><th>Percents</th></tr>' +
    rankingArray.map((person, id) => {
      const i = id + 1;
      return '<tr><td>' + i + '</td><td>' + person.name + '</td> <td>' + person.score + '/' + person.max_score +
        '</td><td>'+person.scorePercents.toFixed(2)+'%'+'</td></tr>';
    }) + '</table></div>';
  modal.style.display = 'block';
}


const username = document.getElementById("player-name-hall-of-fame");
//const mostRecentScore = localStorage.getItem('mostRecentScore');

// localStorage.setItem("highScoresPeople", JSON.stringify([]));
// localStorage.setItem("highScoresVehicle", JSON.stringify([]));
// localStorage.setItem("highScoresStarship", JSON.stringify([]));

//const highScoresPeople = JSON.parse(localStorage.getItem(`highScoresPeople`)) || [];
//const highScoresVehicle = JSON.parse(localStorage.getItem(`highScoresVehicle`)) || [];
//const highScoresStarship = JSON.parse(localStorage.getItem(`highScoresStarship`)) || [];

export function saveHighScore (e) {

    const lastScore = {
        score: localStorage.getItem('mostRecentScore'),
        max_score: localStorage.getItem('QuestionsTotal'),
        scorePercents : (localStorage.getItem('mostRecentScore') / localStorage.getItem('QuestionsTotal')) * 100,
        name: username.value,
    };

    switch(category) {
      case "people":
        setRankingToLocalStarage("highScoresPeople", lastScore)
        break;
      case "vehicles":
        setRankingToLocalStarage("highScoresVehicle", lastScore)
        break;
      case "starships":
        setRankingToLocalStarage("highScoresStarship", lastScore)
    }
}
function setRankingToLocalStarage(fileName, lastScore) {
  const highScores = JSON.parse(localStorage.getItem(fileName)) || [];
  highScores.push(lastScore);
  highScores.sort((a,b) => {
    return b.scorePercents - a.scorePercents;
  });
  let endSection = document.querySelector(".end-game")
  let rulesSection = document.querySelector("#zasady_gry")
  localStorage.setItem(fileName, JSON.stringify(highScores));
  endSection.style.display = "none";
  rulesSection.style.display = "inline";
  modalRankingView(highScores)
}







