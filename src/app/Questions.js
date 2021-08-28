import { ProgressBar, timeLeft } from "./ProgressBar";
import { EndGame, EndTable } from "./EndGame";

export let AnswersRaport = [];

export const Questions = async (APIurl, category) => {
    //Adjust API url to category get from menu: // Now temporary get always people
    APIurl = setCategory(category, APIurl);
    AnswersRaport = [];

    // Get picture and options HTML element to edit it according to data from API
    const quiz = document.getElementById('swquiz-app');
    const loader = document.getElementsByClassName('loader')[0];
    const questionEnd = document.getElementsByClassName('question-finish')[0];
    const questionImage = document.getElementsByClassName('question-image__wrapper')[0];
    const questionContent = document.getElementsByClassName('question-content__wrapper')[0];
    const questionWrapper = document.getElementsByClassName('main-question__wrapper')[0];
    const picture = document.getElementsByClassName('question-image__image')[0];
    const options = document.getElementsByClassName('p-content--item');
    const optionWrapper = document.getElementsByClassName('question-content--item');
    const questionError = document.getElementsByClassName('question-api-error__wrapper')[0];
    const questionErrorContent = document.getElementsByClassName('question-api-error--content')[0];
    const questionHeader = document.getElementsByClassName('p-content--header-question')[0];
    const endGame = document.getElementsByClassName('end-game')[0];
    const computerAnswer = document.getElementsByClassName('p-content--computer-question')[0];
    const computerWrapper = document.getElementsByClassName('question-content--computer')[0];

    //Starting visibility
    questionError.style.display = "none";
    questionWrapper.style.display = "flex";
    loader.style.display = "flex";
    questionImage.style.display = "none";
    questionContent.style.display = "none";
    quiz.style.backgroundColor = "rgba(0,0,0,0.5)";

    //declaration of used variables
    let score = 0;
    //Computer Game:
    let computerScore = 0;
    let computerAnswers = {
        good: "",
        bad: []
    }
    //var StarWarsData;
    let QuestionsPeople = [];
    let fetchData = [];
    let selectedArray = [];
    let rightOption = 0;
    //let responseStatus;
    //let responseOk = true;
    let iterations = 0;
    let questionsEnd = false;
    let numberOfQuestion = 0;
    let questionsShown = 0;

    // Use cors-anywhere to avoid blocking trasnfer data from API in browser
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    //change header display:
    switch (category) {
        case "people":
            questionHeader.innerText = "MODE: Who is this character? ";
            break;
        case "starships":
            questionHeader.innerText = "MODE: What kind of starship is this? ";
            break;
        case "vehicles":
            questionHeader.innerText = "MODE: What kind of vehicle is this? ";
            break;
        default:
            questionHeader.innerText = "MODE: Who is this character? ";
            break;
    }


    // Get data from API - first 10 elements
    var { responseOk, responseStatus, StarWarsDataCount, StarWarsDataLength } = await getData((APIurl), fetchData, QuestionsPeople);

    // If data fetched properly with status 200 -> success
    if (responseOk) {
        // get amount of whole questions and divided it into packages of 10 elements
        iterations = Math.ceil(StarWarsDataCount / StarWarsDataLength);
    }

    //Get rest of data from REST API
    getAllData(APIurl, responseOk, iterations, category, fetchData, QuestionsPeople);

    //Firstly, show question without argument - random question.
    showQuestion();
    ProgressBar();

    //According to clicked option send argument to function and it's checks if answer is correct, or not.
    //TODO - this also should be a separate function
    optionWrapper[0].addEventListener("click", queston1Listener);
    optionWrapper[1].addEventListener("click", queston2Listener);
    optionWrapper[2].addEventListener("click", queston3Listener);
    optionWrapper[3].addEventListener("click", queston4Listener);

    //change visibility:
    loader.style.display = "none";
    questionImage.style.display = "block";
    questionContent.style.display = "block";
    quiz.style.backgroundColor = "transparent";

    //This function show question in HTML elements.
    async function showQuestion(select) {
        // If we call function with argument (options button)
        cleanAnswers(optionWrapper);
        computerAnswer.innerText = "";
        //computerWrapper.style.opacity = "0";
        questionsShown++;


        // USER question handle
        if (select >= 0 && select <= 3) {
            let AnswerRaport = {
                answer: "",
                user: "",
                computer: "",
                numberOfQuestion: 0
            }

            //Remove event listeners to avoid situation when somebody click buttons after send answer
            optionWrapper[0].removeEventListener("click", queston1Listener, false);
            optionWrapper[1].removeEventListener("click", queston2Listener, false);
            optionWrapper[2].removeEventListener("click", queston3Listener, false);
            optionWrapper[3].removeEventListener("click", queston4Listener, false);

            // Computer question handle!
            let { computerChoise, computerPoint } = computerPlay(computerAnswers);
            computerScore += computerPoint;
            //optionWrapper[computerChoise].classList.add("answer-computer");

            AnswerRaport.answer = optionWrapper[rightOption].innerText;
            AnswerRaport.user = optionWrapper[select].innerText;
            AnswerRaport.numberOfQuestion = numberOfQuestion;
            AnswerRaport.computer = optionWrapper[computerChoise].innerText;
            AnswersRaport.push(AnswerRaport);

            computerAnswer.innerText = `${AnswerRaport.computer}`;
            //computerWrapper.style.opacity = "1";
            if (computerPoint) {
                computerAnswer.classList.add("answer-good");
            } else {
                computerAnswer.classList.add("answer-bad");
            }

            if (select == rightOption) {
                score += 1;
            }
            else {
                optionWrapper[select].classList.add("answer-bad");
            }
            optionWrapper[rightOption].classList.add("answer-good");
            optionWrapper[select].classList.add("answer-selected");
            // We show for one second a selected choise, with good or bad class.
            await waitForData(1000);
            optionWrapper[select].classList.remove("answer-selected");
            optionWrapper[rightOption].classList.remove("answer-good");
            optionWrapper[select].classList.remove("answer-bad");
            optionWrapper[computerChoise].classList.remove("answer-computer");
            computerAnswer.classList.remove("answer-bad");
            computerAnswer.classList.remove("answer-good");
            computerAnswer.innerText = "";
            //computerWrapper.style.opacity = "0";
            cleanAnswers(optionWrapper);

            //Give eventlisteners back when new question appear after 1 second
            optionWrapper[0].addEventListener("click", queston1Listener);
            optionWrapper[1].addEventListener("click", queston2Listener);
            optionWrapper[2].addEventListener("click", queston3Listener);
            optionWrapper[3].addEventListener("click", queston4Listener);

        }



        let { answer, selected } = selectQuestion(QuestionsPeople, selectedArray);

        if (answer != -1) {
            await waitForData(50);
            numberOfQuestion = answer.good;
            picture.style.backgroundImage = `url(./static/assets/modes/${category}/${answer.good + 1}.png)`;
            await waitForData(250);
            let indexOption = randomOption();
            options[indexOption.good].innerText = QuestionsPeople[answer.good];
            options[indexOption.bad[0]].innerText = QuestionsPeople[answer.bad[0]];
            options[indexOption.bad[1]].innerText = QuestionsPeople[answer.bad[1]];
            options[indexOption.bad[2]].innerText = QuestionsPeople[answer.bad[2]];
            computerAnswers.good = indexOption.good;
            computerAnswers.bad = [indexOption.bad[0], indexOption.bad[1], indexOption.bad[2]];
            rightOption = indexOption.good;
        }
        else {
            questionEnd.style.display = "flex";
            questionImage.style.display = "none";
            questionContent.style.display = "none";
            await waitForData(4000);
            EndGame(AnswersRaport, score, computerScore, questionsShown);
            EndTable(AnswersRaport, category);
            questionEnd.style.display = "none";
            endGame.style.display = "flex";


            //clear all variables 
            score = 0;
            computerScore = 0;
            // QuestionsPeople = [];
            // fetchData = [];
            // selectedArray = [];
            // rightOption = 0;
            // iterations = 0;
            // questionsEnd = false;
            // numberOfQuestion = 0;
            // questionsShown = 0;
            AnswersRaport = [];
            AnswersRaport.length = 0;
            selectedArray.length = 0;
            selectedArray = [];
            optionWrapper[0].removeEventListener("click", queston1Listener, false);
            optionWrapper[1].removeEventListener("click", queston2Listener, false);
            optionWrapper[2].removeEventListener("click", queston3Listener, false);
            optionWrapper[3].removeEventListener("click", queston4Listener, false);
        }
    }

    function queston1Listener() {
        showQuestion(0);
    }
    function queston2Listener() {
        showQuestion(1);
    }
    function queston3Listener() {
        showQuestion(2);
    }
    function queston4Listener() {
        showQuestion(3);
    }

    const timeToEnd = setInterval(() => {
        if (timeLeft <= 0) {
            EndGame(AnswersRaport, score, computerScore, questionsShown);
            EndTable(AnswersRaport, category, AnswersRaport);
            questionsEnd = true;
            questionWrapper.style.display = "none";
            endGame.style.display = "flex";
            localStorage.setItem('mostRecentScore', score);
            localStorage.setItem('QuestionsTotal', questionsShown);
            document.getElementById("hall-of-fame-save").reset();
            clearInterval(timeToEnd);

            //clear all variables 
            score = 0;
            computerScore = 0;
            // QuestionsPeople = [];
            // fetchData = [];
            // selectedArray = [];
            // rightOption = 0;
            // iterations = 0;
            // questionsEnd = false;
            // numberOfQuestion = 0;
            // questionsShown = 0;
            AnswersRaport = [];
            AnswersRaport.length = 0;
            selectedArray.length = 0;
            selectedArray = [];
            optionWrapper[0].removeEventListener("click", queston1Listener, false);
            optionWrapper[1].removeEventListener("click", queston2Listener, false);
            optionWrapper[2].removeEventListener("click", queston3Listener, false);
            optionWrapper[3].removeEventListener("click", queston4Listener, false);
        }
        else {
            questionsEnd = false;
        }
    }, 1000)

}

