//using strict mode
"use strict";

//add event listeners to  buttons on window load
window.onload = function () {
    var i;

    var operations_array = [ "plus-btn","min-btn","mul-btn","division_btn" ];
        for ( i = 0; i < operations_array.length; i++ ) {
            document.getElementById(operations_array[i]).addEventListener( "click", replace );
        }

    var buttons_array = [ "plus-btn","min-btn","mul-btn","division_btn","dot-btn","zero","one","two",
						"three","four","five","six","seven","eight","nine","plus-btn","min-btn",
                        "mul-btn","division_btn","clear" ];
        for ( i = 0; i < buttons_array.length; i++ ) {
		    document.getElementById(buttons_array[i]).addEventListener( "click", input_value );
        }

	document.getElementById("dot-btn").addEventListener( "click", single_dot );
	document.getElementById("delete").addEventListener( "click", remove_last );
	document.getElementById("result").addEventListener( "click", result );
};

/**
 * function to remove the last letter
 *
 * @return void
 */
function remove_last() {
	// calculator screen value
	var calc_screen = document.getElementById("demo").innerHTML;
	//delete the last letter
	document.getElementById("demo").innerHTML = calc_screen.substring( 0, calc_screen.length - 1 );
}

/**
 * input the value of the button to the calculator screen
 *
 * @return void
 */
function input_value() {

	var input, calc_screen, signs, not_start;

        input = this.value; // get btn val
	    calc_screen = document.getElementById("demo").innerHTML; // calculator screen value
	    signs = ["-", "+", "÷", "x"]; // signs array
	    not_start = ["+", "÷", "x"]; // not to start array

	// not to write (+ or ÷ or x ) in the beginning and clear button
	if ( ! calc_screen && not_start.indexOf(input) >= 0 || ! input ) {
		document.getElementById("demo").innerHTML = "";

		//write the input in the screen
	} else {
		document.getElementById("demo").innerHTML += input;
	}

	// negative sign in the beginning
	calc_screen = calc_screen + input;
	if ( calc_screen[0] === "-" && signs.indexOf(input) >= 0 ) {
		document.getElementById("demo").innerHTML = "-";
	}
}

/**
 * replace signs function to change the operation
 *
 * @return void
 */
function replace() {
	var input, calc_screen, signs;

        input = this.value; // get btn val
	    calc_screen = document.getElementById("demo").innerHTML; // calculator screen value
	    signs = [ "-", "+", "÷", "x" ]; // signs array

	// deleting last letter if this letter is a sign and the input is a sign also.
	if (signs.indexOf(calc_screen[ calc_screen.length - 1 ]) >= 0 && signs.indexOf(input) >= 0) {
		remove_last();
	}

	// add 0 to last char if . exists
	if (calc_screen[calc_screen.length - 1] === '.') {
		//delete the last letter
		document.getElementById("demo").innerHTML = calc_screen + '0';
	}
}

/**
 * write just one dot before or after any sign
 *
 * @return void
 */
function single_dot() {

	var calc_screen, signs, length, c, last_index;

        calc_screen = document.getElementById("demo").innerHTML; // calculator screen value
        signs = [ "-", "+", "÷", "x"]; // signs array
	    length = signs.length; // signs length
	    c = 0; // random variable to store the last index value in while loop
        last_index = 0; // variable to store the last index for last element from signs array

	while (length > 0) {

		length--;

		if (calc_screen.lastIndexOf(signs[length]) > calc_screen.lastIndexOf(signs[length - 1])) {

			c = calc_screen.lastIndexOf(signs[length]);

		} else {
			c = calc_screen.lastIndexOf(signs[length - 1])
		}

		if (c > last_index) {
			last_index = c;
		}
	}

	if (last_index <= 0) {

		if (calc_screen.lastIndexOf(".") > calc_screen.indexOf(".")) {
		
			 remove_last();
		}

	} else {
		var after_sign, delete_last_sign ;

        // all written letters after last sign
		  after_sign = calc_screen.slice(last_index + 1, calc_screen.length);
        // all written letters after sign but with deleting the input
        delete_last_sign = after_sign.substring(0, after_sign.length - 1);

        // all written letters before last sign containing the sign
		//  calc_screen.slice(0, last_index + 1);


		if (after_sign.lastIndexOf(".") > after_sign.indexOf(".")) {
			document.getElementById("demo").innerHTML = calc_screen.slice(0, last_index + 1) + delete_last_sign;
		}
	}
}


/**
 * function to calculate the operation
 *
 * @return void
 */
function calculate() {
	// calculator screen value
	var calc_screen = document.getElementById("demo").innerHTML;
	document.getElementById("demo").innerHTML = eval( (calc_screen.replace( "x","*" )).replace( "÷", "/" ) );

}

/**
 * get result function
 *
 * @return void
 */
function result() {
    var calc_screen, signs;

	calc_screen = document.getElementById("demo").innerHTML; // calculator screen value
	signs = [ "-", "+", "÷", "x" ]; // signs array

    // if the last letter is a sign , deleting the last letter then calculate
    if (signs.indexOf(calc_screen[calc_screen.length - 1]) >= 0) {
		remove_last();
		calculate();
	} else {
		calculate();
	}
	if (! calc_screen) { //if the screen is empty
		document.getElementById("demo").innerHTML = "";
	}

}

