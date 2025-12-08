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

function appHtmlChild(parent,child){
    parent.appendChild(child);
}

function generetId(len){
    const data = "abcdefgijklmnopqrstuvwxyz";

    let id = "";
    for(i = 0; i < len;i++){
        id += data[Math.floor(Math.random() * data.length)];
    }

    return id;
}

function createTaskElement(data,index){
    const div = document.createElement("div");
    div.className = "item";
    div.id = data.ID;
    const check = document.createElement("input");
    check.type = "checkbox";
    check.className = "check";
    check.checked = data.checked;
    check.dataset.index = index;
    const title = document.createElement("h2");
    title.className = "text";
    title.textContent = data.name;
    const remove_btn = document.createElement("button");
    remove_btn.className = "remove";
    remove_btn.textContent = "remove";
    const date_text = document.createElement("span");
    date_text.textContent = "craetion date:" + data.date;
    date_text.className = "date_text";

    appHtmlChild(div,check);
    appHtmlChild(div,title);
    appHtmlChild(div,remove_btn);
    appHtmlChild(div,date_text);
    appHtmlChild(list,div);
}

function addTask(task){
    tasks.push(task);
    createTaskElement(task,tasks.length - 1);
    compl();
    saveTasks();
}

function removeTask(e){
    const item = document.getElementById(e.id);
    console.log(item);
    tasks = tasks.filter((task)=>{
        return !(task.ID === item.id);
    });
    compl();
    saveTasks();
    list.removeChild(item);
       
}

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function render(){
    list.innerHTML = "";
    compl();
    tasks.forEach((task,index) => {
        createTaskElement(task,index);
    });
}

function nowDate(){
    const date = new Date();
    return date.toLocaleDateString() + "-" + date.toLocaleTimeString();
}

render();

btns.forEach((btn)=>{
    btn.addEventListener("click", (e) =>{
        if(e.target.textContent === "Add task" && add_task.value !== ""){
            addTask({name:add_task.value,checked:false,date:nowDate(),ID:generetId(5)});
            add_task.value = "";
        }else if(e.target.textContent === "Filter"){
            tasks = tasks.filter((obj)=>{
                return !(obj.checked);
            });
            saveTasks();
            render();
        }   
    })
});

list.addEventListener("click", (e)=>{
    if(e.target.className === "check"){
        const index = e.target.dataset.index;
        tasks[index].checked = !tasks[index].checked;
        compl();
        saveTasks();  
    } else if(e.target.className === "remove"){
        removeTask(e.target.closest(".item"));
    }
})