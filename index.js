// ОСНОВНОЕ ЗАДАНИЕ
const html = document.querySelector('html');
const div = document.querySelector('div');
let buttons =  document.querySelectorAll('button');

const buttonsCollection = () =>{
    buttons =  document.querySelectorAll('button');
    for (let button of buttons) {
        button.addEventListener('contextmenu', contextMenu);
        button.addEventListener('mousedown', dragNDrop);
      }
}

const checkTitles = (str) =>{
    buttonsCollection();
    let arr = [];
    for (let button of buttons) {
        arr.push(button.childNodes[0].data);
      }
    if(arr.some((elem)=>elem == str)){
        return false;
    } else{
        return true;
    }
}

const cleaner = () =>{
    buttonsCollection();
    buttons =  document.querySelectorAll('button');
    for (let button of buttons) {
        button.removeEventListener('click', chooseByClick);
        button.addEventListener('contextmenu', contextMenu);
      }
    if(document.querySelector('.menuHtml')){
        document.querySelector('.menuHtml').remove();
    }
    if(document.querySelector('.menuButton')){
        document.querySelector('.menuButton').remove();
    }
    if(document.querySelectorAll('.active')){
        let actives = document.querySelectorAll('.active')
        for (let active of actives) {
            active.removeAttribute('class');
          }
      }
}

const contextMenu = (event) =>{
    event.stopPropagation();
    event.preventDefault();
    event.currentTarget.tagName == "BUTTON" ? buttonHandler(event) : htmlHandler(event);
}

const deletion = () =>{
    document.querySelector('.active').remove();
}

const edition = () =>{
    let str = prompt('Введите новое название');
    if(checkTitles(str)){
        if(!str){
            return
        }
        document.querySelector('.active').innerText = str;
    } else {
        alert('Такое имя уже существует!');
    }
}

const buttonHandler = (event) =>{
    cleaner();
    event.target.setAttribute('class', 'active');
    const menu = document.createElement('div');
    const del = document.createElement('div');
    del.innerText = "Удалить";
    del.addEventListener('click', deletion);
    del.classList.add('menuItem');
    const edit = document.createElement('div');
    edit.innerText = "Редактировать";
    edit.addEventListener('click', edition);
    edit.classList.add('menuItem');
    menu.append(del);
    menu.append(edit);
    menu.classList.add('menuButton');
    event.target.append( menu);
    buttonsCollection();
}

const addFile = () =>{
    const newItem = document.createElement('button');
    let str = prompt('Введите название');
    if(!str){
        return
    }
    if(checkTitles(str)){
        newItem.innerText = str;
        div.append(newItem);
    } else{
        alert('Такое имя уже существует!');
    }
}

const htmlHandler = (event) =>{
    cleaner();
    const menu = document.createElement('div');
    menu.innerText = "Новый файл";
    menu.classList.add('menuHtml');
    menu.style.left = event.pageX + 'px';
    menu.style.top = event.pageY + 'px';
    event.target.append( menu);
    menu.addEventListener('click', addFile);
    buttonsCollection();
}
// ВЫБОР НЕСКОЛЬКИХ ЭЛЕМЕНТОВ
const chooseMany = (event) =>{
    if(event.ctrlKey){
        html.removeEventListener('click', cleaner);
        html.removeEventListener('contextmenu', contextMenu);
        html.addEventListener('contextmenu',prevent);
        buttons =  document.querySelectorAll('button');
        for (let button of buttons) {
            button.addEventListener('click', chooseByClick);
            button.addEventListener('contextmenu', contextMenuMany);
            button.removeEventListener('contextmenu', contextMenu);
            button.removeEventListener('mousedown', dragNDrop);
          }
    } 
}

const prevent = (event) =>{
    event.stopPropagation();
    event.preventDefault();
}

const contextMenuMany = (event) =>{
    event.stopPropagation();
    event.preventDefault();
    if(document.querySelector('.active')){
        const menu = document.createElement('div');
        const del = document.createElement('div');
        del.innerText = "Удалить выделенное";
        del.addEventListener('click', deletionMany);
        del.classList.add('menuItem');
        menu.append(del);
        menu.classList.add('menuButton');
        event.target.append( menu);
        buttonsCollection();
    }
}

const deletionMany = () =>{
    let actives = document.querySelectorAll('.active')
        for (let active of actives) {
            active.remove();
          }
    cleaner();
}

const chooseByClick = (event) =>{
    if(document.querySelector('.menuButton')){
        document.querySelector('.menuButton').remove();
    }
    if( event.target.getAttribute('class')){
        event.target.removeAttribute('class');
    } else{
        event.target.setAttribute('class', 'active');
    }
}

const stopChooseMany = (event) =>{
    if(event.code == "ControlLeft" || event.code == "ControRight"){
        html.addEventListener('click', cleaner);
        html.addEventListener('contextmenu', contextMenu);
    }
}
//drag’n’drop
const position ={
    x:0,
    y:0,
}

const dragNDrop = (event) =>{
    var rect = event.target.getBoundingClientRect();
    position.x = rect.x; 
    position.y = rect.y;
    event.target.addEventListener('mousemove',move);
    event.target.setAttribute('class', 'move');
    event.target.style.zIndex = 10;
    event.target.addEventListener('mouseup',(event)=>{
        event.target.removeAttribute('class');
        event.target.removeEventListener('mousemove',move);
        event.target.style.zIndex = 0;
        const posTarget = event.target.getBoundingClientRect();
        for (let child of div.children) {
            const pos = child.getBoundingClientRect();
            if(event.target != child &&
                 posTarget.x +event.target.offsetWidth >= pos.left && posTarget.x   <= pos.right&&
                  posTarget.y +event.target.offsetHeight >= pos.top && posTarget.y  <= pos.bottom){
               if(event.clientX   < pos.left +child.offsetWidth/2){
                    event.target.parentNode.insertBefore(event.target,child);
               } else {
                    event.target.parentNode.insertBefore(event.target,child.nextElementSibling);
               } 
            }
        }
        returnBack(event.target);
    });
}

const returnBack = (elem) =>{
    elem.style.left = "0px";
    elem.style.top = "0px";
}

const move = (event) =>{
    event.target.style.left = event.clientX - event.target.offsetWidth/2 -position.x +"px";
    event.target.style.top = event.clientY - event.target.offsetHeight/2 -position.y +"px";
}

html.addEventListener('keyup', stopChooseMany);
html.addEventListener('keydown', chooseMany);
html.addEventListener('click', cleaner);
html.addEventListener('contextmenu', contextMenu);
buttonsCollection();