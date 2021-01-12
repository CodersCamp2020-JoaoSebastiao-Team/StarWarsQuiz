import {Questions} from "./Questions";
import {handleModeUpdate, category} from "./MainMenu";
import {handleRulesButtonClick} from "./rankingAndMode"
export const App = ({options}) => {
  const start = document.getElementsByClassName('play-the-game')[0];
  start.addEventListener("click", () => {
    Questions(options.swApiBaseUrl,`${category}`);
  })

  const rulesRankingButton = document.querySelector('.hall-of-fame');//'.sw-quiz-mode-button-rules'
  rulesRankingButton.addEventListener('click', handleRulesButtonClick);

}

