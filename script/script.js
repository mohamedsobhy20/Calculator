/**
 * code for calculator project
 *
 */

// strict mode to introduce better error checking in the code
"use strict";



/**
 * Remove the last letter
 *
 * @return void
 */

function remove_last ()
{
    // calculator screen value
    var calc_screen = document.getElementById ( "demo" ).innerHTML;

    //delete the last letter
    document.getElementById ( "demo" ).innerHTML
        = calc_screen.substring ( 0, calc_screen.length - 1 );
}

/**
 * Control calculator screen, get the clicked button value to the screen and clear screen
 *
 * @return void
 */
var input_value = function  ()
{
    // vars
    var input, calc_screen, not_start;
    input       = this.innerHTML; // clicked btn val
    calc_screen = document.getElementById ( "demo" ).innerHTML; // calculator screen value
    not_start   = [ "+", "÷", "x" ]; // the screen mustn't start with this array items


    // clear screen if first input from @not_star else type input
    if ( !calc_screen && not_start.indexOf ( input ) >= 0 || input == "C" ) {
        document.getElementById ( "demo" ).innerHTML = "";
    } else {
        document.getElementById ( "demo" ).innerHTML += input;
    }
    if (input == "=") {
        document.getElementById ( "demo" ).innerHTML =  calc_screen.replace("=","");
    }
}

/**
 * Prevent repeating signs and adds zero if there is ( . ) before the sign
 *
 * @return void
 */
function prevent_repeating ()
{
    //vars
    var input, calc_screen, signs;
    input       = this.innerHTML;  // clicked btn val
    calc_screen = document.getElementById ( "demo" ).innerHTML; // calculator screen value
    signs       = [ "-", "+", "÷", "x" ]; // signs array

    // deleting last letter if this letter is a sign and the input is a sign also
    if ( signs.indexOf ( calc_screen[ calc_screen.length - 1 ] ) >= 0 && signs.indexOf ( input ) >= 0 ) {
        remove_last ();
    }

    // add 0 to last character if . exists
    if ( calc_screen[ calc_screen.length - 1 ] === '.' ) {
        //delete the last letter
        document.getElementById ( "demo" ).innerHTML = calc_screen + '0';
    }
}

/**
 * write just one dot before any sign
 *
 * @return void
 */
function single_dot ()
{
    //vars
    var calc_screen, signs, length, temp_index, last_index;
    calc_screen = document.getElementById ( "demo" ).innerHTML; // calculator screen value
    signs       = [ "-", "+", "÷", "x" ]; // signs array
    length      = signs.length; // signs array length
    temp_index  = 0; //temporary index inside loop
    last_index  = 0; // last sign index

    // get last sign index
    while ( length > 0 ) {
        length--;

        if ( calc_screen.lastIndexOf ( signs[ length ] ) > calc_screen.lastIndexOf ( signs[ length - 1 ] ) ) {
            temp_index	= calc_screen.lastIndexOf ( signs[ length ] );

        } else {
            temp_index = calc_screen.lastIndexOf ( signs[ length - 1 ] )
        }
        if ( temp_index > last_index ) {
            last_index = temp_index;
        }
    }

    // check if a sign exists before dot
    if ( last_index <= 0 ) {
        if ( calc_screen.lastIndexOf ( "." ) > calc_screen.indexOf ( "." ) ) {
            remove_last ();
        }
    } else {
        var after_sign, delete_last_sign;
        // all chars after last sign
        after_sign       = calc_screen.slice ( last_index + 1, calc_screen.length );

        // all chars after sign but with deleting the input
        delete_last_sign = after_sign.substring ( 0, after_sign.length - 1 );
        if ( after_sign.lastIndexOf ( "." ) > after_sign.indexOf ( "." ) ) {
            document.getElementById ( "demo" ).innerHTML = calc_screen.slice ( 0, last_index + 1 ) + delete_last_sign;
        }
    }
}


/**
 * Main calculation function
 *
 * @return void
 */
function calculate () {


    // calculator screen value
    var calc_screen = document.getElementById("demo").innerHTML;

    // evaluating
    document.getElementById("demo").innerHTML = eval((calc_screen.replace("x", "*")).replace("÷", "/"));
}

/**
 * Get result
 *
 * @return void
 */
function result ()
{
    //vars
    var calc_screen, signs;
    calc_screen = document.getElementById ( "demo" ).innerHTML; // calculator screen value
    signs       = [ "-", "+", "÷", "x" ]; // signs array


    // if the last char is a sign , delete last letter then calculate
    if ( signs.indexOf ( calc_screen[ calc_screen.length - 1 ] ) >= 0 ) {
        remove_last ();
        calculate ();
    } else {
        calculate ();
    }

    //if the screen is empty
    if ( !calc_screen ) {
        document.getElementById ( "demo" ).innerHTML = "";
    }

}


/**
 *
 * add event listeners to clicked buttons for all program functions
 */
window.onload = function ()
{
    var i; //loop counter

    var operations_array = [ "plus-btn", "min-btn", "mul-btn", "division_btn" ];

    // add event listener to operations buttons
    for ( i = 0; i < operations_array.length; i++ ) {
        document.getElementById ( operations_array[ i ] ).addEventListener ( "click", prevent_repeating );
    }



    var buttons = document.querySelectorAll("button");
    // add event listener to numbers buttons
    for ( i = 0; i < buttons.length; i++ ) {
        buttons[ i ].onclick = input_value;
    }

    // add event listener to other buttons
    document.getElementById ( "result" ).addEventListener ( "click", result );
    document.getElementById ( "dot-btn" ).addEventListener ( "click", single_dot );
    document.getElementById ( "delete" ).addEventListener ( "click", remove_last );
};
