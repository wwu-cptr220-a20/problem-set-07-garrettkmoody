'use strict';

/* your code goes here! */
class Task {

  constructor(newDescription, newBool) {
    this.description = newDescription;
    this.complete = newBool;
  }

  getTask() {
    return this.description;
  }
  render() {
    let doc = document.createElement('li');
    doc.addEventListener("click", () => {

      this.toggleFinished();
      doc.classList.toggle("font-strike");

    });
    doc.textContent = this.description;
    if(this.complete) {
      doc.classList.add("font-strike");
    }
    return doc;
  }

  toggleFinished() {
    if(this.complete) {
      this.complete = false;
    } else {
      this.complete = true;
    }
  }
}

class TaskList {

  constructor(tasks) {
    this.tasks = tasks;
  }

  addTask(description) {
    this.tasks.push(new Task(description, false));
  }

  render() {
    let doc = document.createElement('ol');
    this.tasks.forEach(element => {
      doc.appendChild(element.render());
    });
    return doc;
  }
  
}

class NewTaskForm {

  constructor(func) {
    this.submitCallback = func;
  }
  render() {
    let doc = document.createElement('form');
    let eInput = document.createElement('input');
    let eButton = document.createElement('button');
    eInput.classList.add("form-control", "mb-3");
    eInput.setAttribute("placeholder", "What else do you have to do?");
    eButton.classList.add("btn", "btn-primary");
    eButton.textContent = "Add task to list";

    eButton.addEventListener("click", (event) => {
      addTaskToList(eInput.value);
      event.preventDefault();
    });

    doc.appendChild(eInput);
    doc.appendChild(eButton);
    return doc;
  }
}

class App {
  constructor(parentElement, taskList) {
    this.parentElement = parentElement;
    this.taskList = taskList;
  }

  render() {
    this.parentElement.appendChild(this.taskList.render());
    let newTaskForm = new NewTaskForm();
    this.parentElement.appendChild(newTaskForm.render());
  }

  addTaskToList(description) {
    this.taskList.addTask(description);
    while (this.parentElement.firstChild) {
     this.parentElement.removeChild(this.parentElement.lastChild);
      }
    this.render();
    
      }

}

let blankArr = [];
let newTaskList = new TaskList(blankArr);
newTaskList.addTask("Make some classes");
newTaskList.addTask("Arrow some functions");
newTaskList.tasks[0].toggleFinished();
let ref = document.querySelector("#app");
let newApp = new App(ref, newTaskList);
newApp.render();

//Make functions and variables available to tester. DO NOT MODIFY THIS.
if(typeof module !== 'undefined' && module.exports){
  /* eslint-disable */
  if(typeof Task !== 'undefined') 
    module.exports.Task = Task;
  if(typeof TaskList !== 'undefined') 
    module.exports.TaskList = TaskList;
  if(typeof NewTaskForm !== 'undefined') 
    module.exports.NewTaskForm = NewTaskForm;
  if(typeof App !== 'undefined') 
    module.exports.App = App;
}
