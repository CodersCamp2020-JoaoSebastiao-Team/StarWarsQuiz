import { AnswersRaport } from "./Questions";

const endGameScore = document.getElementById('end-result-p');
const endGameSummary = document.getElementById('end-summary');
export const EndGame = (Answers,score, computerScore, questionsShown) => { 
    endGameScore.innerText = `YOUR RESULT: ${score}`;
    endGameSummary.innerText = `The force is strong in you, young Padawan! During 1 minute you have answered ${score}/${questionsShown} questions and computer guessed ${computerScore}/${questionsShown}.`;
}


const endGameImage = document.getElementById('end-img');
const endGameCorrect = document.getElementById('end-correct');
const endGameYourAnswer = document.getElementById('end-your-answer');
const endGameComputerAnswer = document.getElementById('end-computer-answer');
const button = document.getElementById('save-hall-of-fame-button')



export const EndTable = (Answers, category) => {
        for (let i = 0; i < Answers.length ; i++){
            const newDiv = document.createElement('div');
            newDiv.id = `end-answer-row-${i}`
            newDiv.style = 'height: 130px; text-align: center; padding-left: 1rem; width: 100%; align-items: center; display: grid;grid-template-columns: 0.8fr 1fr 1fr 1fr;'
            document.getElementById(`end-answers-table`).appendChild(newDiv);

                const newDivImg = document.createElement('div');
                newDivImg.id = `end-img-${i}`
                document.getElementById(`end-answer-row-${i}`).appendChild(newDivImg);

                const img = document.createElement('img');
                img.src = `./static/assets/modes/${category}/${Answers[i].numberOfQuestion + 1}.png`;
                img.style = 'object-fit: cover; max-width: 100px; max-height: 100px; border-radius: 20px'
                document.getElementById(`end-img-${i}`).appendChild(img);


                const newDivEndCorrect = document.createElement('div');
                newDivEndCorrect.id = 'end-correct'
                document.getElementById(`end-answer-row-${i}`).appendChild(newDivEndCorrect);
                newDivEndCorrect.innerText = `${Answers[i].answer}`;

                const newDivEndYourAnswer = document.createElement('div');
                newDivEndYourAnswer.id = 'end-your-answer'
                document.getElementById(`end-answer-row-${i}`).appendChild(newDivEndYourAnswer);
                newDivEndYourAnswer.innerText = `${Answers[i].user}`;

                const newDivEndComputerAnswer = document.createElement('div');
                newDivEndComputerAnswer.id = 'end-computer-answer'
                document.getElementById(`end-answer-row-${i}`).appendChild(newDivEndComputerAnswer);
                newDivEndComputerAnswer.innerText = `${Answers[i].computer}`;
            
            if (Answers[i].answer === Answers[i].user) {
                newDivEndYourAnswer.style = 'color: green; font-weight: 600'
            } else {
                newDivEndYourAnswer.style = 'color: red; font-weight: 600;'
            }

            if (Answers[i].answer === Answers[i].computer) {
                newDivEndComputerAnswer.style = 'color: green; font-weight: 600'
            } else {
                newDivEndComputerAnswer.style = 'color: red; font-weight: 600;'
            }
            button.onclick = function Clear() {
                for (let p = 0; p <= Answers.length + 2; p++) {
                    const element = document.getElementById("end-answers-table");
                    element.removeChild(element.childNodes[0]);
                }
            }

        }


}

// button.onclick = function Clear() {
//     newDivEndCorrect.remove()
//     newDivImg.remove()
//     img.remove()
//     newDivEndYourAnswer.remove()
//     newDivEndComputerAnswer.remove()
// }


// function Clear1 (){
//     newDivEndCorrect.remove();
// };
// function Clear2 (){
//     newDivImg.remove();
// };
// function Clear3 (){
//     img.remove();
// };
// function Clear4 (){
//     newDivEndYourAnswer.remove()
// }
// function Clear5 (){
//     newDivEndComputerAnswer.remove()
// }
// button.addEventListener('click', Clear1, false);
// button.addEventListener('click', Clear2, false);
// button.addEventListener('click', Clear3, false);
// button.addEventListener('click', Clear4, false);
// button.addEventListener('click', Clear5, false);