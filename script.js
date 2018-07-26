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
    var newTaskItem = document.createElement('input')
    newTaskItem.type = 'checkbox'
    newTaskItem.value = task.value
    newTaskItem.id = 'taskCheck'
    taskItems.push(newTaskItem)

    newTaskItem.onclick = function () {
  		var doneTasksList = document.getElementById('doneTasks')
  		for (let i = 0; i < newDiv.childNodes.length - 1; i++) {
  			newDiv.childNodes[i].disabled = true
  		}
  		doneTasksList.appendChild(newDiv)
  	}

    var newTaskLabel = document.createElement('label')
    newTaskLabel.textContent = task.value
    newTaskLabel.htmlFor = 'taskCheck'
    taskItems.push(newTaskLabel)

    var optionButton = document.createElement('button')
    optionButton.type = 'button'
    optionButton.textContent = 'Options'
    optionButton.classList.add = 'options'
    taskItems.push(optionButton)

    var noteLabel = document.createElement('label')
    noteLabel.textContent = 'Notes'
    noteLabel.htmlFor = 'note'
    noteLabel.classList.add = 'options'
    noteLabel.hidden = true
    taskItems.push(noteLabel)
    var taskNote = document.createElement('textarea')
    taskNote.id = 'note'
    taskNote.classList.add = 'options'
    taskNote.hidden = true
    taskItems.push(taskNote)

   	var dueDateLabel = document.createElement('label')
   	dueDateLabel.textContent = 'Due Date'
   	dueDateLabel.htmlFor = 'taskDueBy'
   	dueDateLabel.classList.add = 'options'
   	dueDateLabel.hidden = true
   	taskItems.push(dueDateLabel)
   	var dueDate = document.createElement('input')
   	dueDate.type = 'date'
   	dueDate.id = 'taskDueBy'
   	dueDate.classList.add = 'options'
   	dueDate.hidden = true
   	taskItems.push(dueDate)

   	var priorityLabel = document.createElement('label')
   	priorityLabel.textContent = 'Priority'
   	priorityLabel.htmlFor = 'Priority'
   	priorityLabel.classList.add = 'options'
   	priorityLabel.hidden = true
   	taskItems.push(priorityLabel)
   	var prioritySelect = document.createElement('select')
   	prioritySelect.id = 'Priority'
   	prioritySelect.classList.add = 'options'
   	prioritySelect.hidden = true
   	taskItems.push(prioritySelect)
   	var lowPrior = document.createElement('option')
   	lowPrior.textContent = 'Low'
   	var medPrior = document.createElement('option')
   	medPrior.textContent = 'Medium'
   	var highPrior = document.createElement('option')
   	highPrior.textContent = 'High'
   	prioritySelect.appendChild(lowPrior)
   	prioritySelect.appendChild(medPrior)
   	prioritySelect.appendChild(highPrior)

   	var deleteButton = document.createElement('button')
   	deleteButton.type = 'button'
   	deleteButton.textContent = 'Delete'
   	deleteButton.classList.add = 'options'
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

    task.value = ''
  }
})
