const btns = document.querySelectorAll(".btns");
const add_task = document.querySelector(".add_task");
const list = document.querySelector(".list");
const text_compl = document.querySelector(".completed");

let tasks = JSON.parse(localStorage.getItem("tasks"));

function compl(){
    const compl_tasks = tasks.filter((obj)=>{
        return (obj.checked);
    });
    text_compl.textContent = `${compl_tasks.length}/${tasks.length} completed`;
}
compl();
function appHtmlChild(parent,child){
    parent.appendChild(child);
}

function addTask(task){
    tasks.push(task);
    saveTasks();
}

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function render(){
    list.innerHTML = "";
    tasks.forEach((value,index) => {
        const div = document.createElement("div");
        div.className = "item";
        const check = document.createElement("input");
        check.type = "checkbox";
        check.className = "check";
        check.checked = value.checked;
        check.dataset.index = index;
        const title = document.createElement("h2");
        title.className = "text";
        title.textContent = value.name;
        const remove_btn = document.createElement("button");
        remove_btn.className = "remove";
        remove_btn.dataset.index = index;
        remove_btn.textContent = "remove";

        appHtmlChild(div,check);
        appHtmlChild(div,title);
        appHtmlChild(div,remove_btn);
        appHtmlChild(list,div);
    });
}

render();
btns.forEach((btn)=>{
    btn.addEventListener("click", (e) =>{
        if(e.target.textContent === "Add task" && add_task.value !== ""){
            addTask({name:add_task.value,checked:false});
            render();
            add_task.value = "";
            compl();
        }else if(e.target.textContent === "Filter"){
            tasks = tasks.filter((obj)=>{
                return !(obj.checked);
            });
            saveTasks();
            render();
            compl();
        }   
    })
});

list.addEventListener("click", (e)=>{
    if(e.target.className === "check"){
        const index = e.target.dataset.index;
        tasks[index].checked = !tasks[index].checked;
        saveTasks();  
        compl();  
    } else if(e.target.className === "remove"){
        const index = e.target.dataset.index;
        tasks.splice(index,1);
        saveTasks();
        render();
        compl();
    }
})