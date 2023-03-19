//Select form
var form = document.getElementById("form");
//getting input form inputfield
var input = document.getElementById("input");
//array to store the values
let list = [];
//submit
form.addEventListener('submit', function (event) {
    event.preventDefault();

    add();
    //console.log('submit')
})

//function to add
function add() {
    let inputValue = input.value;

    //checking duplicate value
    var isDuplicate = list.some((store) => store.value.toUpperCase() === inputValue.toUpperCase() );

    //Checking the input is empty or not empty
    if (inputValue.length == 0) {
        alert("Enter the text to add into list");
    }
    else if(isDuplicate){
        alert("This value already entered in list");
    }
    else {
        //to store the value
        let store = {
            value: inputValue,
            checked: false
        }

        list.push(store);

        console.log(list);
    }



}