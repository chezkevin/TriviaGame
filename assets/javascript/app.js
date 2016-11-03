window.onload = function(){
    //click events
    $('#start').click(quiz.start);
};

var counter;
var quiz = {
	numQxn: 0,
	gameOver: false,
	numRight: 0,
	numWrong: 0,
	numUnanswered: 0,
	time: 5,
	timeAsr: 3,
	counter: null,
	counterAsr: null,

	questions: ["1. What is Spider-Man's alter ego?",
				"2. Who is Matt Murdock's partner in law?",
				"3. Which of these is NOT one of Spider-Man's superpowers?",
				"4. In what year did Captain America first appear in comics?",
				"5. Jessica Jones was first introduced in Alias #1, by which creative team?"],
	choices: ["Jon Hamm,Peter Parker,Steve Rogers,Tony Stark",
				"Roy Rogers,Harley Quinn,Oliver Queen,Foggy Nelson",
				"Heightened Senses,Wall-climbing,Spider-size,Web-spinning",
				"1939,1941,1943,1945",
				"Brian Bendis and Michael Gaydos,Brian Bendis and Mark Bagley,Mark Waid and Mark Bagley,Mark Waid and Michael Gaydos"],
	answer: ["Peter Parker",
				"Foggy Nelson",
				"Spider-size",
				"1941",
				"Brian Bendis and Michael Gaydos"],
	answerImage: ['<img src="assets/images/Spider-Man_Unmasked.PNG">',
					'<img src="assets/images/Nelson_and_Murdock.PNG">',
					'<img src="assets/images/spider-size.PNG">',
					'<img src="assets/images/captainamerica.PNG">',
					'<img src="assets/images/jessicajones.PNG">'],

	start: function(){
		$('#start').css("display","none");
		quiz.displayQxn(quiz.numQxn);
	},
	clearQxn: function(){
		$('#data-question').empty();
		$('.radio').empty();
	},
	clearAnswer: function(){
		$('.right-wrong').empty();
		$('.right-answer').empty();
	},
	displayQxn: function(number){
		quiz.time = 5;
		quiz.counter = setInterval(quiz.timerQxn, 1000);
		$('.timer').html("Time remaining: " + quiz.time + " seconds");
		quiz.clearQxn();
		quiz.clearAnswer();
		// If done with all questions, go to final page
		if ( quiz.numQxn >= quiz.questions.length){
			quiz.donePage();
			return;
		}
		$('#data-question').html(quiz.questions[number]);
		quiz.parseChoices(number);
	},
	timerQxn: function(){
    	quiz.time = quiz.time - 1;
    	$(".timer").html("Time remaining: " + quiz.time + " seconds");
    	console.log(quiz.time);
    	if (quiz.time === 0) {
    		clearInterval(quiz.counter);
    		quiz.clearQxn();
    		quiz.isRight(quiz.numQxn,false);
	    }
	    quiz.timeAsr = 3;
	},
	timerAnswer: function(){
    	quiz.timeAsr = quiz.timeAsr - 1;
    	console.log(quiz.timeAsr,"(answer)");
    	if (quiz.timeAsr <= 0) {
    		clearInterval(quiz.counterAsr);
    		quiz.clearQxn();
    		quiz.numQxn = quiz.numQxn + 1;
			quiz.displayQxn(quiz.numQxn);
	    }
	},
	parseChoices: function(number){
		var choiceArray = quiz.choices[number].split(',');
		// Display all choices as radio buttons
		for (var i = 0; i < choiceArray.length; i++){
			var choiceHtmlLabel = $( '<label>' );
			var choiceHtmlInput = $('<input/>').attr({
				type: 'radio',
				name: 'optionsRadios',
				id: choiceArray[i]
			}).appendTo(choiceHtmlLabel);
			choiceHtmlLabel.append(choiceArray[i]);
			$('.radio').append(choiceHtmlLabel);
		}
		quiz.isRight(quiz.numQxn);
	},
	isRight: function(number,isAnswered){
		if (isAnswered === false){
			quiz.numUnanswered = quiz.numUnanswered + 1;
		    quiz.answerPage(number);
		}
		// If user put in right or wrong answer,
		// increment the correct counter, clear timer,
		// and go to answer page
		$("input[name='optionsRadios']").change(function(){
		    if (this.id === quiz.answer[number]) {
		    	quiz.numRight = quiz.numRight + 1;
		    	clearInterval(quiz.counter);
		    	quiz.answerPage(number,true);
		    }
		    else if(this.id != quiz.answer[number]){
		    	quiz.numWrong = quiz.numWrong + 1;
		    	clearInterval(quiz.counter);
		    	quiz.answerPage(number,false);
		    }
		});		
	},
	answerPage: function(number, right){
		quiz.counterAsr = setInterval(quiz.timerAnswer, 1000);
		quiz.clearQxn();
		if (right === true){
			$('.right-wrong').html("Right!");
		}
		else{
			$('.right-wrong').html("Wrong!");
		}
		$('.right-answer').html("The correct answer was: " + quiz.answer[number]);
		$('.right-answer').append("<br>" + quiz.answerImage[number]);
	},
	donePage: function(){
		// Stop all of the timers.
		clearInterval(quiz.counter);
		clearInterval(quiz.counterAsr);
		// Populate HTML for final page.
		$('.all-done').html("All done! Here's how you did!");
		$('.num-right').html("Correct Answers: " + quiz.numRight);
		$('.num-wrong').html("Incorrect Answers: " + quiz.numWrong);
		$('.num-unanswered').html("Unanswered: " + quiz.numUnanswered);
		$('#start-over').css("display","block");
		$('#start-over').html("Start Over?");
		return;
	}
}
