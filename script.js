var task = document.getElementById('newTask')
task.addEventListener('keypress', (event) => {
  const keyName = event.key
  if (keyName === 'Enter') {
    if (/[\w]+/.exec(task.value) === null) {
      return
    }
    var tasks = document.getElementById('tasks')
    var newDiv = document.createElement('div')
    let taskItems = []

    var newTaskItem = createCustomElement('input', 'checkbox', 'taskCheck', task.value)
    taskItems.push(newTaskItem)

    newTaskItem.onclick = function () {
      newTaskItem.disabled = true
      var doneTasksList = document.getElementById('doneTasks')
      doneTasksList.appendChild(newDiv)
    }

    var newTask = createCustomElement('p', null, null, null, task.value)
    taskItems.push(newTask)
    newTask.ondblclick = function () {
      let x = prompt('Edit task:')
      if (x !== '' && x !== null) {
        newTask.textContent = x
      }
    }

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

    deleteButton.onclick = function () {
      newDiv.remove()
    }

    for (let i = 0; i < options.length; i++) {
      optionDiv.appendChild(options[i])
    }
    optionDiv.hidden = true
    taskItems.push(optionDiv)

    optionButton.addEventListener('click', () => {
      if (optionDiv.hidden) {
        optionDiv.hidden = false
        optionDiv.id = 'moreOptions'
      } else {
        optionDiv.hidden = true
        optionDiv.id = null
      }
    })

    for (let i = 0; i < taskItems.length; i++) {
      newDiv.appendChild(taskItems[i])
    }

    tasks.appendChild(newDiv)

    task.value = ''
  }
})

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
