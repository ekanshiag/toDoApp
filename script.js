var allTasks = []
var tasksDone = []

var task = document.getElementById('newTask')
task.addEventListener('keypress', (event) => {
  const keyName = event.key
  if (keyName === 'Enter') {
  	if (task.value === '') {
  		do {
  			task.value = prompt('Task cannot be empty')
  		} while (task.value === '')
  	}
    var tasks = document.getElementById('tasks')
    var newDiv = document.createElement('div')
    let taskItems = []

    var newTaskItem = createCustomElement('input', 'checkbox', 'taskCheck', task.value, null)
 	taskItems.push(newTaskItem)

    newTaskItem.onclick = function () {
  		var doneTasksList = document.getElementById('doneTasks')
  		for (let i = 0; i < newDiv.childNodes.length - 1; i++) {
  			if (i === 2) {
  				continue
  			}
  			newDiv.childNodes[i].disabled = true
  		}
  		doneTasksList.appendChild(newDiv)
  	}

    var newTaskLabel = createCustomLabel(task.value, 'taskCheck')
    taskItems.push(newTaskLabel)

    var optionButton = createCustomElement('button', 'button', 'options', null, '^')
    taskItems.push(optionButton)

    var noteLabel = createCustomLabel('Notes', 'note')
    noteLabel.hidden = true
    taskItems.push(noteLabel)

    var taskNote = createCustomElement('textarea', null, 'note')
    taskNote.hidden = true
    taskItems.push(taskNote)

   	var dueDateLabel = createCustomLabel('Due Date', 'taskDueBy')
   	dueDateLabel.hidden = true
   	taskItems.push(dueDateLabel)

   	var dueDate = createCustomElement('input', 'date', 'taskDueBy')
   	dueDate.hidden = true
   	taskItems.push(dueDate)

   	var priorityLabel = createCustomLabel('Priority', 'Priority')
   	priorityLabel.hidden = true
   	taskItems.push(priorityLabel)

   	var prioritySelect = createCustomElement('select', null, 'Priority')
   	prioritySelect.hidden = true
   	taskItems.push(prioritySelect)

   	var lowPriorOption = createCustomElement('option', null, null, null, 'Low')
   	var medPriorOption = createCustomElement('option', null, null, null, 'Medium')
   	var highPriorOption = createCustomElement('option', null, null, null, 'High')
   	prioritySelect.appendChild(lowPriorOption)
   	prioritySelect.appendChild(medPriorOption)
   	prioritySelect.appendChild(highPriorOption)

   	var deleteButton = createCustomElement('button', 'button', null, null, 'Delete')
   	deleteButton.hidden = true
   	taskItems.push(deleteButton)

   	deleteButton.onclick = function () {
  		newDiv.parentNode.removeChild(newDiv)
  	}

   	optionButton.onclick = function () {
   		if (noteLabel.hidden) {
   			noteLabel.hidden = false
   			taskNote.hidden = false
   			dueDateLabel.hidden = false
   			dueDate.hidden = false
   			priorityLabel.hidden = false
   			prioritySelect.hidden = false
   			deleteButton.hidden = false
   		} else {
   			noteLabel.hidden = true
   			taskNote.hidden = true
   			dueDateLabel.hidden = true
   			dueDate.hidden = true
   			priorityLabel.hidden = true
   			prioritySelect.hidden = true
   			deleteButton.hidden = true
   		}
   	}

   	for (let i = 0; i < taskItems.length; i++) {
   		newDiv.appendChild(taskItems[i])
   	}

    tasks.appendChild(newDiv)

    let newTask = {}
    newTask['des'] = task.value
    newTask['class'] = 'left'
    newTask['Priority'] = task.Priority
    allTasks.push(newTask)

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

function createCustomLabel (textContent, ele) {
  var label = document.createElement('label')
  label.textContent = textContent
  label.htmlFor = ele
  return label
}
