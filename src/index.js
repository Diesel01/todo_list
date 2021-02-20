import { projectFactory, taskFactory, deleteObj } from './factories.js';
import { editIcon, addIcon, deleteIcon, checkIcon, expandIcon } from "./iconsSVG.js";
import { format, parseISO, differenceInDays } from 'date-fns'; 

const today = new Date()
document.getElementById('todayDiv').innerHTML = `Today is ${format(today, "PPPP", 1)}`

const project1 = projectFactory("High priority", '#0047FF', [], 3);
const project2 = projectFactory("Moderate priority", '#0047FF', [], 2);
const project3 = projectFactory("Low priority", '#0047FF', [], 1); 

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

//Might want to separate DOM logic in another module 
const editProject = (project) =>{ 
    let newProjectName = document.getElementById("editProjectName").value; 
    let newProjectColor = document.getElementById("editProjectColor").value; 
    let newProjectPriority = document.getElementById("editProjectPriority").value; 
        let newPriorityNumber = parseInt(newProjectPriority)

    project.name = newProjectName; 
    project.color = newProjectColor; 
    project.priority = newPriorityNumber; 
}

const editProjectDiv = (project) =>{ 
    let newProjectName = document.getElementById("editProjectName").value; 
        if (newProjectName == "") { alert('Please give your task a project name'); return }
    let newProjectColor = document.getElementById("editProjectColor").value; 
    let newProjectPriority = document.getElementById("editProjectPriority").value; 
        let newPriorityNumber = parseInt(newProjectPriority)

    let projectDiv = document.getElementById("div-"+project.name); 
        projectDiv.id = "div-"+newProjectName; 
    
    let h3 = document.getElementById("h3-"+project.name); 
        h3.id = "h3-"+newProjectName; 
        h3.innerHTML = newProjectName; 
        h3.style.color = newProjectColor; 

    let tasksDiv = document.getElementById("tasks-"+project.name); 
        tasksDiv.id = "tasks-"+newProjectName;

    let newPriorityDiv = document.getElementById("priorityProjs"+newPriorityNumber)
        newPriorityDiv.appendChild(projectDiv)

    for (let i = 5; i>=1; i--){
        let taskDiv = document.getElementById(i + "tasks-" + project.name); 
        taskDiv.id = i + "tasks-" + newProjectName; 
    }
}

const setUpEditProjectDiv = (project) => {
    let newProjectName = document.getElementById("editProjectName"); 
        newProjectName.value = project.name
    let newProjectColor = document.getElementById("editProjectColor"); 
        newProjectColor.value = project.color
    let newProjectPriority = document.getElementById("editProjectPriority"); 
        newProjectPriority.value = project.priority; 
   
    document.getElementById('editProjectDiv').hidden = false; 

    let editProjDivBtn = document.getElementById("editProjBtn"); 
        editProjDivBtn.onclick = function(){ 
            editProjectDiv(project);
            editProject(project); 
            document.getElementById('editProjectDiv').hidden = true; 
        }
}

const createProjTaskDiv = (project) => { 
    let projectDiv = document.getElementById("div-"+project.name); 

    let projMainTaskDiv = document.createElement("div"); 
        projMainTaskDiv.id = "tasks-"+project.name;
        projectDiv.appendChild(projMainTaskDiv); 
        projMainTaskDiv.hidden = true;

    for (let i = 5; i>=1; i--){
        let taskDiv = document.createElement("div"); 
        taskDiv.id = i + "tasks-" + project.name; 
        projMainTaskDiv.appendChild(taskDiv)
    }
}

