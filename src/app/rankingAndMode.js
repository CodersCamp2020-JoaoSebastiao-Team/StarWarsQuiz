const ranking = require('./ranking.json');

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

const listItems = document.querySelectorAll('.main-menu--option');
listItems.forEach(item => {
  if (item.classList.contains('selected')) {
    updateText(item);
  }
});

export function handleRulesButtonClick(e) {

  let listItems = document.querySelectorAll('.main-menu--option');
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

export function updateText(item) {
  const modeTitle = document.querySelector('.swquiz-mode-title');
  const modeContent = document.querySelector('.swquiz-mode-content');
  const rulesRankingButton = document.querySelector('.sw-quiz-mode-button-rules');
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
