import {Questions} from "./Questions";
import {handleModeUpdate, category} from "./MainMenu";
import {handleRulesButtonClick} from "./rankingAndMode"
export const App = ({options}) => {
  const start = document.getElementsByClassName('play-the-game')[0];
  const rules = document.getElementById("zasady_gry");
  start.addEventListener("click", () => {
    Questions(options.swApiBaseUrl,`${category}`);
    rules.style.display="none";
  })

  const rulesRankingButton = document.querySelector('.hall-of-fame');//'.sw-quiz-mode-button-rules'
  rulesRankingButton.addEventListener('click', handleRulesButtonClick);

}

