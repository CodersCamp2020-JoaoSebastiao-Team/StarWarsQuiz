import { Questions} from "./Questions";
import {handleModeUpdate, category} from "./MainMenu";
import {handleRulesButtonClick, saveHighScore} from "./rankingAndMode"

export let acceptingMode = true;
export const App = ({options}) => {
  const start = document.getElementsByClassName('play-the-game')[0];
  const rules = document.getElementById("zasady_gry");
  start.addEventListener("click", () => {
    Questions(options.swApiBaseUrl,`${category}`);
    rules.style.display="none";
    acceptingMode = false;
  })

  const rulesRankingButton = document.querySelector('.hall-of-fame');//'.sw-quiz-mode-button-rules'
  rulesRankingButton.addEventListener('click', handleRulesButtonClick);
  
  const saveScoreBtn = document.getElementById("save-hall-of-fame-button");
  saveScoreBtn.addEventListener('click', saveHighScore);

}

