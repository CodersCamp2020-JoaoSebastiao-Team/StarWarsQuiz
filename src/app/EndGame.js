const endGameScore = document.getElementById('end-result-p');
const endGameSummary = document.getElementById('end-summary');
export const EndGame = (Answers,score, computerScore) => { 
    endGameScore.innerText = `YOUR RESULT: ${score}`;
    endGameSummary.innerText = `The force is strong in you young Padawan! During 2 minutes you have answered ${score} / ${Answers.length} questions. And Computer guessed ${computerScore} / ${Answers.length} .`;
    //console.log(Answers);
}

const endGameImage = document.getElementById('end-img');
const endGameCorrect = document.getElementById('end-correct');
const endGameYourAnswer = document.getElementById('end-your-answer');
const endGameComputerAnswer = document.getElementById('end-computer-answer');

export const EndTable = (Answers, category, answer) => {
        for (let i = 0; i < Answers.length ; i++){
            const newDiv = document.createElement('div');
            newDiv.id = `end-answer-row-${i}`
            newDiv.style = 'height: 130px; text-align: center; padding-left: 1rem; width: 100%; align-items: center; display: grid;grid-template-columns: 1.5fr 1fr 1fr 1fr;'
            document.getElementById(`end-answers-table`).appendChild(newDiv);

            const newDivImg = document.createElement('div');
                newDivImg.id = `end-img-${i}`
                document.getElementById(`end-answer-row-${i}`).appendChild(newDivImg);

                const img = document.createElement('img');
                img.src = `../static/assets/img/modes/${category}/${answer + 1}.jpg`;
                img.style = 'object-fit: cover; max-width: 100px; max-height: 100px; border-radius: 20px'
                document.getElementById(`end-img-${i}`).appendChild(img);


                const newDivEndCorrect = document.createElement('div');
                newDivEndCorrect.id = 'end-correct'
                document.getElementById(`end-answer-row-${i}`).appendChild(newDivEndCorrect);
                newDivEndCorrect.innerText = 'Correct ans';

                const newDivEndYourAnswer = document.createElement('div');
                newDivEndYourAnswer.id = 'end-your-answer'
                document.getElementById(`end-answer-row-${i}`).appendChild(newDivEndYourAnswer);
                newDivEndYourAnswer.innerText = 'Your Ans';

                const newDivEndComputerAnswer = document.createElement('div');
                newDivEndComputerAnswer.id = 'end-computer-answer'
                document.getElementById(`end-answer-row-${i}`).appendChild(newDivEndComputerAnswer);
                newDivEndComputerAnswer.innerText = 'Computer Ans';
        }

}