let thisProjectObj; 
const createProjectDiv = (project) => { 
    let priorityDiv = document.getElementById("priorityProjs"+project.priority)

    let projectDiv = document.createElement("div"); 
        projectDiv.id = "div-"+project.name; 
    priorityDiv.appendChild(projectDiv)

    let projectHeaderDiv = document.createElement("div"); 
        projectDiv.appendChild(projectHeaderDiv);
        projectHeaderDiv.id = "divHeader-"+project.name; 
        projectHeaderDiv.className = "priorityProj projectDiv";

    let expandBtn = document.createElement("button"); 
        expandBtn.className = 'expandBtn'; 
        expandBtn.innerHTML = expandIcon; 
        expandBtn.addEventListener("click", function(){ hideShow("tasks-"+project.name) }) 
        projectHeaderDiv.appendChild(expandBtn)

    let h3 = document.createElement("h3"); 
        h3.id = "h3-"+project.name; 
        h3.innerHTML = project.name;
        h3.style.color = project.color;
        projectHeaderDiv.appendChild(h3);

    let btnDivs = document.createElement("div"); 
        btnDivs.className = "btnDiv"; 
        projectHeaderDiv.appendChild(btnDivs); 

    let addTaskBtn = document.createElement("button")
        addTaskBtn.innerHTML = addIcon 
        addTaskBtn.onclick = function() { 
            document.getElementById("createTaskDiv").hidden = false; 
            thisProjectObj = project;
            console.log(`${project.name}: `)
            console.log(project)  
        }
        btnDivs.appendChild(addTaskBtn); 

    let editProjectBtn = document.createElement("button")
        editProjectBtn.innerHTML = editIcon
        editProjectBtn.onclick = function(){
            setUpEditProjectDiv(project)
        }   
        btnDivs.appendChild(editProjectBtn)

    // let tasksDiv = document.createElement("div");
    //     tasksDiv.id = "tasksDiv-"+project.name; 
    // projectDiv.appendChild(tasksDiv)   
    
    let deleteProjectBtn = document.createElement("button")
        deleteProjectBtn.innerHTML = deleteIcon
        deleteProjectBtn.onclick = function() { 
            if (project.tasks.length !== undefined){
                for (let i = 0; i < project.tasks.length; i++) { deleteObj(project.tasks[i]) }; 
            }
            deleteObj(project); projectDiv.remove();
        }
        btnDivs.appendChild(deleteProjectBtn)

    createProjTaskDiv(project);
}

const createProjectFromForm = () => { 
    let thisProjectName = document.getElementById("projectName").value; 
        if (thisProjectName == ""){ alert("Please give your project a valid name"); return }
    let thisProjectColor = document.getElementById("projectColor").value; 
    let thisProjectPriority = document.getElementById("projectPriority").value; 
    
    let thisProject = projectFactory(thisProjectName, thisProjectColor, [], thisProjectPriority); 
    
    createProjectDiv(thisProject); 

    // document.getElementById("projectForm").reset()
}

const addProjBtn = document.getElementById("addProjBtn"); 
addProjBtn.addEventListener('click', function(){ document.getElementById("createProjectDiv").hidden = false})

const submitProjBtn = document.getElementById("submitProjBtn"); 
submitProjBtn.addEventListener("click", function(){ createProjectFromForm(); document.getElementById("createProjectDiv").hidden = true; }) 

const checkDueWeek = (taskName, taskDueDate) => { 
    if (0 <= differenceInDays(taskDueDate, today) && differenceInDays(taskDueDate, today) <= 7){ 
        let li = document.createElement("li"); 
            li.innerHTML = taskName + " - " + format(taskDueDate, "MMM, dd, yyyy (cccc)", 1); 
            li.id = `${taskName}-${taskDueDate}`
        document.getElementById("dueTasksList").appendChild(li)
    }
}

const editTask = (task) => { 
    let editTaskName = document.getElementById("editTaskName").value; 
    let editTaskColor = document.getElementById("editTaskColor").value; 
    let editTaskChecklist = document.getElementById("editTaskChecklist").value; 
    let editTaskImportance = document.getElementById("editTaskImportance").value; 
        let newImportanceNumber = parseInt(editTaskImportance); 
    let editTaskDueDate = document.getElementById("editTaskDueDate").value;  

    task.name = editTaskName;
    task.color = editTaskColor;
    task.addChecklistItem(editTaskChecklist);
    task.importance = newImportanceNumber;
    task.dueDate = editTaskDueDate;
}

