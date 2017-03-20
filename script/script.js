
		window.onload=function(){
   		document.getElementById("plus-btn").addEventListener("click", replace);
		document.getElementById("min-btn").addEventListener("click", replace);
		document.getElementById("mul-btn").addEventListener("click", replace);
		document.getElementById("divison_btn").addEventListener("click",replace);

		document.getElementById("dot-btn").addEventListener("click", singleDot);

    		}


    		// input the value of the button to the calculator screen function
			function inputvalue(btnobj) {
			// get btn val
			var input = btnobj.value ;
			// not to start array
			var noStart = [ "+", "÷", "×"];
			// all operation signs array
			var signs = [ "-" , "+", "÷", "×"];
			// calculator screen value
			var calc_screen = document.getElementById("demo").innerHTML;
			
			
			// not to enter (+ , ÷ or ×) in the beggining of the screen 
			if(!calc_screen[0] && noStart.indexOf(input) != -1){
				document.getElementById("demo").innerHTML = "" ;
				} else {
				//concatenate to the screen 
				document.getElementById("demo").innerHTML += input ;
				}
			// writing negative sign in the beginning
			if (calc_screen[0] == "-" && calc_screen.length == 1 && ( signs.indexOf(input) != -1 ) ) {
				document.getElementById("demo").innerHTML = "-" ;
				}
			
			// clear screen on clicking C btn
			if(!input){
				document.getElementById("demo").innerHTML = "" ;
				}
			}
			
		
		
		
			// replace sign function to change the operation
			function replace(){
				// calculator screen value
			var calc_screen = document.getElementById("demo").innerHTML;
				// the sign we want to replace
			var beforeLastLetter = calc_screen.substring(calc_screen.length-2 , calc_screen.length -1) ;
				// the new sign
			var lastLetter = calc_screen.substring(calc_screen.length -1) ;			
				// signs array
			var signs = [ "-" , "+", "÷", "×"];
				// the whole screen value except the signs we want replace and we want replace to
			var remain = calc_screen.substring(0, calc_screen.length -2);
				
			// delete the before last letter and print the last letter if both are signs 
			if (signs.indexOf(beforeLastLetter) > -1 && signs.indexOf(lastLetter) > -1) {
				document.getElementById("demo").innerHTML = (remain) + lastLetter;
				}
			
			}


			//write just one dot bofore or after any sign  
			function singleDot() {
			// calculator screen value
			var calc_screen = document.getElementById("demo").innerHTML;
			// calculatoe screen length
			var screen_numbers = document.getElementById("demo").innerHTML.length;	
			// button input
			var input = this.value;
			// whole string after deleting the last letter
			var deleteLast = calc_screen.substring(0, calc_screen.length -1);
			// signs array
			var signs = [ "-" , "+", "÷", "×"];
			// signs length
			var length = signs.length;
			var c=0
			// variable to calculate the last index for last element from signs array
			var last_index=0;

				while(length >0 ) {
 				
 				 length--;
				
				 if(calc_screen.lastIndexOf(signs[length]) > calc_screen.lastIndexOf(signs[length-1])){
 				
 				  c = calc_screen.lastIndexOf(signs[length]);
 				
 				}else{
				   c = calc_screen.lastIndexOf(signs[length-1])
				 }
 
 				if(c>last_index){
 				   last_index = c;
 				 }
 				  }
					
			if (last_index <= 0) {

					if (  calc_screen.lastIndexOf(".") > calc_screen.indexOf(".")) {
						
						document.getElementById("demo").innerHTML = deleteLast ;
					}
				
				}	else {
					// all written letters after last sign
				 var afterSign = calc_screen.slice(last_index+1, calc_screen.length);
				  	// all written letters before last sign containing the sign
				 var beforeSign = calc_screen.slice(0,last_index+1);
					// all written letters after sign but with deleteing the input 
				var deleteLastSign = afterSign.substring(0, afterSign.length -1);
				 
				 if (afterSign.lastIndexOf(".") > afterSign.indexOf(".")) {		
					document.getElementById("demo").innerHTML =beforeSign+deleteLastSign ;
					}
				}
			}



			// get result function 
		function result() {
			// calculator screen value
			var calc_screen = document.getElementById("demo").innerHTML;
			// variable to find the last letter
			var lastLetter = calc_screen.substring(calc_screen.length -1) ;
			// signs array
			var signs = [ "-" , "+", "÷", "×"];
			// input
			var input = this.value;


			if (signs.indexOf(lastLetter) > -1) {
					// if the last letter is a sign , deleting the last letter the calculate
					removeLast();
					calculate();
				} else {
					calculate();
				}
				if(!calc_screen){
					// not to give anything if there is nothing on the screen
				document.getElementById("demo").innerHTML = "" ;
				}
				
			}
		
			// function to remove the last letter if it was a sign
		function removeLast() {
			var calc_screen = document.getElementById("demo").innerHTML;
			var notDeleted = calc_screen.substring(0, calc_screen.length -1);
			document.getElementById("demo").innerHTML = notDeleted;
		}

			// function to calculate the operation
		function calculate() {
			var calc_screen = document.getElementById("demo").innerHTML;
			var c = calc_screen.replace("×","*");
			var c2 = c.replace("÷" , "/");
			var sum = eval(c2);
			document.getElementById("demo").innerHTML = sum ;
		}