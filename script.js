const openTasks = document.getElementById('tasks')
const doneTasks = document.getElementById('doneTasks')
const task = document.getElementById('newTask')
let db

window.onload = function () {
  let request = window.indexedDB.open('notes', 1)

  request.onerror = function () {
    console.log('Database failed to open')
  }

  request.onsuccess = function () {
    db = request.result
    display()
  }

  request.onupgradeneeded = function (e) {
    let db = e.target.result
    let objectStore = db.createObjectStore('notes', {keyPath: 'id', autoIncrement: true})

    objectStore.createIndex('tDesc', 'tDesc', {unique: false})
    objectStore.createIndex('tNote', 'tNote', {unique: false})
    objectStore.createIndex('tDue', 'tDue', {unique: false})
    objectStore.createIndex('tPrior', 'tPrior', {unique: false})
    objectStore.createIndex('tState', 'tState', {unique: false})
  }

  task.addEventListener('keypress', (event) => function () {
    if (event.key === 'Enter') {
      if (/[\w]+/.exec(task.value) === null) {
        return
      }

      let newTaskObj = {tDesc: task.value, tNote: '', tDue: '', tPrior: '', tState: 'open'}

      let transaction = db.transaction(['notes'], 'readwrite')

      let objectStore = transaction.objectStore('notes')

      var request = objectStore.add(newTaskObj)
      request.onsuccess = function () {
        task.value = ''
      }

      transaction.onsuccess = function () {
        display()
      }

      transaction.onerror = function () {
        console.log('transaction not opened due to error')
      }
    }
  })

  function display () {
    while (openTasks[0]) {
      openTasks.remove(openTasks[0])
    }

    while (doneTasks[0]) {
      doneTasks.remove(doneTasks[0])
    }

    let objectStore = db.transaction('notes').objectStore('notes')
    objectStore.openCursor().onsuccess = function (e) {
      let cursor = e.target.result

      if (cursor) {
        var newDiv = document.createElement('div')
        let taskItems = []

        var newTaskItem = createCustomElement('input', 'checkbox', 'taskCheck', cursor.value.tDesc)
        taskItems.push(newTaskItem)

        newTaskItem.onclick = function () {
          newTaskItem.disabled = true
          doneTasks.appendChild(newDiv)
        }

        var newTask = createCustomElement('p', null, null, null, cursor.value.tDesc)
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

        deleteButton.onclick = deleteTask()

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

        newDiv.setAttribute('data-note-id', cursor.value.id)
        openTasks.appendChild(newDiv)

        cursor.continue
      }
    }
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
}
