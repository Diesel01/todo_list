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
        h3.className = "name"; 
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
}

export { editProject, editProjectDiv, setUpEditProjectDiv, createProjTaskDiv, thisProjectObj, createProjectDiv, createProjectFromForm }