export const App = ({options}) => {
}

function updateRules(item){
    if(item.id ==="vehicles")
    {
        rules.innerHTML = "<p>You have one minute (1m) to answer as many questions as possible. During the game on each question you need to select which vehicle from Star Wars is showed on the left.</p>";
        rule_head.innerHTML = "<p>Do you recognize this vehicle?</p>";
    }
    else if(item.id ==="people")
    {
        rules.innerHTML = "<p>You have one minute (1m) to answer as many questions as possible. During the game on each question you need to select who from Star Wars is showed on the left (Jar Jar Binks right now) from available options.</p>";
        rule_head.innerHTML = "<p>Who is this character?</p>";
    }
    else if(item.id ==="starships")
    {
        rules.innerHTML = "<p>You have one minute (1m) to answer as many questions as possible. During the game on each question you need to select which starship from Star Wars is showed on the left.</p>";
        rule_head.innerHTML = "<p>Do you recognize this starship?</p>";
    }


}

const listItems = document.querySelectorAll('.main-menu__modes');
const rules = document.querySelector('.rule-on-change');
const rule_head = document.querySelector('.rules-head');

listItems.forEach(item => item.addEventListener('click', handleModeUpdate));

function handleModeUpdate(e){
    if(!e.target.classList.contains('selected')) {
        for (var i = 0; i < listItems.length; i++) {
            listItems[i].classList.remove('selected');
        }
        e.target.classList.add('selected');
        updateRules(e.target)  

    }
}