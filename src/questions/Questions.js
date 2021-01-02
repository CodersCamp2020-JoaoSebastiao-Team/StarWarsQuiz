export const Questions = async (APIurl, category) => {
    switch (category) {
        case "people":
            APIurl = APIurl + "/people/";
            break;
        default:
            break;
    }

    let picture = document.getElementsByClassName('question-image__image')[0];
    let options = document.getElementsByClassName('p-content--item');
    let optionWrapper = document.getElementsByClassName('question-content--item');

    var StarWarsData;
    var QuestionsPeople = [];
    let fetchData = [];
    let nextUrl;
    let selected = [];
    let selectedOption;
    let rightOption;

    console.log("Inside Questions, API url: ", APIurl)
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    await fetch(proxyurl + APIurl) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.json())
        .then(data => {
            console.log(data)
            StarWarsData = data;
            nextUrl = data.next;
            for (const element of data.results) {
                fetchData.push(element);
            }


        })
        .catch(() => console.log("Can’t access " + APIurl + " response. Blocked by browser?"));


    const questionsAmount = StarWarsData.count;
    console.log("Amount of all questions", questionsAmount)
    const questionsLength = StarWarsData.results.length;
    console.log("Length of each package", questionsLength)
    const iterations = Math.ceil(questionsAmount / questionsLength);
    console.log("Iterations", iterations)

    for (let i = 1; i < iterations; i++) {
        nextUrl = "https://swapi.dev/api/people/?page=" + (i + 1);
        getData(nextUrl);
    }
    console.log("Fetched data :", fetchData);
    console.log("Fetched data length: ", fetchData.length)
    const result = await waitForData(3000);
    console.log(result);
    for (const names in fetchData) {
        QuestionsPeople[names] = fetchData[names].name
    }
    console.log("Fetched names of people :", QuestionsPeople);
    showQuestion();
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

    async function getData(url) {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        await fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
            .then(response => response.json())
            .then(data => {
                console.log("New data!!")
                for (const element of data.results) {
                    fetchData.push(element);
                }
            })
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
    }

    function waitForData(time) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, time);
        });
    }

    function selectQuestion(questions, selected) {
        let dubbled = false;
        let selectedQuestion;
        let selectedChoises = [];
        let optionsSelected = false;
        let max = questions.length;
        let min = 0;
        if (questions.length > selected.length) {
            do {
                const randomQuestion = Math.floor(Math.random() * (max - min + 1) + min);
                dubbled = false;
                for (let number of selected) {
                    if (number == randomQuestion) {
                        console.log("Dubbled!")
                        dubbled = true;
                    }
                }
                if (!dubbled) {
                    selected.push(randomQuestion);
                    selectedQuestion = randomQuestion;
                }
            }
            while (dubbled)
            do {
                optionsSelected = false;
                const randomChoise1 = Math.floor(Math.random() * (max - min + 1) + min);
                const randomChoise2 = Math.floor(Math.random() * (max - min + 1) + min);
                const randomChoise3 = Math.floor(Math.random() * (max - min + 1) + min);
                if (randomChoise1 != randomChoise2 != randomChoise3 != selectedQuestion) {
                    optionsSelected = true;
                    selectedChoises.push(randomChoise1);
                    selectedChoises.push(randomChoise2);
                    selectedChoises.push(randomChoise3);
                }
            }
            while (!optionsSelected)

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

    async function showQuestion(select) {

        if (select >= 0 && select <= 3) {
            optionWrapper[select].classList.add("selected");
            if (select == rightOption) {
                optionWrapper[select].classList.add("good");
            }
            else {
                optionWrapper[select].classList.add("bad");
            }
            await waitForData(1000);
            optionWrapper[select].classList.remove("selected");
            optionWrapper[select].classList.remove("good");
            optionWrapper[select].classList.remove("bad");
        }
        let Answers = selectQuestion(QuestionsPeople, selected);
        if (Answers != -1) {
            console.log("Good anser is nr : ", Answers.good)
            picture.style.backgroundImage = `url(../static/assets/img/modes/${category}/${Answers.good + 1}.jpg)`;
            console.log("Bad choises: ", Answers.bad[0], Answers.bad[1], Answers.bad[2]);
            let indexOption = randomOption(Answers);
            options[indexOption.good].innerText = QuestionsPeople[Answers.good];
            options[indexOption.bad[0]].innerText = QuestionsPeople[Answers.bad[0]];
            options[indexOption.bad[1]].innerText = QuestionsPeople[Answers.bad[1]];
            options[indexOption.bad[2]].innerText = QuestionsPeople[Answers.bad[2]];

            rightOption = indexOption.good;
        }
        else {
            console.log("You answered all the questions!")
        }


    }

    function randomOption(answers){
        let max = 3;
        let min = 0;
        const rest = [0,1,2,3];
        const randomGood = Math.floor(Math.random() * (max - min + 1) + min);
        let index = rest.indexOf(randomGood);
        rest.splice(index, 1);
        let obj = {
            good: randomGood,
            bad: rest
        }
        console.log("good: ", randomGood, "bad: " , obj.bad)
        console.log("Poprawna ma byc: ", obj.good);
        console.log("zle maja byc: ",obj.bad[0],", ", obj.bad[1],", ", obj.bad[2],", ");
        return obj;
    }
}

