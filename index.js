const add_button = document.getElementById('add')
const inp_text = document.querySelector('.input-text')
const maindiv = document.querySelector('.show-div')

let todos = []

let localstrhai = localStorage.getItem('Todoarray')

if (localstrhai !== null){
  let data = JSON.parse(localstrhai)
  todos = data
  ELementDekhaDo()
}

add_button.addEventListener("click", () => {
  const finalValue = inp_text.value
  inp_text.value = ""
  if (finalValue === "") {
    alert('Kya re....')
    return
  }
  let todo = {
    id: Date.now(),
    todotext: finalValue
  }
  todos.push(todo)
  
  console.log(todos)
  localStorage.setItem("Todoarray", JSON.stringify(todos))
  ELementDekhaDo() 
})

function ELementDekhaDo() {
  maindiv.innerHTML = ''
  
  for (let i = 0; i < todos.length; i++) {
    let div = document.createElement('div')
    let span = document.createElement('span')
    let edit_button = document.createElement('button')
    let del_button = document.createElement('button')
    
    span.textContent = todos[i].todotext 
    edit_button.textContent = 'Edit'
    del_button.textContent = 'Delete'
    edit_button.className = 'edit'
    del_button.className = 'del'
    
    del_button.dataset.id = todos[i].id
    edit_button.dataset.id = todos[i].id

    div.appendChild(span)
    div.appendChild(edit_button)
    div.appendChild(del_button)
    
    maindiv.appendChild(div)
  
  del_button.addEventListener('click',function(){
    const todoId = Number(this.dataset.id)
    todos = todos.filter(todo => todo.id !== todoId)
    localStorage.setItem("Todoarray", JSON.stringify(todos))
    ELementDekhaDo()
  })
  edit_button.addEventListener('click',()=>{
    if (edit_button.innerText == 'Edit'){
      span.setAttribute("contenteditable", "true")
      edit_button.innerText = 'Save'
    }
    else{
      console.log("this conditon hit")
      let updatetodo = span.innerText
      todos = todos.map(ele => 
        ele.id === Number(edit_button.dataset.id) 
          ? { ...ele, todotext: updatetodo } 
          : ele
      )
      span.setAttribute("contenteditable", "false")
      edit_button.innerText = 'Edit'
      localStorage.setItem("Todoarray", JSON.stringify(todos))
    }
  })
  }
  
}