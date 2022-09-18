let elForm = document.querySelector(".form");
let elInp = elForm.querySelector(".input");
let elList = document.querySelector(".list");
let localTodo = JSON.parse(window.localStorage.getItem("item"))
let todos = localTodo || []
createTodos(todos, elList)

elList.addEventListener("click", evt => {
  if (evt.target.matches(".inp")) {
    let checkId = evt.target.dataset.todoID
    let findCheck = todos.find(todo => todo.id == checkId)
    findCheck.isComplate = !findCheck.isComplate
    createTodos(todos, elList)
    window.localStorage.setItem("list", JSON.stringify(todos))
  }
  if (evt.target.matches(".btn-danger") ) {
    let btnId =  evt.target.dataset.todoID
    let deletee = todos.findIndex(todo => todo.id == btnId)
    todos.splice(deletee, 1)
    createTodos(todos, elList)
    window.localStorage.setItem("list", JSON.stringify(todos))
  }
})



function createTodos(arr, element) {
  element.innerHTML = ""
  arr.forEach(todo => {
    let li = document.createElement("li")
    let strong = document.createElement("strong")
    let cheack = document.createElement("input")
    let delBtn = document.createElement("button")

    strong.textContent = todo.title
    cheack.type = "checkbox"
    cheack.className = "inp"
    cheack.dataset.todoID = todo.id

    delBtn.textContent = "Delete"
    delBtn.dataset.todoID = todo.id

    delBtn.className = "btn btn-danger"
    li.append(strong, cheack, delBtn)
    element.appendChild(li)

    if (todo.isComplate) {
      li.classList.toggle("text-decoration-line-through")
    }
  });


}

elForm.addEventListener("submit", evt => {
  evt.preventDefault()
  elInpValue = elInp.value.trim().toLowerCase()

  let todo = {
    id: todos.length,
    title: elInpValue,
    isComplate: false
  }
  createTodos(todos, elList)
  todos.push(todo)
  window.localStorage.setItem("list", JSON.stringify(todos))
  // elInp.value = focus()
  elInp.value = ""
  console.log(todos);
})