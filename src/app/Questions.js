import {ProgressBar, timeLeft} from "./ProgressBar";


export const Questions = async (APIurl, category) => {

    //Adjust API url to category get from menu: // Now temporary get always people
    APIurl = setCategory(category, APIurl);

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
    const endGame = document.getElementsByClassName('end-game')[0];

    //Starting visibility
    questionError.style.display = "none";
    questionWrapper.style.display = "flex";
    loader.style.display = "flex";
    questionImage.style.display = "none";
    questionContent.style.display = "none";
    quiz.style.backgroundColor = "rgba(0,0,0,0.5)";

    //declaration of used variables
    let score = 0;
    //var StarWarsData;
    let QuestionsPeople = [];
    let fetchData = [];
    let selected = [];
    let rightOption;
    //let responseStatus;
    //let responseOk = true;
    let iterations;
    let questionsEnd = false;

    // Use cors-anywhere to avoid blocking trasnfer data from API in browser
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    // Get data from API - first 10 elements
    var {responseOk, responseStatus, StarWarsDataCount, StarWarsDataLength } = await getData((proxyurl + APIurl), fetchData ,QuestionsPeople);
    //await getData(APIurl);
    //await getData(nextUrl);
    console.log("responseok: ",responseOk,"response status: ", responseStatus,"fetched data count, length", StarWarsDataCount ,StarWarsDataLength )


    // If data fetched properly with status 200 -> success
    if (responseOk) {
            // get amount of whole questions and divided it into packages of 10 elements
            //const questionsAmount = StarWarsDataCount;
            //console.log("Amount of all questions", questionsAmount)
            //const questionsLength = StarWarsDataLength;
            //console.log("Length of each package", questionsLength)
            iterations = Math.ceil(StarWarsDataCount / StarWarsDataLength);
            //console.log("Iterations", iterations)
    }
        //Get rest of data from REST API
        getAllData(APIurl, responseOk, iterations, category,fetchData, QuestionsPeople);

        //Firstly, show question without argument - random question.
        showQuestion();
        ProgressBar();

        //According to clicked option send argument to function and it's checks if answer is correct, or not.
        //TODO - this also should be a separate function
        optionWrapper[0].addEventListener("click",queston1Listener);
        optionWrapper[1].addEventListener("click",queston2Listener);
        optionWrapper[2].addEventListener("click",queston3Listener);
        optionWrapper[3].addEventListener("click",queston4Listener);

        //change visibility:
        loader.style.display = "none";
        questionImage.style.display = "block";
        questionContent.style.display = "block";
        quiz.style.backgroundColor = "transparent";

    //This function show question in HTML elements.
    async function showQuestion(select) {
        // If we call function with argument (options button)
        if (select >= 0 && select <= 3 ) {
            //Remove event listeners to avoid situation when somebody click buttons after send answer
            optionWrapper[0].removeEventListener("click",queston1Listener , false);
            optionWrapper[1].removeEventListener("click",queston2Listener , false);
            optionWrapper[2].removeEventListener("click",queston3Listener , false);
            optionWrapper[3].removeEventListener("click",queston4Listener , false);

            optionWrapper[select].classList.add("answer-selected");
            if (select == rightOption) {
                optionWrapper[select].classList.add("answer-good");
                score += 1;
                console.log("Gratualtions! This answer is correct! Your score is: ", score);
            }
            else {
                optionWrapper[select].classList.add("answer-bad");
            }
            // We show for one second a selected choise, with good or bad class.
            await waitForData(1000);
            optionWrapper[select].classList.remove("answer-selected");
            optionWrapper[select].classList.remove("answer-good");
            optionWrapper[select].classList.remove("answer-bad");

            //Give eventlisteners back when new question appear after 1 second
            optionWrapper[0].addEventListener("click",queston1Listener);
            optionWrapper[1].addEventListener("click",queston2Listener);
            optionWrapper[2].addEventListener("click",queston3Listener);
            optionWrapper[3].addEventListener("click",queston4Listener);
        }
        let {answer , selected } = selectQuestion(QuestionsPeople, selected);
        console.log("Answers: ", answer)
        if (answer != -1) {
            await waitForData(50);
            console.log("Good anser is nr : ", QuestionsPeople[answer.good], "number: ", answer.good)
            picture.style.backgroundImage = `url(../static/assets/img/modes/${category}/${answer.good + 1}.jpg)`;
            await waitForData(250);
            //console.log("Bad choises: ", Answers.bad[0], Answers.bad[1], Answers.bad[2]);
            let indexOption = randomOption();
            options[indexOption.good].innerText = QuestionsPeople[answer.good];
            options[indexOption.bad[0]].innerText = QuestionsPeople[answer.bad[0]];
            options[indexOption.bad[1]].innerText = QuestionsPeople[answer.bad[1]];
            options[indexOption.bad[2]].innerText = QuestionsPeople[answer.bad[2]];
            rightOption = indexOption.good;
        }
        else {
            questionEnd.style.display = "flex";
            questionImage.style.display = "none";
            questionContent.style.display = "none";
            console.log("You answered all the questions!")
            await waitForData(4000);
            questionEnd.style.display = "none";
            endGame.style.display = "flex";
        }
    }

    function queston1Listener(){
        showQuestion(0);
    }
    function queston2Listener(){
        showQuestion(1);
    }
    function queston3Listener(){
        showQuestion(2);
    }
    function queston4Listener(){
        showQuestion(3);
    }

    const timeToEnd= setInterval(() => {
        if (timeLeft <= 0){
            questionsEnd = true;
            questionWrapper.style.display = "none";
            endGame.style.display = "flex"
        }
        else{
            questionsEnd = false;
        }
      }, 1000)   
      console.log("try catch json! category: ",setCategory(category, APIurl, true),"data", require(setCategory(category, APIurl, true)));

}

