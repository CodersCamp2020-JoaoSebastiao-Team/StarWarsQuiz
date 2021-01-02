export const Questions = async (APIurl, category) => {
    switch (category) {
        case "people":
            APIurl = APIurl + "/people/";
            break;
        default:
            break;
    }
    var StarWarsData;
    var QuestionsPeople = [];
    let fetchData = [];
    let nextUrl;

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
    console.log("Fetched data length: ",fetchData.length)
    const result = await waitForData();
    console.log(result);
        for (const names in fetchData) {
            QuestionsPeople[names] = fetchData[names].name
        }
        console.log("Fetched names of people :", QuestionsPeople);


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

    function waitForData() {
        return new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                }, 3000);         
        });
    }
}