// ============== Functions definitions ================ /


function getDataLocaly(APIurl, category) {
    let temparray = [];
    transferData(require(setCategory(category, APIurl, true)), temparray, "fields", "name");
}

//Function with give possibility to wait some time to get properly data.
//@time - miliseconds
function waitForData(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, time);
    });
}

// async function to get single package data from API and put it to fetchData array.
async function getData(url, fetchData, QuestionsPeople) {
    let responseOk;
    let responseStatus;
    let fetchedData;
    let waitingTine = 0;
    let waitForFetchEnd;

    const controller = new AbortController();
    const signal = controller.signal;

    waitForFetchEnd = setTimeout(() => {
        // Abort.
        controller.abort();
        responseStatus = -1;
    }, 5000)

    await fetch(url, {
        method: 'get',
        signal: signal
    })
        .then(async response => {
            if (response.ok) {
                let data = response.json();
                fetchedData = data;
                responseOk = true;
                responseStatus = response.status;
                return data;

            }
        })
        .then(data => {
            fetchedData = data;
            for (const element of data.results) {
                fetchData.push(element);
            }
        })
        .catch(() => {
            alert("Ups... something wrong with Rest API");
            if (responseStatus != 200) {
                responseOk = false;
            }
        });

    // Get from data objects only names and put it to one array.
    if (responseOk) {
        transferData(fetchData, QuestionsPeople, "name");
        return {
            responseOk: responseOk,
            responseStatus: responseStatus,
            StarWarsDataCount: fetchedData.count,
            StarWarsDataLength: fetchedData.results.length
        }
    }
    else {
        return {
            responseOk: false,
            responseStatus: responseStatus,
            StarWarsDataCount: 0,
            StarWarsDataLength: 0
        }
    }
}


