var allTasks = []
var taskObj = {}
var task = document.getElementById('newTask')
var tasksToDo = document.getElementById('tasks')
var tasksDone = document.getElementById('doneTasks')
var openTasks = document.getElementById('openTasks')
var closedTasks = document.getElementById('closedTasks')

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
      taskObj = createNewTaskObj(task.value, 'open', '', '', 'Low')
      allTasks.push(taskObj)
      localStorage.setItem('tasks', JSON.stringify(allTasks))
      displayTasks()
      task.value = ''
    }
  })
})

function displayTasks () {
  openTasks.remove()
  openTasks = createCustomElement('div', null, 'openTasks')
  tasksToDo.appendChild(openTasks)

  closedTasks.remove()
  closedTasks = createCustomElement('div', null, 'closedTasks')
  tasksDone.appendChild(closedTasks)

  for (let i = 0; i < allTasks.length; i++) {
    let taskDiv = createNewTaskDiv(allTasks[i])
    taskDiv['className'] === 'open' ? openTasks.appendChild(taskDiv) : closedTasks.appendChild(taskDiv)
  }
}

function createNewTaskObj (desc, category, note, dueDate, priority) {
  return ({'desc': desc, 'category': category, 'notes': note, 'dueDate': dueDate, 'Priority': priority})
}

function createNewTaskDiv (task) {
  let newDiv = document.createElement('div')
  newDiv['className'] = task['category']
  let taskItems = []

  var newTaskItem = createCustomElement('input', 'checkbox', 'taskCheck', task['desc'])
  taskItems.push(newTaskItem)

  newTaskItem.addEventListener('click', () => {
    newTaskItem.parentNode['className'] = newTaskItem.parentNode['className'] === 'open' ? 'closed' : 'open'
    updateStorage(newDiv)
    displayTasks()
  })

  var newTask = createCustomElement('p', null, null, null, task['desc'])
  taskItems.push(newTask)

  newTask.addEventListener('click', () => {
    let x = prompt('Edit task:')
    if (x !== '' && x !== null) {
      newTask.textContent = x
      updateStorage(newDiv)
      displayTasks()
    }
  })

  var optionButton = createCustomElement('button', 'button', 'options', null, '^')
  taskItems.push(optionButton)

  var optionDiv = document.createElement('div')
  let options = []

  var noteLabel = createCustomLabel('Notes', 'note', 'notePointer')
  options.push(noteLabel)

  var taskNote = createCustomElement('textarea', null, 'note', null, task['notes'])
  options.push(taskNote)
  // taskNote.addEventListener('change', updateStorage(newDiv))

  var dueDateLabel = createCustomLabel('Due Date', 'taskDueBy', 'dueDatePointer')
  options.push(dueDateLabel)

  var dueDate = createCustomElement('input', 'date', 'taskDueBy', task['dueDate'])
  options.push(dueDate)

  var priorityLabel = createCustomLabel('Priority', 'Priority', 'priorityPointer')
  options.push(priorityLabel)

  var prioritySelect = createCustomElement('select', null, 'Priority', task['Priority'])
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
    updateStorage(newDiv, 'delete')
  })

  options.forEach(i => optionDiv.appendChild(i))
  optionDiv.hidden = true
  taskItems.push(optionDiv)

  optionButton.addEventListener('click', () => {
    optionDiv.hidden = !optionDiv.hidden
    optionDiv.id = optionDiv.id === 'moreOptions' ? '' : 'moreOptions'
    updateStorage(newDiv)
  })

  taskItems.forEach(i => newDiv.appendChild(i))

  return newDiv
}

function updateStorage (taskDiv, option) {
  let taskElements = taskDiv.childNodes
  let optionElements = taskElements[3].childNodes
  let updatePos = allTasks.findIndex(x => x['desc'] === taskElements[0].value)
  if (option === 'delete') {
    allTasks = allTasks.slice(0, updatePos).concat(allTasks.slice(updatePos + 1))
  } else {
    taskObj = createNewTaskObj(taskElements[1].textContent, taskDiv.className, optionElements[1].value, optionElements[3].value, optionElements[5].value)
    allTasks[updatePos] = taskObj
  }
  localStorage.setItem('tasks', JSON.stringify(allTasks))
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
