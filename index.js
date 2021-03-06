const div = document.querySelector('div');
const html = document.querySelector('html');

html.addEventListener('contextmenu',(event)=>{
    cleanMenu();
    event.preventDefault();
    event.target.tagName == "BUTTON" ? buttonHandler(event) : htmlHandler(event);
});

html.addEventListener('click',(event)=>{
    if(event.target.dataset.delet){
        deletion(event.target.parentNode);
    }
    if(event.target.dataset.edit){
        edition(event.target.parentNode);
    }
    if(event.target.dataset.add){
        addFile();
    }
    cleanMenu();
});

const cleanMenu = () =>{
    const menuButton = document.querySelector('.menuButton');
    if(menuButton){
        menuButton.remove();
    }
    const menuHtml = document.querySelector('.menuHtml');
    if(menuHtml){
        menuHtml.remove();
    }
}

const buttonHandler = (event) =>{
    const menu = document.createElement('div');
    const del = createDelition(); 
    const edit = createEdition();
    menu.append(del);
    menu.append(edit);
    menu.classList.add('menuButton');
    event.target.append( menu);
}

const createDelition = () =>{
    const del = document.createElement('div');
    del.innerText = "Удалить";
    del.setAttribute('data-delet','true')
    del.classList.add('menuItem');
    return del;
}

const createEdition = () =>{
    const edit = document.createElement('div');
    edit.innerText = "Редактировать";
    edit.setAttribute('data-edit','true')
    edit.classList.add('menuItem');
    return edit;
}

const deletion = (event) =>{
    event.parentNode.remove();
}

const edition = (event) =>{
    let str = prompt('Введите новое название');
    if(checkTitles(str)){
        if(!str){
            return
        }
        event.parentNode.innerText = str;
    } else {
        alert('Такое имя уже существует!');
    }
}

const htmlHandler = (event) =>{
    const needToClean =  document.querySelector('.menuHtml');
    if(needToClean){
        needToClean.remove();
    }
    const menu = document.createElement('div');
    menu.innerText = "Новый файл";
    menu.classList.add('menuHtml');
    menu.style.left = event.pageX + 'px';
    menu.style.top = event.pageY + 'px';
    event.target.append( menu);
    menu.setAttribute('data-add','true')
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

const checkTitles = (str) =>{
    const files =  document.querySelectorAll('button');
    let arr = [];
    for (let file of files) {
        arr.push(file.childNodes[0].data);
      }
    if(arr.some((elem)=>elem == str)){
        return false;
    } else{
        return true;
    }
}