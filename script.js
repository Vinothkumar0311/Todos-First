//Select form
var form = document.getElementById("form");
//getting input form inputfield
var input = document.getElementById("input");
//getting id to listing value in html
var forward = document.getElementById("list");

//Getting the data form localstorage
let list = JSON.parse(localStorage.getItem('list')) || [];

let listLength = list.length;
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

});

//-----------------         Function to add a value               ------------------
function add() {
    let inputValue = input.value;
    //checking duplicate value
    var isDuplicate = list.some((store) => store.value.toUpperCase() === inputValue.toUpperCase());
    //Checking the input is empty or not empty
    if (inputValue.length == 0) {
        popupNotification("Enter the text to add into list");
    }
    //Checking the duplicate value before storig list
    else if (isDuplicate) {
        popupNotification("This value already entered in list");
    }
    //Adding and editing
    else {
        if (EditList >= 0) {
            list = list.map((q, index) => ({
                ...q,
                value: index == EditList ? inputValue : q.value,
            }))
            EditList = -1;
            // Changing the button "+" after saving the value
            document.getElementById('btn').innerHTML = "+";
            // Clearing the inputfield after edting the value
            input.value = '';
            popupNotification("Changes has been saved in list");
        }
        else {
            // To store the value
            list.push({
                value: inputValue,
                checked: false
            });
            // Clearing the Inputfield after entering the value
            input.value = '';
            listLength += 1;
            popupNotification("Your new todo task has been added");
        }
    }
}

// --------------                 Functio to add a todo's --------------------------------------------
function addingTodo() {
    // Checking list of length is or not to show a msg
    if (list.length == 0) {
        forward.innerHTML = '<center style="font-size:x-large;">Your Todo List has been empty</center>';
        return;
    }
    // Clear the list before enter the value
    forward.innerHTML = '';
    // Adding values to list
    list.forEach((todo, index) => {
        forward.innerHTML += `
        <div class="listview" id=${index}>
        <input type="checkbox" class="checkbox" data-action="check" >
        <p class="">${todo.value}</p>  
        <button class="btnedit bi bi-pencil-square" data-action="edit"></button>
        <button class="btndelete bi bi-trash" data-action="delete"></button>          
        </div>`;
    });

    // Showing length in list
    if (listLength > 0) {
        document.getElementById('listValue').innerHTML = "Value in Todo List = " + listLength;
    }

}

//------------------------------       AddEventListener for edit and delete in listView     --------------------------
forward.addEventListener('click', (event) => {

    var target = event.target;
    var click = target.parentNode;
    if (click.className !== 'listview') return;
    // Getting id to Edit or Delete the value in list
    var wl = click.id;
    // Getting action form the list button 
    var action = target.dataset.action;
    //Calling function to Edit nor delete
    // action == 'check' && checkList(wl);
    action == 'edit' && editList(wl);
    action == 'delete' && deleteList(wl);
});

// -------------------------------      Completed Function                                 ------------------------------------------
// function checkList(wl) {
//     list = list.map((todo, index) => ({
//         ...todo,
//         checked: index == wl ? !todo.checked : todo.checked,
//     }));

//     addingTodo();
//     localStorage.setItem('list', JSON.stringify(list));
// }


// ------------------------------            Editlist function          --------------------------------------------
function editList(wl) {
    document.getElementById('btn').innerHTML = "save";
    input.value = list[wl].value;
    EditList = wl;
}

//------------------------           Deleting Function while delete a value in list          --------------------------
function deleteList(wl) {
    var con = confirm("Are you sure you want to delete this todo?");
    //Checking condition is true or false
    if (con) {
        list = list.filter((h, index) => wl != index);
        //Calling Function changes in list
        listLength -= 1;
        addingTodo();
        if (listLength == 0) {
            document.getElementById('listValue').innerHTML = " ";
        }
        popupNotification("Todo has been delete")
        localStorage.setItem('list', JSON.stringify(list));
    }
}

//----------------------     Popup message ----------------------------

function popupNotification(msg) {

    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 1500);

}