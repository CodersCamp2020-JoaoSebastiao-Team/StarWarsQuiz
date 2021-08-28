import { category } from './MainMenu';


const textToView = {
  'people': {
    'title': 'Who is this character?',
    'Rules': 'You have one minute (1m) to answer as many queestions as' +
      ' possible. During the game on each qustion you need to' +
      ' select who from Star Wars is showed on left (Jar Jar' +
      'Binks ringt now) from available options.',
    'Src':'<img src="./static/assets/modes/people/35.png" alt="random character" class="img-rules">'
  },
  'vehicles': {
    'title': 'Do you recognize this vehicle?',
    'Rules': 'You have one minute (1m) to answer as many questions as possible.' +
      ' During the game on each question you need to select who from Star Wars' +
      ' is showed on the left (Jar Jar Binks right now) from available options.',
    'Src':'<img src="./static/assets/modes/vehicles/4.png" alt="random character" class="img-rules">'
  },
  'starships': {
    'title': 'Do you recognize this starship?',
    'Rules': 'You have one minute (1m) to answer as many questions as possible.' +
      ' During the game on each question you need to select which starship' +
      ' from Star Wars is showed on the left.',
    'Src':  '<img src="./static/assets/modes/starships/13.png" alt="random character" class="img-rules">'
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
      updateText(item.id);

    }
  });
}

export function updateText(category) {
  const modeTitle = document.querySelector('.rules-head');//'.swquiz-mode-title'
  const modeContent = document.querySelector('.rules');//'.swquiz-mode-content'
  const rulesRankingButton = document.querySelector('.hall-of-fame');//'.sw-quiz-mode-button-rules'
  const headImage = document.querySelector('.head-img-rules');
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


  headImage.innerHTML =  textToView[category].Src;
  modeTitle.textContent = textToView[category].title;
  modeContent.innerHTML = rulesRankingButton.textContent === 'Hall of fame' ?
    '<div><h2>Mode rules:</h2><p class="rule-on-change">' + textToView[category].Rules + '</p></div>' :
    ranking.length ?
      '<div><h2>Mode ranking:</h2><table><tr><th>Place</th><th>Player</th><th>Answered</th><th>Percents</th></tr>' +
      ranking.filter((e, i) => i < 5).map((person, id) => {
        const i = id + 1;

        return '<tr><td>' + i + '</td><td><div style="overflow:hidden">' + person.name + '</div></td> <td>' + person.score + '/' + person.max_score +
          '</td><td>'+person.scorePercents.toFixed(2)+'%'+'</td></tr>';
      }).join(' ') + '</table><div class="all-ranking-btn-flex"><button class="btn" id="all-ranking-btn">See all</button></div></div>' :
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
      return '<tr><td>' + i + '</td><td><div style="overflow:hidden">' + person.name + '</div></td> <td>' + person.score + '/' + person.max_score +
        '</td><td>'+person.scorePercents.toFixed(2)+'%'+'</td></tr>';
    }).join(' ') + '</table></div>';
  modal.style.display = 'block';
}

const username = document.getElementById("player-name-hall-of-fame");

export function saveHighScore (e) {
  e.preventDefault();
  if((!username.value)) {username.value = 'noname'};

    const lastScore = {
        score: localStorage.getItem('mostRecentScore'),
        max_score: localStorage.getItem('QuestionsTotal'),
        scorePercents : (localStorage.getItem('mostRecentScore') / localStorage.getItem('QuestionsTotal')) * 100,
        name: username.value,
    };

    switch(category) {
      case "people":
        setRankingToLocalStorage("highScoresPeople", lastScore)
        break;
      case "vehicles":
        setRankingToLocalStorage("highScoresVehicle", lastScore)
        break;
      case "starships":
        setRankingToLocalStorage("highScoresStarship", lastScore)
    }
}

function setRankingToLocalStorage(fileName, lastScore) {
  const highScores = JSON.parse(localStorage.getItem(fileName)) || [];
  if (localStorage.getItem(fileName)) {
    const matched = highScores.filter(user => {
      return username.value === user.name;
    });
    if (matched.length > 0) {
      if (matched[0].scorePercents < lastScore.scorePercents) {
        matched[0].score = localStorage.getItem('mostRecentScore');
        matched[0].max_score = localStorage.getItem('QuestionsTotal');
        matched[0].scorePercents = (localStorage.getItem('mostRecentScore') / (localStorage.getItem('QuestionsTotal'))) * 100;

        const index = highScores.findIndex(user => user.name == username.value);
        highScores.splice(index, 1);
        highScores.push(matched[0]);
      }
    } else {
      highScores.push(lastScore);
    }
  } else {
    highScores.push(lastScore);
  }
  highScores.sort((a, b) => {
    return b.scorePercents - a.scorePercents;
  });
  let endSection = document.querySelector(".end-game")
  let rulesSection = document.querySelector("#rules__wrapper")
  localStorage.setItem(fileName, JSON.stringify(highScores));
  endSection.style.display = "none";
  rulesSection.style.display = "inline";
  modalRankingView(highScores)
}







