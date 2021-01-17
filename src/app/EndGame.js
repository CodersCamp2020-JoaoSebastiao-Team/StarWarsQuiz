const endGameScore = document.getElementById('end-result-p');
const endGameSummary = document.getElementById('end-summary');
export const EndGame = (Answers,score) => { 
    endGameScore.innerText = `YOUR RESULT: ${score}`;
    endGameSummary.innerText = `The force is strong in you young Padawan! During 2 minutes you have answered ${score} / ${Answers.length} questions. And Computer guessed x / ${Answers.length} .`;
    //console.log(Answers);

}