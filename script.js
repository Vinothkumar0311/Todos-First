//Select form
var form = document.getElementById("form");
//getting input form inputfield
var input = document.getElementById("input");
//getting id to listing value in html
var forward = document.getElementById("list");

//Getting the data form localstorage
let list = JSON.parse(localStorage.getItem('list')) || [];
//array to store
let EditList = -1;

//Calling function to getvalue in localstorage
addingTodo();

//submit
form.addEventListener('submit', function (event) {
    event.preventDefault();
    //Calling function to add into list
    add();
    //Calling function to viewing list in html
    addingTodo();
    //Adding the data into local storage
    localStorage.setItem('list', JSON.stringify(list));

})

//function to add
function add() {
    let inputValue = input.value;
    //checking duplicate value
    var isDuplicate = list.some((store) => store.value.toUpperCase() === inputValue.toUpperCase());
    //Checking the input is empty or not empty
    if (inputValue.length == 0) {
        document.getElementById('error').innerHTML = "Enter the text to add into list";
    }
    //Checking the duplicate value before storig list
    else if (isDuplicate) {
        document.getElementById('error').innerHTML = "This value already entered in list";
    }
    //Adding and editing
    else {
        if (EditList >= 0) {
            list = list.map((q, index) => ({
                ...q,
                value: index == EditList ? inputValue : q.value,
            }))
            EditList = -1;
        }
        else {
            //to store the value

            list.push({
                value: inputValue,
            });
            input.value = '';
        }
    }
}

function addingTodo() {

    if (list.length == 0) {
        forward.innerHTML = '<center style="font-size:x-large;">Your Todo List has been empty</center>';
        return;
    }

    // CLEAR ELEMENT BEFORE A RE-RENDER
    forward.innerHTML = '';

    // RENDER TODOS
    list.forEach((todo, index) => {
        forward.innerHTML += `
        <div class="listview" id=${index}>
          <p>${todo.value}</p>   
          <button class="btnedit" data-action="edit">Edit</button>
          <button class="btndelete" data-action="delete">Delete</button>
          
        </div>`;
    });
}

//AddEventListener for edit and delete
forward.addEventListener('click', (event) => {
    var target = event.target;
    var click = target.parentNode;

    if (click.className !== 'listview') return;

    var w = click;
    var wl = click.id;

    //action 
    var action = target.dataset.action;

    action == 'edit' && editList(wl);
    action == 'delete' && deleteList(wl);
});

//Editlist function
function editList(wl) {
    input.value = list[wl].value;
    EditList = wl;
}

//Deleting function
function deleteList(wl) {
    var con = confirm("Are you sure you want to delete this todo?");

    if (con) {
        console.log('submit');
        list = list.filter((h, index) => wl != index);
        addingTodo();
        localStorage.setItem('list', JSON.stringify(list));
    }
}