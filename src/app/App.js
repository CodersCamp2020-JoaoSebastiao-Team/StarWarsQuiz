export const App = ({options}) => {
}

const listItems = document.querySelectorAll('.menu-option');

listItems.forEach(item => item.addEventListener('click', handleModeUpdate));

function handleModeUpdate(e){
    if(!e.target.classList.contains('selected')) {
        for (var i = 0; i < listItems.length; i++) {
            listItems[i].classList.remove('selected');
        }
        e.target.classList.add('selected');
        console.log(e.target);   
    }
}