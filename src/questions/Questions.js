export const Questions = async (APIurl, category) => {
    //Adjust API url to category get from menu: // Now temporary get always people
    switch (category) {
        case "people":
            APIurl = APIurl + "/people/";
            break;
        case "starships":
            APIurl = APIurl + "/starships/";
            break;
        case "vehicles":
            APIurl = APIurl + "/vehicles/";
            break;
        default:
            break;
    }

    // Get picture and options HTML element to edit it according to data from API
    let quiz = document.getElementById('swquiz-app');
    let loader = document.getElementsByClassName('loader')[0];
    const questionEnd = document.getElementsByClassName('question-finish')[0];
    const questionImage = document.getElementsByClassName('question-image__wrapper')[0];
    const questionContent = document.getElementsByClassName('question-content__wrapper')[0];
    let questionWrapper = document.getElementsByClassName('main-question__wrapper')[0];
    let picture = document.getElementsByClassName('question-image__image')[0];
    let options = document.getElementsByClassName('p-content--item');
    let optionWrapper = document.getElementsByClassName('question-content--item');

    //Starting visibility
    loader.style.display = "flex";
    questionWrapper.style.display = "none";
    quiz.style.backgroundColor = "rgba(0,0,0,0.5)";

    //declaration of used variables
    let score = 0;
    var StarWarsData;
    let QuestionsPeople = [];
    let fetchData = [];
    let nextUrl;
    let selected = [];
    let rightOption;

    // Use cors-anywhere to avoid blocking trasnfer data from API in browser
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // Get data from API - first 10 elements
    await getData(proxyurl + APIurl);

    // get amount of whole questions and divided it into packages of 10 elements
    const questionsAmount = StarWarsData.count;
    //console.log("Amount of all questions", questionsAmount)
    const questionsLength = StarWarsData.results.length;
    //console.log("Length of each package", questionsLength)
    const iterations = Math.ceil(questionsAmount / questionsLength);
    //console.log("Iterations", iterations)

    //Get rest of data from REST API
    await getAllData();
    //console.log("Fetched data :", fetchData);
    //console.log("Fetched data length: ", fetchData.length)

    // Get from data objects only names and put it to one array.
    //TODO - Put it in function with parameter name,wehicles etc.
    for (const names in fetchData) {
        QuestionsPeople[names] = fetchData[names].name
    }

    console.log("Fetched names of people :", QuestionsPeople);
    //Firstly, show question without argument - random question.
    showQuestion();
    //According to clicked option send argument to function and it's checks if answer is correct, or not.
    //TODO - this also should be a separate function
    optionWrapper[0].addEventListener("click", function () {
        showQuestion(0);
    });
    optionWrapper[1].addEventListener("click", function () {
        showQuestion(1);
    });
    optionWrapper[2].addEventListener("click", function () {
        showQuestion(2);
    });
    optionWrapper[3].addEventListener("click", function () {
        showQuestion(3);
    });

    //change visibility:
    loader.style.display = "none";
    questionWrapper.style.display = "flex";
    quiz.style.backgroundColor = "transparent";


    // async function to get single package data from API and put it to fetchData array.
    async function getData(url) {
        await fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                // console.log("New data!!")
                StarWarsData = data;
                for (const element of data.results) {
                    fetchData.push(element);
                }
            })
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
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

    // Function created to select unique questions
    // @questions - array with data from API , @selected - array with already shown questions
    function selectQuestion(questions, selected) {
        // defeinitions of some used variables
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
                good: selectedQuestion,
                bad: [selectedChoises[0], selectedChoises[1], selectedChoises[2]]
            }
            return obj;
        }
        else {
            return -1;
        }
    }

    //This function show question in HTML elements.
    async function showQuestion(select) {
        // If we call function with argument (options button)
        if (select >= 0 && select <= 3) {
            optionWrapper[select].classList.add("selected");
            if (select == rightOption) {
                optionWrapper[select].classList.add("good");
                score += 1;
                console.log("Gratualtions! This answer is correct! Your score is: ", score);
            }
            else {
                optionWrapper[select].classList.add("bad");
            }
            // We show for one second a selected choise, with good or bad class.
            await waitForData(1000);
            optionWrapper[select].classList.remove("selected");
            optionWrapper[select].classList.remove("good");
            optionWrapper[select].classList.remove("bad");
        }
        let Answers = selectQuestion(QuestionsPeople, selected);
        if (Answers != -1) {
            //console.log("Good anser is nr : ", Answers.good)
            picture.style.backgroundImage = `url(../static/assets/img/modes/${category}/${Answers.good + 1}.jpg)`;
            //console.log("Bad choises: ", Answers.bad[0], Answers.bad[1], Answers.bad[2]);
            let indexOption = randomOption(Answers);
            options[indexOption.good].innerText = QuestionsPeople[Answers.good];
            options[indexOption.bad[0]].innerText = QuestionsPeople[Answers.bad[0]];
            options[indexOption.bad[1]].innerText = QuestionsPeople[Answers.bad[1]];
            options[indexOption.bad[2]].innerText = QuestionsPeople[Answers.bad[2]];
            rightOption = indexOption.good;
        }
        else {
            questionEnd.style.display = "flex";
            questionImage.style.display = "none";
            questionContent.style.display = "none";
            console.log("You answered all the questions!")
        }
    }

    // Function to put good answer in random option (1 of 4 element)
    function randomOption(answers) {
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

    // Function to get rest of data from API - changing the url pages.
    async function getAllData() {
        for (let m = 1; m < iterations; m++) {
            nextUrl = `https://swapi.dev/api/${category}/?page=` + (m + 1);
            getData(nextUrl);
            await waitForData(1000);
        }
    }
}

