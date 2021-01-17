const endGameScore = document.getElementById('end-result-p');
const endGameSummary = document.getElementById('end-summary');
export const EndGame = (Answers,score, computerScore) => { 
    endGameScore.innerText = `YOUR RESULT: ${score}`;
    endGameSummary.innerText = `The force is strong in you young Padawan! During 2 minutes you have answered ${score} / ${Answers.length} questions and Computer guessed ${computerScore} / ${Answers.length} .`;
    //console.log(Answers);

}