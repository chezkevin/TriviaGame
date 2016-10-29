window.onload = function(){
    //click events
    $('#start').click(quiz.start);
};

var quiz = {
	numQxn: 0,
	questions: ["1. What is Spider-Man's alter ego?",
				"2. Who is Matt Murdock's partner in law?",
				"3. Which of these is NOT one of Spider-Man's superpowers?"],
	choices: ["Jon Hamm,Peter Parker,Steve Rogers,Tony Stark",
				"Roy Rogers, Harley Quinn, Oliver Queen, Foggy",
				"Heightened Senses,Wall-climbing,Spider-size,Web-spinning"],
	answer: ["Peter Parker",
				"Foggy Nelson",
				"Spider-size"],

	start: function(){
		$('#start').css("display","none");
		quiz.displayQxn(quiz.numQxn);
	},
	displayQxn: function(number){
		console.log(quiz.questions);
		console.log('questions: ' + quiz.questions[number]);
		$('#data-question').html(quiz.questions[number]);
		quiz.parseChoices(number);
		$('#next').css("display","block");
	},
	parseChoices: function(number){
		var choiceArray = quiz.choices[number].split(',');
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
	}
}