const editTaskDiv = (task) => { 
    let editTaskName = document.getElementById("editTaskName").value; 
        if (editTaskName == "") { alert('Please give your task a valid name'); return }
    let editTaskColor = document.getElementById("editTaskColor").value; 
    let editTaskChecklist = document.getElementById("editTaskChecklist").value; 
    let editTaskImportance = document.getElementById("editTaskImportance").value; 
        let newImportanceNumber = parseInt(editTaskImportance); 
    let editTaskDueDate = document.getElementById("editTaskDueDate").value; 

    let input = document.getElementById(task.name); 
        input.id = editTaskName; 
    
    let label = document.getElementById("label-"+task.name); 
        label.id = "label-"+editTaskName; 
        label.innerHTML = editTaskName;
        label.style.color = editTaskColor; 
    
    let checklistDiv = document.getElementById("checklistDiv-"+task.name);
        checklistDiv.id = "checklistDiv-"+editTaskName; 
        if (editTaskChecklist !== "") { 
            let inputChecklist = document.createElement('input'); 
                inputChecklist.type = "checkbox";
                inputChecklist.id = editTaskChecklist;
                inputChecklist.name = editTaskChecklist;
            checklistDiv.appendChild(inputChecklist); 

            let labelChecklist = document.createElement('label'); 
                labelChecklist.htmlFor = editTaskChecklist;
                labelChecklist.id = "label-"+editTaskChecklist; 
                labelChecklist.innerHTML = editTaskChecklist; 
                labelChecklist.style.color = task.color; 
            checklistDiv.appendChild(labelChecklist);  
        }
    
    let due = document.getElementById( "due-"+task.name); 
        let taskDate = parseISO(editTaskDueDate)
        due.innerHTML = "Due on "+format(taskDate, "MMM, dd, yyyy - cccc", 1); 
        due.id = "due-"+editTaskName;
    
    let taskDiv = document.getElementById("div-"+task.name); 
        taskDiv.id = "div-"+editTaskName;
        if (editTaskDueDate !== task.dueDate){ 
            document.getElementById(`${task.name}-${parseISO(task.dueDate)}`).remove(); 
            taskDiv.onload = checkDueWeek(editTaskName, taskDate) 
        } 
        
    let thisTasksProjDiv = document.getElementById(task.importance+"tasks-"+task.project.name); 
        thisTasksProjDiv.removeChild(taskDiv); 
    
    let newImportanceDiv = document.getElementById(newImportanceNumber+"tasks-"+task.project.name)
        newImportanceDiv.appendChild(taskDiv)
}

const setUpEditTaskDiv = (task) => { 
    let editTaskName = document.getElementById("editTaskName");
        editTaskName.value = task.name;  
    let editTaskColor = document.getElementById("editTaskColor"); 
        editTaskColor.value = task.color;   
    let editTaskChecklist = document.getElementById("editTaskChecklist"); 
        editTaskChecklist.value = "";
    let editTaskImportance = document.getElementById("editTaskImportance"); 
        editTaskImportance.value = task.importance; 
    let editTaskDueDate = document.getElementById("editTaskDueDate"); 
        editTaskDueDate.value = task.dueDate; 

    document.getElementById("editTaskDiv").hidden = false; 

    let editTaskBtn1 = document.getElementById("editTaskBtn"); 
        editTaskBtn1.onclick = function(){ 
            editTaskDiv(task); 
            editTask(task); 
            document.getElementById("editTaskDiv").hidden = true; 
        }
}

