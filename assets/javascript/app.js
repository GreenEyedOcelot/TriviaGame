/*
    Sound credits:
    Correct choice sound: https://freesound.org/people/zut50/sounds/162395/, Creative Commons License
    Wrong choice sound: https://freesound.org/people/RICHERlandTV/sounds/216090/, Attribution License
*/

var correctChoiceSound, wrongChoiceSound;

var questions = [{
      question: "How many ounces are in a pound?",
      answers: [8, 12, 16, 20],
      correctIndex: 2
   },
   {
      question: "How many pounds are in a stone?",
      answers: [12, 14, 16, 20],
      correctIndex: 1
   },
   {
      question: "How many pounds are in a short ton?",
      answers: [2000, 2240, 2250, 2500],
      correctIndex: 0
   },
   {
      question: "How many teaspoons are in a tablespoon?",
      answers: [1, 2, 3, 4],
      correctIndex: 2
   },
   {
      question: "How many tablespoons are in a cup?",
      answers: [4, 8, 12, 16],
      correctIndex: 3
   },
   {
      question: "How many teaspoons are in a quarter cup?",
      answers: [12, 16, 20, 24],
      correctIndex: 0
   },
   {
      question: "How many inches are in a yard?",
      answers: [12, 24, 36, 48],
      correctIndex: 2
   },
   {
      question: "How many feet are in a fathom?",
      answers: [3, 6, 9, 12],
      correctIndex: 1
   },
   {
      question: "How many feet are in a twain?",
      answers: [3, 6, 9, 12],
      correctIndex: 3
   },
   {
      question: "How many acres in a square mile?",
      answers: [360, 640, 100, 144],
      correctIndex: 1
   },
   {
      question: "How many square yards are in an acre?",
      answers: [4840, 5140, 5840, 6040],
      correctIndex: 0
   },
   {
      question: "How many square meters are in a square kilometer?",
      answers: [100000, 1000000, 10000000, 100000000],
      correctIndex: 1
   },
   {
      question: "How many teaspoons are in a cup?",
      answers: [16, 24, 36, 48],
      correctIndex: 3
   },
   {
      question: "How many tablespoons is one fluid ounce?",
      answers: [2, 4, 6, 8],
      correctIndex: 0
   },
   {
      question: "How many tablespoons are in 3/4 of a cup?",
      answers: [8, 12, 16, 20],
      correctIndex: 1
   },
   {
      question: "How many yards are in a fathom?",
      answers: [2, 4, 6, 8],
      correctIndex: 0
   },
   {
      question: "How many pecks are in a bushel?",
      answers: [2, 4, 8, 16],
      correctIndex: 1
   },
   {
      question: "How many pints are in a quart?",
      answers: [2, 4, 6, 8],
      correctIndex: 0
   },
   {
      question: "How many tablespoons are in a quarter cup?",
      answers: [2, 4, 6, 8],
      correctIndex: 1
   },
   {
      question: "How many quarts are in a gallon?",
      answers: [2, 4, 6, 8],
      correctIndex: 1
   },
   {
      question: "How many dry quarts are in a peck?",
      answers: [2, 4, 8, 16],
      correctIndex: 2
   },
   {
      question: "How many milliliters are in a cubic meter?",
      answers: [1000, 10000, 100000, 1000000],
      correctIndex: 3
   },
   {
      question: "How many cubic centimeters are in a milliliter?",
      answers: [1, 10, 100, 1000],
      correctIndex: 0
   },
   {
      question: "How many centimeters are in a kilometer?",
      answers: [10000, 100000, 1000000, 10000000],
      correctIndex: 1
   },
   {
      question: "How many meters are in a kilometer?",
      answers: [10, 100, 1000, 10000],
      correctIndex: 2
   }
];

function QuizGame(questionBank) {
   this.questionBank = questionBank;
   this.bankSize = this.questionBank.length;
   this.questionCountdown = 20;
   this.feedbackTime = 5 * 1000;
   this.questionsPerGame = 5;
   this.questionTimer = "";
   this.gameQuestions = [];
   this.questionCounter = 0;
   this.rightAnswers = 0;
   this.acceptAnswerNow = true;
}


QuizGame.prototype.displayNextQuestion = function() {
   var statusStr = "Question " + (this.questionCounter + 1) + " of " + this.questionsPerGame;

   // display the question we are on
   $("#status").html(statusStr);

   // reset all buttons to have border of uniform size and color
   $("#button0").css("border", "4px solid #1d3c6a");
   $("#button1").css("border", "4px solid #1d3c6a");
   $("#button2").css("border", "4px solid #1d3c6a");
   $("#button3").css("border", "4px solid #1d3c6a");

   // display next question
   $("#question").html(this.gameQuestions[this.questionCounter].question);

   // display possible answers
   for (var i = 0; i < 4; i++) {
      var idvalue = "#answer" + i;
      $(idvalue).html((this.gameQuestions[this.questionCounter].answers[i]).toLocaleString())
   }

   // accept an answer now
   this.acceptAnswerNow = true;

   // start new timer
   this.questionCountdown = 20;
   this.checkCountdown();
   var thisObj = this;
   this.questionTimer = setInterval(function() {
      thisObj.checkCountdown()
   }, 1000)



}

