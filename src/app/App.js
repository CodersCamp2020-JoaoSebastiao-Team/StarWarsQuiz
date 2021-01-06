export const App = ({ options }) => {
};

const textToView ={
  'people':{
    'title': "people title",
    'Rules': "people rules",
    'Ranking': "people ranking"
  },
  'vehicles':{
    'title': "vehicle title",
    'Rules': "vehicle rules",
    'Ranking': "vehicle ranking"
  },
  'starships':{
    'title': "Starships title",
    'Rules': "Starships rules",
    'Ranking': "Starships ranking"
  }
}
function updateText(item) {
  modeTitle.textContent = textToView[item.textContent].title;
  modeContent.textContent = rulesRankingButton.textContent==='Ranking'?
    textToView[item.textContent].Rules:textToView[item.textContent].Ranking;
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
  listItems.forEach(item =>{if(item.classList.contains('selected')){
    updateText(item);
  }})
}


const listItems = document.querySelectorAll('.menu-option');
listItems.forEach(item => item.addEventListener('click', handleModeUpdate));

listItems.forEach(item =>{if(item.classList.contains('selected')){
  updateText(item);
}})

function handleModeUpdate(e) {
  if (!e.target.classList.contains('selected')) {
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].classList.remove('selected');
    }
    e.target.classList.add('selected');
  }
  updateText(e.target);
}
