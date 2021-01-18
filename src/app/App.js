import { Questions} from "./Questions";
import {handleModeUpdate, category} from "./MainMenu";
import {handleRulesButtonClick, saveHighScore} from "./rankingAndMode";
import {setWidth} from "./update_width";
export let acceptingMode = true;
export const App = ({options}) => {
  const start = document.getElementsByClassName('play-the-game')[0];
  const rules = document.getElementById("rules__wrapper");


 
  start.addEventListener("click", () => {
    Questions(options.swApiBaseUrl,`${category}`);
    rules.style.display="none";
    acceptingMode = false;
   
  })

  const rulesRankingButton = document.querySelector('.hall-of-fame');
  rulesRankingButton.addEventListener('click', handleRulesButtonClick);

  const saveScoreBtn = document.getElementById("save-hall-of-fame-button");
  saveScoreBtn.addEventListener('click',e =>{ saveHighScore(e); acceptingMode = true;});
 

}