// Function to get rest of data from API - changing the url pages.
async function getAllData(APIurl, responseOk, iterations, category, fetchData, QuestionsPeople) {
    let nextUrl;
    if (responseOk) {
        for (let m = 1; m < iterations; m++) {
            nextUrl = `https://swapi.dev/api/${category}/?page=` + (m + 1);
            getData(nextUrl, fetchData, QuestionsPeople);
            await waitForData(800);
        }
    }
    else {
        let data;
        switch (category) {
            case "people":
                data = require(`../../swapi-json-server/people.json`);
                transferData(data, QuestionsPeople, "fields", "name");
                break;
            case "starships":
                data = require(`../../swapi-json-server/starships.json`);
                transferData(data, QuestionsPeople, "fields", "starship_class");
                break;
            case "vehicles":
                data = require(`../../swapi-json-server/vehicles.json`);
                transferData(data, QuestionsPeople, "fields", "vehicle_class");
                break;
            default:
                data = require(`../../swapi-json-server/people.json`);
                transferData(data, QuestionsPeople, "fields", "name");
                break;
        }

    }

}

// Function to choose category and return new URL to API request
// if uselocal = TRUE, we use local API instead of Rest API.
function setCategory(category = "people", APIurl = "", useLocal = false) {
    let newAPIurl;
    if (!useLocal) {
        switch (category) {
            case "people":
                newAPIurl = APIurl + "/people/";
                break;
            case "starships":
                newAPIurl = APIurl + "/starships/";
                break;
            case "vehicles":
                newAPIurl = APIurl + "/vehicles/";
                break;
            default:
                newAPIurl = APIurl + "/people/";
                break;
        }
    }
    else {
        if (category == "people" || category == "vehicles" || category == "starships") {
            newAPIurl = `../../swapi-json-server/${category}.json`;
        }
        else {
            newAPIurl = `../../swapi-json-server/people.JSON`;
        }
    }
    return newAPIurl;
}

