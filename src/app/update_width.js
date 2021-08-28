
export function  setWidth(){
    const width_menu = document.getElementsByClassName("main-menu__modes")[0].clientWidth;
    document.getElementsByClassName("rules-head")[0].style.width = width_menu.toString;
    document.getElementsByClassName("rules")[0].style.width = width_menu.toString;
    document.getElementsByClassName("buttons")[0].style.width = width_menu.toString;
}