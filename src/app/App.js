import {Questions} from "./Questions";
import {handleModeUpdate, category} from "./MainMenu";
import {handleRulesButtonClick} from "./rankingAndMode"
export const App = ({options}) => {
  const start = document.getElementsByClassName('play-the-game')[0];
  const start2 = document.getElementsByClassName('sw-quiz-mode-button-play')[0];
  start.addEventListener("click", () => {
    Questions(options.swApiBaseUrl,`${category}`);
  })
  start2.addEventListener("click", () => {
    Questions(options.swApiBaseUrl,`${category}`);
  })

  const rulesRankingButton = document.querySelector('.sw-quiz-mode-button-rules');
  rulesRankingButton.addEventListener('click', handleRulesButtonClick);

}