const addTaskToProjectDiv = (task) => { 
    let thisTasksDiv = document.createElement("div"); 
        thisTasksDiv.id = "div-"+task.name; 
        thisTasksDiv.className = "taskDiv";
    
    let thisProject = task.project; 

    let input = document.createElement('input'); 
        input.type = "checkbox";
        input.className = "taskCheck"
        input.id = `${task.name}`;
        input.name = `${task.name}`;
        input.onclick = function(){ task.finished = input.checked; console.log(task.name + " is finished: " + task.finished ); console.log(thisProject.tasks)}
        

    let label = document.createElement('label'); 
        label.htmlFor = `${task.name}`;
        label.id = "label-"+task.name; 
        label.innerHTML = task.name; 
        label.style.color = task.color; 

    let due = document.createElement("p");
            let taskDate = parseISO(task.dueDate)
            due.innerHTML = "Due on "+format(taskDate, "MMM, dd, yyyy - cccc", 1); 
            due.id = "due-"+task.name;
            due.className = "dueTask"
        
    let checklistBtn = document.createElement("button"); 
        checklistBtn.innerHTML = checkIcon; 
        checklistBtn.addEventListener("click", function(){ hideShow("checklistDiv-"+task.name) })

    let editTaskBtn = document.createElement("button"); 
        editTaskBtn.innerHTML = editIcon; 
        editTaskBtn.onclick = function(){ setUpEditTaskDiv(task); } 

    let deleteTaskBtn = document.createElement("button"); 
        deleteTaskBtn.onclick = function(){ deleteObj(task, thisProject); input.remove(); label.remove(); deleteTaskBtn.remove(); editTaskBtn.remove(); thisTasksDiv.remove() }  
        deleteTaskBtn.innerHTML = deleteIcon; 
    
    let firstDiv = document.createElement("div"); 
        firstDiv.appendChild(input); 
        firstDiv.appendChild(label);
        thisTasksDiv.appendChild(firstDiv); 
    
    let secondDiv = document.createElement("div");
        secondDiv.appendChild(due);
        thisTasksDiv.appendChild(secondDiv); 

    let thirdDiv = document.createElement("div"); 
        thirdDiv.className = "taskBtnsDiv";
        thirdDiv.appendChild(checklistBtn);
        thirdDiv.appendChild(editTaskBtn);
        thirdDiv.appendChild(deleteTaskBtn);
        thisTasksDiv.appendChild(thirdDiv);

    let thisTasksProjDiv = document.getElementById(task.importance+"tasks-"+thisProject.name); 
        thisTasksProjDiv.appendChild(thisTasksDiv); 

    thisTasksDiv.onload = checkDueWeek(task.name, taskDate)
}

const createChecklistDiv = (task) => { 
    let checklistArray = task.checklist; 

    let taskDiv = document.getElementById("div-"+task.name); 

    if (checklistArray !== []){ 
        let checklistDiv = document.createElement('div');
            checklistDiv.id = "checklistDiv-"+task.name; 
            checklistDiv.hidden = true;  

        for (let i = 0; i < checklistArray.length; i++) {
            let input = document.createElement('input'); 
                input.type = "checkbox";
                input.id = checklistArray[i];
                input.name = checklistArray[i];
            checklistDiv.appendChild(input); 

            let label = document.createElement('label'); 
                label.htmlFor = checklistArray[i];
                label.id = "label-"+checklistArray[i]; 
                label.innerHTML = checklistArray[i]; 
                label.style.color = task.color; 
            checklistDiv.appendChild(label);  
        }
        taskDiv.appendChild(checklistDiv); 
    }
}

const createTaskFromForm = () => { 
    let thisTaskName = document.getElementById("taskName").value;
    let thisTaskColor = document.getElementById("taskColor").value; 
    let thisTaskChecklist = document.getElementById("taskChecklist").value; 
    let thisTaskImportance = document.getElementById("taskImportance").value; 
    let thisTaskDueDate = document.getElementById("taskDueDate").value;  
    
    let newTask = taskFactory(thisTaskName, thisTaskColor, thisProjectObj, [], thisTaskImportance, thisTaskDueDate); 
   
    thisProjectObj.tasks = newTask; 

    newTask.addChecklistItem(thisTaskChecklist)

    console.log(`${thisProjectObj.name}'s tasks: `)
    console.log(thisProjectObj.tasks);

    addTaskToProjectDiv(newTask); 

    createChecklistDiv(newTask);

    document.getElementById("createTaskDiv").hidden = true; 

    // document.getElementById("taskForm").reset(); 
}
const submitTaskBtn = document.getElementById("submitTaskBtn");
submitTaskBtn.addEventListener("click", function(){ createTaskFromForm();} )

createProjectDiv(project1)
createProjectDiv(project2)
createProjectDiv(project3)
