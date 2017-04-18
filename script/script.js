/**
 * code for calculator project
 *
 */

// strict mode to introduce better error checking in the code
"use strict";



// flag used in single dot function
var dot_flag = true;

/**
 * Remove the last letter
 *
 * @return void
 */

function remove_last() {
    // calculator screen value
    var calc_screen = document.getElementById("demo").innerHTML;

    //delete the last letter
    document.getElementById("demo").innerHTML
        = calc_screen.substring(0, calc_screen.length - 1);
}

/**
 * Control calculator screen, get the clicked button value to the screen and clear screen
 *
 * @return void
 */
var input_value = function () {
    // vars
    var input = this.innerHTML, // clicked btn val
        calc_screen = document.getElementById("demo").innerHTML, // calculator screen value
        not_start = ["+", '÷', "x"]; // the screen mustn't start with this array items


    // clear screen if first input from @not_star else type input
    if (!calc_screen && not_start.indexOf(input) >= 0 || input == "C") {
        document.getElementById("demo").innerHTML = "";
        dot_flag = true;
    } else {
        document.getElementById("demo").innerHTML += input;
    }
};

/**
 * Prevent repeating signs and adds zero if there is ( . ) before the sign
 *
 * @return void
 */
function prevent_repeating() {
    //vars
    var input = this.innerHTML,  // clicked btn val
        calc_screen = document.getElementById("demo").innerHTML, // calculator screen value
        signs = ["-", "+", "÷", "x"]; // signs array

    // deleting last letter if this letter is a sign and the input is a sign also
    if (signs.indexOf(calc_screen[calc_screen.length - 1]) >= 0 && signs.indexOf(input) >= 0) {
        remove_last();
    }

    // add 0 to last character if . exists
    if (calc_screen[calc_screen.length - 1] === '.') {
        //delete the last letter
        document.getElementById("demo").innerHTML = calc_screen + '0';
    }
    // green light to add dot after writing any sign .
    dot_flag = true;
}

/**
 * write just one dot before any sign
 *
 * @return void
 */

function single_dot() {

    var calc_screen = document.getElementById("demo").innerHTML; // calculator screen value

    // write dot if the flag is true
    if (dot_flag === true) {
        document.getElementById("demo").innerHTML = calc_screen + ".";
        //stop adding dots after writing one .
        dot_flag = false;
    }

}


/**
 * Main calculation function
 *
 * @return void
 */
function calculate() {

    // calculator screen value
    var calc_screen = document.getElementById("demo").innerHTML;

    // evaluating
    document.getElementById("demo").innerHTML = eval((calc_screen.replace(/x/g, "*")).replace(/÷/g, "/"));
}

/**
 * Get result
 *
 * @return void
 */
function result() {
    //vars
    var calc_screen = document.getElementById("demo").innerHTML, // calculator screen value
        signs = ["-", "+", "÷", "x"]; // signs array


    // if the last char is a sign , delete last letter then calculate
    if (signs.indexOf(calc_screen[calc_screen.length - 1]) >= 0) {
        remove_last();
        calculate();
    } else {
        calculate();
    }

    //if the screen is empty
    if (!calc_screen) {
        document.getElementById("demo").innerHTML = "";
    }
}


/**
 *
 * add event listeners to clicked buttons for all program functions
 */
window.onload = function () {
    var i; //loop counter

    var operations_array = ["plus-btn", "min-btn", "mul-btn", "division_btn"];

    // add event listener to operations buttons
    for (i = 0; i < operations_array.length; i++) {
        document.getElementById(operations_array[i]).addEventListener("click", prevent_repeating);
    }


    var buttons = document.querySelectorAll("button");
    // add event listener to all buttons except (delete(i=1) , dot(i=12) and result(i=13))
    for (i = 0; i < buttons.length; i++) {
        if (i == 1 || i == 12 || i == 13) {
            continue;
        }
        buttons[i].onclick = input_value;
    }

    // add event listener to other buttons
    document.getElementById("result").addEventListener("click", result);
    document.getElementById("dot-btn").addEventListener("click", single_dot);
    document.getElementById("delete").addEventListener("click", remove_last);
};
