import {updateText} from './RankingAndMode'

const listItems = document.querySelectorAll('.main-menu--option');
export let category = "people";
listItems.forEach(item => item.addEventListener('click', handleModeUpdate));

let acceptingMode = true;

export function handleModeUpdate(e){
    if(!acceptingMode) return;
    if(!e.target.classList.contains('main-menu--selected')) {
        for (var i = 0; i < listItems.length; i++) {
            listItems[i].classList.remove('main-menu--selected');
        }
        e.target.classList.add('main-menu--selected');
        console.log(e.target);   
        category = e.target.innerText.toLowerCase();
    }
    updateText((e.target))
}
