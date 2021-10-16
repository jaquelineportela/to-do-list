const createItem = () => {
    const item = document.createElement('label');
    item.classList.add('todoItem');
    item.innerHTML = `
        <input type="checkbox">
        <div> </div>
        <input type="button" value="X">
    `
    document.getElementById('toDoList').appendChild(item);

}