// ============== Functions definitions ================ /

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
            await fetch(url)
                 .then(async response => {
                         if (response.ok){
                         let data = response.json();
                         fetchedData = data;
                         responseOk = true;
                         responseStatus = response.status;
                         //console.log("data: ",data) 
                         return data;      
    
                         }
                 })
                 .then(data => {
                    fetchedData = data;
                    console.log("result of fetched data",fetchedData.results,"counted elements: ",fetchedData.count)
                     for (const element of data.results) {
                         fetchData.push(element);
                     }
                     //console.log("fetch data: ", fetchData)
                 })
                 .catch(() => {
                     //const questionMessage = questionErrorContent.querySelector('h2');
                     console.log("Ups... something wrong with Rest API")
                     if (!responseOk) {
                        //  questionContent.style.display = "none";
                        //  questionImage.style.display = "none";
                        //  loader.style.display = "none";
                        //  questionError.style.display = "flex";
                        //  questionMessage.innerText = `${responseStatus} Error - sorry we have problem with API, try again later!`
                         console.log(`${responseStatus} Error - sorry we have problem with API, try again later!`)
                     }
                     if (responseStatus != 200){
                         responseOk = false;
                     }
                 });
     
             // Get from data objects only names and put it to one array.
             if(responseOk){
                transferData(fetchData, QuestionsPeople,"name");
                console.log("Data before transfer: ",fetchData, "DAta after transfer!", QuestionsPeople)
                console.log("Return count, length :",fetchedData.count , fetchedData.results.length)                    
             return {
                responseOk : responseOk,
                responseStatus : responseStatus,
                StarWarsDataCount: fetchedData.count,
                StarWarsDataLength: fetchedData.results.length
            }
             }
             else{
                return {
                    responseOk : responseOk,
                    responseStatus : responseStatus,
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
                getData(nextUrl, fetchData ,QuestionsPeople);
                await waitForData(800);
            }
        }
        else{
            let data = require(setCategory(category, APIurl, true));
            switch (category) {
                case "people":
                    transferData(data, QuestionsPeople, "fields","name");
                    break;
                case "starships":
                    transferData(data, QuestionsPeople, "fields","starship_class");
                    break;
                case "vehicles":
                    transferData(data, QuestionsPeople, "fields","vehicle_class");
                    break;
            }

        }
        
    }

    
    // Function to choose category and return new URL to API request
    // if uselocal = TRUE, we use local API instead of Rest API.
    function setCategory(category = "people", APIurl = "", useLocal = false){
        let newAPIurl;
        if (!useLocal){
            switch (category) {
                case "people":
                    newAPIurl = APIurl + "/peoples/";
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
        else{
            if (category == "people" || category == "vehicles" || category == "starships"){
                newAPIurl = `../../swapi-json-server/${category}.json`;
            }
            else{
                console.log("Something wrong with category name in local json api")
                newAPIurl = `../../swapi-json-server/people.JSON`;
            }
        }
        return newAPIurl;
    }

    // transfer data from input object to output array @area is a string with object atribute
    function transferData(input = [], output = [], prefix1 = "", prefix2 = ""){
        let transferArea1 = prefix1;
        let transferArea2 = prefix2;
        for (let i = 0; i < input.length; i++) {
            //prefix1.length > 0  ? output[i] = input[i][transferArea1] : output[i] = input[i];
            prefix1.length > 0  ? (prefix2.length > 0  ? output[i] = input[i][transferArea1][transferArea2] : output[i] = input[i][transferArea1] )  : output[i] = input[i];
        }
        console.log("Inside transfer! : area, sample data name",transferArea1, input[0][transferArea1]);
        return output;
    }

    // Function created to select unique questions
    // @questions - array with data from API , @selected - array with already shown questions
    function selectQuestion(questions, selected = []) {
        // defeinitions of some used variables
        //console.log("inside selectQuestion, questions :",questions)
        //console.log("inside selectQuestion, selected :", selected)
        let dubbled = false;
        let selectedQuestion;
        let selectedChoises = [];
        let optionsSelected = false;
        let max = questions.length - 1;
        let min = 0;
        // this is done only if we have questions to show. If we show all of questions function returns -1;
        if (questions.length > selected.length) {
            do {
                // get random value from min to max
                const randomQuestion = Math.floor(Math.random() * (max - min + 1) + min);
                dubbled = false;
                // If we get value that already exist, we have to draw again
                for (let number of selected) {
                    if (number == randomQuestion) {
                        //console.log("Dubbled!")
                        dubbled = true;
                    }
                }
                // If we have new value - put it to selected array and get the question number
                if (!dubbled) {
                    selected.push(randomQuestion);
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
                selected: selected,
                questions: questions
                
            }
            return obj;
        }
        else {
            return -1;
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
        //console.log("good: ", randomGood, "bad: " , obj.bad)
        //console.log("Poprawna ma byc: ", obj.good);
        //console.log("zle maja byc: ",obj.bad[0],", ", obj.bad[1],", ", obj.bad[2],", ");
        return obj;
    }

   module.exports = {Questions, randomOption, selectQuestion};