QuizGame.prototype.checkCountdown = function() {
   this.updateTimerDisplay();

   if (this.questionCountdown < 1) {
      this.giveQuestionFeedback();
   }

   this.questionCountdown = this.questionCountdown - 1;

}

QuizGame.prototype.updateTimerDisplay = function() {

   if (this.questionCountdown > -1) {
      $("#timertext").html(this.questionCountdown + " seconds left");
   } else {
      $("#timertext").html("");
   }
}

QuizGame.prototype.isCorrectGuess = function(guess) {
   var guessInd = parseInt(guess.charAt(guess.length - 1));
   return (this.gameQuestions[this.questionCounter].correctIndex == guessInd);
}

// if this is called with no argument, it means that the question has timed out.
QuizGame.prototype.giveQuestionFeedback = function(guess) {

   // if user is making a second guess, don't do anything
   if (!this.acceptAnswerNow) {
      return;
   } else {
      this.acceptAnswerNow = false;
   }

   var thisObj = this;
   clearInterval(thisObj.questionTimer);

   // clear timer countdown
   $("#timertext").html("&nbsp;");

   // show correct answer by outlining it in green
   var correctButtonId = "#button" + this.gameQuestions[this.questionCounter].correctIndex;
   $(correctButtonId).css("border", "4px solid forestgreen");

   if (guess && this.isCorrectGuess(guess)) { // if correct guess
      correctChoiceSound.play();
      this.rightAnswers++;

   } else if (guess && !this.isCorrectGuess(guess)) { // if wrong guess
      wrongChoiceSound.play();
      $("#message").text("Incorrect. The correct answer has a green border.");
      setTimeout(function() {
         $("#message").html("&nbsp;");
      }, thisObj.feedbackTime);

      // put red outline around wrong answer
      var wrongButtonId = "#button" + guess.charAt(guess.length - 1);
      $(wrongButtonId).css("border", "4px solid firebrick");

   } else { // this is the timeout condition
      wrongChoiceSound.play();

      $("#message").text("Sorry, time is up! The correct answer has a green border.");
      setTimeout(function() {
         $("#message").html("&nbsp;");
      }, thisObj.feedbackTime);
   }

   if (this.questionCounter === (this.questionsPerGame - 1)) { // if game is over
      setTimeout(function() {
         thisObj.giveGameFeedback();
      }, thisObj.feedbackTime);
   } else {
      setTimeout(function() {
         thisObj.displayNextQuestion();
      }, thisObj.feedbackTime)
      thisObj.questionCounter++;

   }

}

QuizGame.prototype.giveGameFeedback = function() {
   $("#board").css("display", "none");
   $("#endScreen").css("display", "block");

   var percentCorrect = (this.rightAnswers / this.questionsPerGame) * 100 + "%";
   var endingFeedback = "Out of " + this.questionsPerGame + " questions, you got " +
      this.rightAnswers + " correct. You score is " + percentCorrect + ".";

   $("#endingFeedback").html("<p>" + endingFeedback + "</p>");
}

QuizGame.prototype.getGameQuestions = function() {
   this.gameQuestions = []; // this is important for reset condition
   this.rightAnswers = 0;
   this.questionCounter = 0;
   var indexArr = [];
   var indexArrSize = this.bankSize;
   var i, nextInd;

   // we are going to randomly select the questions from the question bank
   for (i = 0; i < indexArrSize; i++) {
      indexArr[i] = i;
   }
   while (this.gameQuestions.length < this.questionsPerGame) {
      nextInd = Math.floor(Math.random() * indexArrSize);
      this.gameQuestions.push(this.questionBank[indexArr[nextInd]]);
      indexArr.splice(nextInd, 1);
      indexArrSize--;

   }

   console.log(this.gameQuestions)

}


// document ready section
$(document).ready(function() {

   var thisGame = new QuizGame(questions);

   initSounds();
   thisGame.getGameQuestions();

   function initSounds() {
      // to play: correctChoiceSound.play();
      correctChoiceSound = document.createElement("AUDIO");
      correctChoiceSound.setAttribute("src", "assets/sounds/rightChoice.mp3");
      correctChoiceSound.setAttribute("preload", "auto");

      wrongChoiceSound = document.createElement("AUDIO");
      wrongChoiceSound.setAttribute("src", "assets/sounds/wrongChoice.mp3");
      wrongChoiceSound.setAttribute("preload", "auto");
   }

   $("#startGame").on("click", function(event) {
      $("#startScreen").css("display", "none");
      $("#board").css("display", "block")
      thisGame.displayNextQuestion();
   });

   $("#restartGame").on("click", function(event) {
      $("#endScreen").css("display", "none");
      $("#board").css("display", "block")
      thisGame.getGameQuestions();
      thisGame.displayNextQuestion();
   });

   $(".button").on("click", function(event) {
      thisGame.giveQuestionFeedback(this.id);
   });
});