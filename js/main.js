var inputBox = document.getElementById("getData");
var addBtn = document.getElementById("addBtn");
var addBtn1 = document.getElementById("addBtn1");
var todoList = document.getElementById("todoList");
var pendingTasks = document.getElementById("pendingTasks");
var deleteAllBtn = document.getElementById("clearBtn");
var todoListArr;
var currentIndex;
if (localStorage.getItem("list") == null) {
    todoListArr = [];
} else {
    todoListArr = JSON.parse(localStorage.getItem("list"));
    display();
}

inputBox.onkeyup = () => {
    var userData = inputBox.value;
    if (userData.trim() != 0) {
        addBtn.classList.add("active");
        addBtn1.classList.add("active");
    } else {
        addBtn.classList.remove("active");
        addBtn1.classList.remove("active");
    }
}
addBtn.onclick = () => {
    addData();
    display();
    clearForm();

}
addBtn1.onclick = () => {
    update();
}
deleteAllBtn.onclick = () => {
    deleteAll()
}

//creat
function addData() {
    var enteredData = inputBox.value;
    todoListArr.push(enteredData);
    localStorage.setItem("list", JSON.stringify(todoListArr));

}

function display() {
    pendingTasks.innerHTML = todoListArr.length;
    var cartona = "";
    for (var i = 0; i < todoListArr.length; i++) {
        cartona += `
                    <li onclick="getInfo(${i})">${todoListArr[i]}<span></span><i onclick="deleteTask(${i})" class=" fas fa-trash text-white bg-danger p-3 rounded-end position-absolute top-0 end-0"></i></li>
        `
    }
    todoList.innerHTML = cartona;
    checkDeleteAll();
}
//clearForm
function clearForm() {
    inputBox.value = "";
}
//deleteAll
function checkDeleteAll() {
    if (todoListArr.length > 0) {
        deleteAllBtn.classList.add("active");
    } else {
        deleteAllBtn.classList.remove("active");
    }

}

function deleteAll() {
    todoListArr = [];
    localStorage.setItem("list", JSON.stringify(todoListArr));
    display();
}
//deleteOneTask
function deleteTask(index) {
    todoListArr.splice(index, 1);
    display();
    localStorage.setItem("list", JSON.stringify(todoListArr));
}
//update
function getInfo(index) {
    currentIndex = index;
    var indexData = todoListArr[index];
    inputBox.value = indexData;
}

function update() {

    var indexData = inputBox.value;
    todoListArr[currentIndex] = indexData;
    localStorage.setItem("list", JSON.stringify(todoListArr));
    display();
    addBtn.classList.remove("active");
    addBtn1.classList.remove("active");
}