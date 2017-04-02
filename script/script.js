//add event listeners to  buttons on window load
window.onload = function () {
	document.getElementById("plus-btn").addEventListener("click", replace);
	document.getElementById("min-btn").addEventListener("click", replace);
	document.getElementById("mul-btn").addEventListener("click", replace);
	document.getElementById("divison_btn").addEventListener("click", replace);
	document.getElementById("dot-btn").addEventListener("click", inputValue);

	document.getElementById("dot-btn").addEventListener("click", singleDot);

	document.getElementById("zero").addEventListener("click", inputValue);

	document.getElementById("one").addEventListener("click", inputValue);
	document.getElementById("two").addEventListener("click", inputValue);
	document.getElementById("three").addEventListener("click", inputValue);

	document.getElementById("four").addEventListener("click", inputValue);
	document.getElementById("five").addEventListener("click", inputValue);
	document.getElementById("six").addEventListener("click", inputValue);

	document.getElementById("seven").addEventListener("click", inputValue);
	document.getElementById("eight").addEventListener("click", inputValue);
	document.getElementById("nine").addEventListener("click", inputValue);

	document.getElementById("plus-btn").addEventListener("click", inputValue);
	document.getElementById("min-btn").addEventListener("click", inputValue);
	document.getElementById("mul-btn").addEventListener("click", inputValue);
	document.getElementById("divison_btn").addEventListener("click", inputValue);

	document.getElementById("clear").addEventListener("click", inputValue);
	document.getElementById("delete").addEventListener("click", removeLast);

	document.getElementById("result").addEventListener("click", result);
};

// global variables
// signs array
var signs = ["-", "+", "÷", "×"];

/**
 * function to remove the last letter
 *
 * @return void
 */
function removeLast() {
	// calculator screen value
	var calc_screen = document.getElementById("demo").innerHTML;
	//delete the last letter
	document.getElementById("demo").innerHTML = calc_screen.substring(0, calc_screen.length - 1);
}


/**
 * input the value of the button to the calculator screen
 *
 * @return void
 */
function inputValue() {
	// get btn val
	var input = this.value;
	// calculator screen value
	var calc_screen = document.getElementById("demo").innerHTML;
	// not to start array
	var notStart = ["+", "÷", "×"];

	// not to write (+ or ÷ or x ) in the beginning and clear button
	if (!calc_screen && notStart.indexOf(input) >= 0 || !input) {
		document.getElementById("demo").innerHTML = "";

		//write the input in the screen
	} else {
		document.getElementById("demo").innerHTML += input;
	}

	// negative sign in the beginning
	calc_screen = calc_screen + input;
	if (calc_screen[0] === "-" && signs.indexOf(input) >= 0) {
		document.getElementById("demo").innerHTML = "-";
	}
}


/**
 * replace signs function to change the operation
 *
 * @return void
 */
function replace() {
	var input = this.value;
	// calculator screen value
	var calc_screen = document.getElementById("demo").innerHTML;
	// deleting last letter if this letter is a sign and the input is a sign also.
	if (signs.indexOf(calc_screen[calc_screen.length - 1]) >= 0 && signs.indexOf(input) >= 0) {
		removeLast();
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
function singleDot() {
	// calculator screen value
	var calc_screen = document.getElementById("demo").innerHTML;

	// whole string after deleting the last letter
	var deleteLast = calc_screen.substring(0, calc_screen.length - 1);
	// signs length
	var length = signs.length;
	var c = 0;
	// variable to calculate the last index for last element from signs array
	var last_index = 0;

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

			document.getElementById("demo").innerHTML = deleteLast;
		}

	} else {
		// all written letters after last sign
		var afterSign = calc_screen.slice(last_index + 1, calc_screen.length);
		// all written letters before last sign containing the sign
		var beforeSign = calc_screen.slice(0, last_index + 1);
		// all written letters after sign but with deleteing the input
		var deleteLastSign = afterSign.substring(0, afterSign.length - 1);

		if (afterSign.lastIndexOf(".") > afterSign.indexOf(".")) {
			document.getElementById("demo").innerHTML = beforeSign + deleteLastSign;
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
	document.getElementById("demo").innerHTML = eval((calc_screen.replace("×", "*")).replace("÷", "/"));

}

/**
 * get result function
 *
 * @return void
 */
function result() {
	// calculator screen value
	var calc_screen = document.getElementById("demo").innerHTML;
	// variable to find the last letter
	if (signs.indexOf(calc_screen[calc_screen.length - 1]) >= 0) {
		// if the last letter is a sign , deleting the last letter then calculate
		removeLast();
		calculate();
	} else {
		calculate();
	}
	if (!calc_screen) {
		//if the screen is empty
		document.getElementById("demo").innerHTML = "";
	}

}

