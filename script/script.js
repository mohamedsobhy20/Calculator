function inputvalue(btnobj) {
				// get btn val
			var input = btnobj.value ;
			// not to start array
			var noStart = [ "+", "÷", "×"];
			var signs = [ "-" , "+", "÷", "×"];
			
			// screen val
			var calc_screen = document.getElementById("demo").innerHTML;
			
			
			// concatenate to screen
			if(!calc_screen[0] && noStart.indexOf(input) != -1){
				document.getElementById("demo").innerHTML = "" ;
			}else{
				document.getElementById("demo").innerHTML += input ;
			}
			// writing negative sign in the beginning
			if (calc_screen[0] == "-" && calc_screen.length == 1 && ( signs.indexOf(input) != -1 ) ) {
				document.getElementById("demo").innerHTML = "-" ;
			}
			
			// console.log(calc_screen.length >= 5);
			// // maximum numbers of characters
			// if (calc_screen.length >= 15) {
			// 	document.getElementById("demo").innerHTML = calc_screen.slice(0 , calc_screen.length);

			// }
			
			
			
			// clear screen on clicking C btn
			if(!input){
				document.getElementById("demo").innerHTML = "" ;
			}
		}
			// replace sign function
		
			window.onload=function(){
   		 document.getElementById("plus-btn").addEventListener("click", replace);
		document.getElementById("min-btn").addEventListener("click", replace);
		document.getElementById("mul-btn").addEventListener("click", replace);
		document.getElementById("divison_btn").addEventListener("click",replace);

		document.getElementById("dot-btn").addEventListener("click", singleDot);

    		}

		
			
			function replace(){
			var calc_screen = document.getElementById("demo").innerHTML;
			var beforeLastLetter = calc_screen.substring(calc_screen.length-2 , calc_screen.length -1) ;
			var lastLetter = calc_screen.substring(calc_screen.length -1) ;
			// signs array
			var signs = [ "-" , "+", "÷", "×"];
			var input = this.value;
			var remain = calc_screen.substring(0, calc_screen.length -2);
			
			if (signs.indexOf(beforeLastLetter) > -1 && signs.indexOf(input) > -1) {
				
				document.getElementById("demo").innerHTML = (remain) + input;
				}
			
			}


/////////////////////////////////////////////////////////////////////////////////////////////

	// dot function 

		function singleDot() {
			var calc_screen = document.getElementById("demo").innerHTML;
			var screen_numbers = document.getElementById("demo").innerHTML.length;	
			var input = this.value;

			var deleteLast = calc_screen.substring(0, calc_screen.length -1);


					
			if (calc_screen.lastIndexOf("+") < 0) {

					if (  calc_screen.lastIndexOf(".") > calc_screen.indexOf(".")) {
						
						document.getElementById("demo").innerHTML = deleteLast ;
					}
				
				}	else {

						 var afterSign = calc_screen.slice(calc_screen.lastIndexOf("+")+1, calc_screen.length);
						 var beforeSign = calc_screen.slice(0,calc_screen.lastIndexOf("+")+1);
						 
						var deleteLastSign = afterSign.substring(0, afterSign.length -1);
						

						 if (  afterSign.lastIndexOf(".") > afterSign.indexOf(".")) {
						
						document.getElementById("demo").innerHTML =beforeSign+deleteLastSign ;
					}
					 	


				}

}






		
		




/////////////////////////////////////////////////////////////////////////////////////////////////
				// get result function 
		function result() {
			var calc_screen = document.getElementById("demo").innerHTML;
			var lastLetter = calc_screen.substring(calc_screen.length -1) ;
			var signs = [ "-" , "+", "÷", "×"];
			var input = this.value;


			if (signs.indexOf(lastLetter) > -1) {
				removeLast();
				calculate();
			} else {
			calculate();
			}
			if(!calc_screen){
				document.getElementById("demo").innerHTML = "" ;
			}
			
		}
		function removeLast() {
			var calc_screen = document.getElementById("demo").innerHTML;
			var notDeleted = calc_screen.substring(0, calc_screen.length -1);
			document.getElementById("demo").innerHTML = notDeleted;
		}

		function calculate() {
			var calc_screen = document.getElementById("demo").innerHTML;
			var lastLetter = calc_screen.substring(calc_screen.length -1) ;
			var signs = [ "-" , "+", "÷", "×"];
			var c = calc_screen.replace("×","*");
			var c2 = c.replace("÷" , "/");
			var sum = eval(c2);
			document.getElementById("demo").innerHTML = sum ;
		}