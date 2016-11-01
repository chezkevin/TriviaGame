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
	time: 30,
	questions: ["1. What is Spider-Man's alter ego?",
				"2. Who is Matt Murdock's partner in law?",
				"3. Which of these is NOT one of Spider-Man's superpowers?"],
	choices: ["Jon Hamm,Peter Parker,Steve Rogers,Tony Stark",
				"Roy Rogers,Harley Quinn,Oliver Queen,Foggy Nelson",
				"Heightened Senses,Wall-climbing,Spider-size,Web-spinning"],
	answer: ["Peter Parker",
				"Foggy Nelson",
				"Spider-size"],

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
		quiz.time = 30;
		quiz.clearQxn();
		quiz.clearAnswer();
		if ( quiz.numRight + quiz.numWrong === quiz.questions.length){
			quiz.donePage();
		}
		$('#data-question').html(quiz.questions[number]);
		quiz.parseChoices(number);
		//$('#next').css("display","block");
	},
	parseChoices: function(number){
		var choiceArray = quiz.choices[number].split(',');
		console.log(choiceArray);
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
	isRight: function(number){
		var isRight = false;
		$("input[name='optionsRadios']").change(function(){
			console.log('Your choice: ' + this.id);
			console.log('The right answer: ' + quiz.answer[number]);
		    if (this.id === quiz.answer[number]) {
		    	quiz.numRight = quiz.numRight + 1;
		    	console.log("hey display the page");
		    	quiz.answerPage(number,true);
		    }
		    else if(this.id != quiz.answer[number]){
		    	quiz.numWrong = quiz.numWrong + 1;
		    	quiz.answerPage(number,false);
		    }
		    else{
		    	quiz.answerPage(number);
		    }
		    console.log("numRight: " + quiz.numRight + "   numWrong: " + quiz.numWrong);
		});
	},
	answerPage: function(number, right){
		if (right === true){
			console.log("why won't you display the page");
			$('.right-wrong').html("Right!");
		}
		else{
			$('.right-wrong').html("Wrong!");
		}
		$('.right-answer').html("The correct answer was: " + quiz.answer[number]);
		quiz.clearQxn();
		quiz.numQxn = quiz.numQxn + 1;
		var Timer = setTimeout(quiz.displayQxn(quiz.numQxn), 2*1000);
	},
	donePage: function(){
		$('.all-done').html("All done! Here's how you did!");
		$('.num-right').html("Correct Answers: " + quiz.numRight);
		$('.num-wrong').html("Incorrect Answers: " + quiz.numWrong);
		$('.num-unanswered').html("Unanswered: " + quiz.numUnanswered);
		$('#start-over').css("display","block");
		$('#start-over').html("Start Over?");
		return;
	}
}
