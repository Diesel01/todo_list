const projectFactory = (name, color, tasks, priority) =>{
    
    let pName = name; 
    let pColor = color; 
    let pTasks = tasks; 
    let pPriority = priority; 
    
    return { get name() { return pName }, 
            get color() { return pColor },
            get tasks() { return pTasks }, 
            get priority() { return pPriority}, 

            set name(name) { if (name != ""){ pName = name } else { alert('Please give your project a valid name'); return } },
            set color(color) { pColor = color },

            set tasks (newTask) { 
                if (Array.isArray(newTask) == true){ 
                    for (let i = 0; i< newTask.length; i++) {
                        tasks.splice(0, 0, newTask[i])
                    }
                //i dont think this 'else' is really necessary. We could just have an array with one element
                } else if (typeof newTask == "string" || typeof newTask == "object"){
                    tasks.splice(0, 0, newTask)
                }
            }, 

            set priority (priority) { 
                if (typeof priority == "number" && 0<= priority <= 3){
                    pPriority = priority; 
                    return priority
        
                }else{ alert("Please insert a priority value between 0 and 5")}
            }
        }
}

const taskFactory = (name, color, project, checklist, importance, dueDate, finished) =>{
    
    let tName = name; 
    let tColor = color; 
    let tProject = project; 
    let tChecklist = checklist; 
    let tImportance = importance; 
    let tDueDate = dueDate;  
    let tFinished = false; 

    const addChecklistItem = (item) => {
        if (typeof item == "string" && item !== ""){
            tChecklist.splice(0, 0, item)
            return tChecklist
        }
    }

    const deleteChecklistItem = (item) => { 
        for (let i = 0; i< tChecklist.length; i++){
            if (tChecklist[i] === item){ tChecklist.splice(i, 1) }
        }
    }

    return { get name() { return tName }, 
            get color() { return tColor }, 
            get project() { return tProject }, 
            get checklist() { return tChecklist }, 
            get importance() { return tImportance }, 
            get dueDate() { return tDueDate }, 
            get finished() { return tFinished }, 

            set name(name) { if (name != ""){ tName = name } else { alert('Please give your project a valid name'); return } },
            set color(color) { tColor = color }, 
            set project(project) { tProject = project; project.tasks = task }, 
            set dueDate(dueDate) { tDueDate = dueDate }, 
            set importance(importance) { tImportance = importance }, 
            set finished(finished) { tFinished = finished }, 
            
            addChecklistItem, deleteChecklistItem
        }
}

//This function only requires a "project" argument if the object to be deleted is a task
//Else, the second argument is not necessary
const deleteObj = (obj, project) => { 
    for (let prop in obj) { delete obj[prop] }

    if (project !== undefined){
        let projectTasks = project.tasks;
        for (let i = 0; i < projectTasks.length; i++){
            if (projectTasks[i] === obj) { projectTasks.splice(i, 1) }
        }
    }
}

export { projectFactory,  taskFactory, deleteObj }
