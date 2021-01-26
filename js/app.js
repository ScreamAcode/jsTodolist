// selectors
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterTodo = document.querySelector(".filter-todo");

//eventlistners
document.addEventListener("DOMContentLoaded",getTodos)
todoBtn.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
filterTodo.addEventListener("click",filter);

// addtodo
function addTodo(event){
    
    event.preventDefault();
    // creating div 
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todoItem");
    todoDiv.appendChild(newTodo);
    // savetodos to localstorage
    saveLocalStorage(todoInput.value);
    // completedBtn
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add("completed-btn");
    todoDiv.appendChild(completedBtn);
    // trashBtn
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);
    // appending todoDiv to todoList
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

// delete and check
function deleteCheck(e){

    const currentItem = e.target;
    if(currentItem.classList[0] === "trash-btn"){
        const todo = currentItem.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
         todo.addEventListener("transitionend",function(){
            todo.remove();
        })
    }

    if(currentItem.classList[0] === "completed-btn"){
        currentItem.parentElement.classList.toggle("completed");
    }

}
// filtering
function filter(e){
    const todos = todoList.childNodes;
    todos.forEach((todo)=>{
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
            break;

            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none"
                }
            break;

            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none"
                }
            break;
        }
    })
}

function saveLocalStorage(todo){

    let todos;
    // Have i already things in storage?
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
// pushing New todo to storage
    todos.push(todo);

// set item to storage
    localStorage.setItem("todos",JSON.stringify(todos));

}

function getTodos(){
    let todos;
    // Have i already things in storage?
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach((todo)=>{
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todoItem");
        todoDiv.appendChild(newTodo);
        // completedBtn
        const completedBtn = document.createElement("button");
        completedBtn.innerHTML = '<i class="fas fa-check"></i>';
        completedBtn.classList.add("completed-btn");
        todoDiv.appendChild(completedBtn);
        // trashBtn
        const trashBtn = document.createElement("button");
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList.add("trash-btn");
        todoDiv.appendChild(trashBtn);
        // appending todoDiv to todoList
        todoList.appendChild(todoDiv);
    })
}

 function removeLocalTodos(todo){

    let todos;
    // Have i already things in storage?
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0];
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}//

// Example

// const fruits = ["apple","orange","cucumber","banana"];
// const fruitsIndex = fruits.indexOf("orange");
// fruits.splice(fruitsIndex,1);
// console.log(fruits);