//Select form
var form = document.getElementById("form");
//getting input form inputfield
var input = document.getElementById("input");
//getting id to listing value in html
var forward = document.getElementById("list");

//array to store the values
let list = [];
let EditList = -1;
//submit
form.addEventListener('submit', function (event) {

    event.preventDefault();
    //Calling function to add into list
    add();
    //Calling function to viewing list in html
    listing();

})

//function to add
function add() {
    debugger;
    let inputValue = input.value;
    //checking duplicate value
    var isDuplicate = list.some((store) => store.value.toUpperCase() === inputValue.toUpperCase());
    //Checking the input is empty or not empty
    if (inputValue.length == 0) {
        alert("Enter the text to add into list");
    }
    else if (isDuplicate) {
        alert("This value already entered in list");
    }
    else {
        if (EditList >= 0) {
            list = list.map((todo, index) => ({
                ...todo,
                value: index == EditList ? inputValue : todo.value,
            }))
            EditList = -1;
        }
        else{
        //to store the value

        list.push({
            value: inputValue,
        });
        input.value = '';
    }
    }
}

function listing() {
    //clear
    forward.innerHTML = '';

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

    // var w = click;
    var wl = click.id;

    //action 
    var action = target.dataset.action;

    action == 'edit' && editList(wl);
    // action == 'delete' && deleteList(wl);
});

//Editlist function
function editList(wl) {
    input.value = list[wl].value;
    EditList = wl;
}

//Deleting function
function deleteList(wl) {
    list = list.filter((listview, index) => index !== wl);
    //removeing
}