// transfer data from input object to output array @area is a string with object atribute
function transferData(input = [], output = [], prefix1 = "", prefix2 = "") {
    let transferArea1 = prefix1;
    let transferArea2 = prefix2;
    for (let i = 0; i < input.length; i++) {
        prefix1.length > 0 ? (prefix2.length > 0 ? output[i] = input[i][transferArea1][transferArea2] : output[i] = input[i][transferArea1]) : output[i] = input[i];
    }
    return output;
}

// Function created to select unique questions
// @questions - array with data from API , @selected - array with already shown questions
function selectQuestion(questions, selectedArray = []) {
    // defeinitions of some used variables
    let dubbled = false;
    let selectedQuestion;
    let selectedChoises = [];
    let optionsSelected = false;
    let max = questions.length - 1;
    let min = 0;
    // this is done only if we have questions to show. If we show all of questions function returns -1;
    if ((questions.length > selectedArray.length) && (questions.length > 0)) {
        do {
            // get random value from min to max
            const randomQuestion = Math.floor(Math.random() * (max - min + 1) + min);
            dubbled = false;
            // If we get value that already exist, we have to draw again
            for (let number of selectedArray) {
                if (number == randomQuestion) {
                    dubbled = true;
                }
            }
            // If we have new value - put it to selected array and get the question number
            if (!dubbled) {
                selectedArray.push(randomQuestion);
                selectedQuestion = randomQuestion;
            }
        }
        while (dubbled)
        // Now we should draw other answers - for now, its also random questions from other elements of category
        do {
            optionsSelected = false;
            const randomChoise1 = Math.floor(Math.random() * (max - min + 1) + min);
            const randomChoise2 = Math.floor(Math.random() * (max - min + 1) + min);
            const randomChoise3 = Math.floor(Math.random() * (max - min + 1) + min);
            if (selectedQuestion != randomChoise1 && selectedQuestion != randomChoise2 && selectedQuestion != randomChoise3
                && randomChoise1 != selectedQuestion && randomChoise1 != randomChoise2 && randomChoise1 != randomChoise3
                && randomChoise2 != selectedQuestion && randomChoise2 != randomChoise1 && randomChoise2 != randomChoise3
                && randomChoise3 != selectedQuestion && randomChoise3 != randomChoise1 && randomChoise3 != randomChoise2) {
                optionsSelected = true;
                selectedChoises.push(randomChoise1);
                selectedChoises.push(randomChoise2);
                selectedChoises.push(randomChoise3);
            }
        }
        while (!optionsSelected)
        // At the output we return object with good answer and 3 bad answers
        let obj = {
            answer: {
                good: selectedQuestion,
                bad: [selectedChoises[0], selectedChoises[1], selectedChoises[2]]
            },
            selected: selectedArray,
            questions: questions
        }
        return obj;
    }
    else {
        let obj = {
            answer: -1,
            selected: selectedArray,
            questions: questions
        }
        return obj;
    }

}


// Function to put good answer in random option (1 of 4 element)
function randomOption() {
    let max = 3;
    let min = 0;
    const rest = [0, 1, 2, 3];
    const randomGood = Math.floor(Math.random() * (max - min + 1) + min);
    let index = rest.indexOf(randomGood);
    rest.splice(index, 1);
    let obj = {
        good: randomGood,
        bad: rest
    }
    return obj;
}

function computerPlay(computerAnswers) {
    let max = computerAnswers.good;
    let min = 0;
    let good = computerAnswers.good;
    let bad = computerAnswers.bad;
    const computerChoise = Math.floor(Math.random() * (max - min + 1) + min);
    let computerPoint;
    (computerChoise == computerAnswers.good) ? computerPoint = 1 : computerPoint = 0;
    return { computerChoise, computerPoint };
    //return 0;
}

function cleanAnswers(optionWrapper) {
    for (let i = 0; i < optionWrapper.length; i++) {
        optionWrapper[i].classList.remove("answer-selected");
        optionWrapper[i].classList.remove("answer-good");
        optionWrapper[i].classList.remove("answer-bad");
        optionWrapper[i].classList.remove("answer-computer");
    }

}

module.exports = { Questions, randomOption, selectQuestion };



