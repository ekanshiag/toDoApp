var allTasks = []
var taskObj = {}
var task = document.getElementById('newTask')
var openTasks = document.getElementById('tasks')
var closedTasks = document.getElementById('doneTasks')

var myStorage = window.localStorage
if (localStorage.getItem('tasks') !== null) {
  allTasks = JSON.parse(localStorage.getItem('tasks'))
}

window.addEventListener('load', () => {
  displayTasks()
  task.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      if (/[\w]+/.exec(task.value) === null) {
        return
      }
      taskObj = createNewTaskObj(task.value)
      allTasks.push(taskObj)
      localStorage.setItem('tasks', JSON.stringify(allTasks))
      displayNewTask(taskObj)
      task.value = ''
    }
  })
})

function displayTasks () {
  for (let i = 0; i < allTasks.length; i++) {
    let taskDiv = createNewTaskDiv(allTasks[i])
    taskDiv['className'] === 'open' ? openTasks.appendChild(taskDiv) : closedTasks.appendChild(taskDiv)
  }
}

function displayNewTask (taskObj) {
  let taskDiv = createNewTaskDiv(taskObj)
  openTasks.appendChild(taskDiv)
}
function createNewTaskObj (desc) {
  return ({'desc': desc, 'category': 'open'})
}

function createNewTaskDiv (task) {
  let newDiv = document.createElement('div')
  newDiv['className'] = task['category']
  let taskItems = []

  var newTaskItem = createCustomElement('input', 'checkbox', 'taskCheck', task['desc'])
  taskItems.push(newTaskItem)

  newTaskItem.addEventListener('click', () => {
    newTaskItem.parentNode['className'] = newTaskItem.parentNode['className'] === 'open' ? 'closed' : 'open'
    newDiv['className'] === 'open' ? openTasks.appendChild(newDiv) : closedTasks.appendChild(newDiv)
  })

  var newTask = createCustomElement('p', null, null, null, task['desc'])
  taskItems.push(newTask)

  newTask.addEventListener('onDblClick', () => {
    let x = prompt('Edit task:')
    if (x !== '' && x !== null) {
      newTask.textContent = x
    }
  })

  var optionButton = createCustomElement('button', 'button', 'options', null, '^')
  taskItems.push(optionButton)

  var optionDiv = document.createElement('div')
  let options = []

  var noteLabel = createCustomLabel('Notes', 'note', 'notePointer')
  options.push(noteLabel)

  var taskNote = createCustomElement('textarea', null, 'note')
  options.push(taskNote)

  var dueDateLabel = createCustomLabel('Due Date', 'taskDueBy', 'dueDatePointer')
  options.push(dueDateLabel)

  var dueDate = createCustomElement('input', 'date', 'taskDueBy')
  options.push(dueDate)

  var priorityLabel = createCustomLabel('Priority', 'Priority', 'priorityPointer')
  options.push(priorityLabel)

  var prioritySelect = createCustomElement('select', null, 'Priority')
  options.push(prioritySelect)

  var lowPriorOption = createCustomElement('option', null, null, null, 'Low')
  var medPriorOption = createCustomElement('option', null, null, null, 'Medium')
  var highPriorOption = createCustomElement('option', null, null, null, 'High')
  prioritySelect.appendChild(lowPriorOption)
  prioritySelect.appendChild(medPriorOption)
  prioritySelect.appendChild(highPriorOption)

  var deleteButton = createCustomElement('button', 'button', 'delete', null, 'Delete')
  options.push(deleteButton)

  deleteButton.addEventListener('click', () => {
    newDiv.remove()
  })

  options.forEach(i => optionDiv.appendChild(i))
  optionDiv.hidden = true
  taskItems.push(optionDiv)

  optionButton.addEventListener('click', () => {
    optionDiv.hidden = !optionDiv.hidden
    optionDiv.id = optionDiv.id === 'moreOptions' ? '' : 'moreOptions'
  })

  taskItems.forEach(i => newDiv.appendChild(i))

  return newDiv
}

function createCustomElement (ele, type, id, value, textContent) {
  var element = document.createElement(ele)
  if (type) element.type = type
  if (value) element.value = value
  if (textContent) element.textContent = textContent
  if (id) element.id = id
  return element
}

function createCustomLabel (textContent, ele, id) {
  var label = document.createElement('label')
  label.textContent = textContent
  label.htmlFor = ele
  if (id) label.id = id
  return label
}
