import { projectFactory, taskFactory, deleteObj } from './factories.js';
import { format } from 'date-fns'; 
import { editProject, editProjectDiv, setUpEditProjectDiv, createProjTaskDiv, thisProjectObj, createProjectDiv, createProjectFromForm } from "./projectDom"
import { checkDueWeek, editTask, editTaskDiv, setUpEditTaskDiv, addTaskToProjectDiv, createChecklistDiv, createTaskFromForm } from "./taskDom";

const today = new Date()
document.getElementById('todayDiv').innerHTML = `Today is ${format(today, "PPPP", 1)}`

const hideShow = (id) =>{ 
    let element = document.getElementById(`${id}`); 
    let value = element.hidden;
    element.hidden = !value; 
}

const closeModalBtn = document.getElementsByClassName("closeModal"); 
    closeModalBtn[0].addEventListener("click", function(){ hideShow("createProjectDiv")})
    closeModalBtn[1].addEventListener("click", function(){ hideShow("editProjectDiv")})
    closeModalBtn[2].addEventListener("click", function(){ hideShow("createTaskDiv")})
    closeModalBtn[3].addEventListener("click", function(){ hideShow("editTaskDiv")})

const addProjBtn = document.getElementById("addProjBtn"); 
    addProjBtn.addEventListener('click', function(){ document.getElementById("createProjectDiv").hidden = false})

const submitProjBtn = document.getElementById("submitProjBtn"); 
    submitProjBtn.addEventListener("click", function(){ createProjectFromForm(); document.getElementById("createProjectDiv").hidden = true; }) 

const submitTaskBtn = document.getElementById("submitTaskBtn");
    submitTaskBtn.addEventListener("click", function(){ createTaskFromForm();} )

const project1 = projectFactory("High priority", '#0047FF', [], 3);
const project2 = projectFactory("Moderate priority", '#0047FF', [], 2);
const project3 = projectFactory("Low priority", '#0047FF', [], 1); 

createProjectDiv(project1)
createProjectDiv(project2)
createProjectDiv(project3)

console.log('hi')