'use strict';

const getDb = () => JSON.parse(localStorage.getItem('toDoList')) ?? []; 
const setDb = (db) => localStorage.setItem('toDoList', JSON.stringify(db));     

const createItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todoItem');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice = ${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" style="font-size: 1.5rem" data-indice = ${indice}>
    `
    document.getElementById('toDoList').appendChild(item);

}
const cleanTask = () => {
    const toDoList = document.getElementById('toDoList');
    while (toDoList.firstChild){
        toDoList.removeChild(toDoList.lastChild);
    }
}
const refreshScreen = (indice) => {
    cleanTask();
    const db = getDb();
    db.forEach ((item, indice) => createItem(item.tarefa, item.status, indice));
}
const insertItem = (event) => {
    const tecla = event.key;
    const texto = event.target.value;
    if(tecla == 'Enter') {
        const db = getDb();
        db.push({'tarefa': texto, 'status': ''});
        setDb(db);
        refreshScreen();
        event.target.value = '';
    }
}
const removeItem = (indice) => {
    const db = getDb();
    db.splice (indice, 1);
    setDb(db);
    refreshScreen();
}
const UpdateItem = (indice) => {
    const db = getDb();
    db[indice].status = db[indice].status == '' ? 'checked' : '';
    setDb(db);
    refreshScreen();
}
const clickItem = (event) =>  {
    const element = event.target;
    if(element.type == 'button') {
        const indice = element.dataset.indice;
        removeItem(indice);
    }
    else if(element.type == 'checkbox') {
        const indice = element.dataset.indice;
        UpdateItem(indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', insertItem); 
document.getElementById('toDoList').addEventListener('click', clickItem);

refreshScreen();

