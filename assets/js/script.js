/* Selecting all the elements on the page. */
const start = document.querySelector("#start");
const quiz = document.querySelector("#quiz");
const getQuestion = document.querySelector("#getQuestion");
const getAnswerImage = document.querySelector("#answerImage");
const getOptionOne = document.querySelector("#A");
const getOptionTwo = document.querySelector("#B");
const getOptionThree = document.querySelector("#C");
const getOptionFour = document.querySelector("#D");
const counter = document.querySelector("#counter");
const questionTimer = document.querySelector("#questionTimer");
const progress = document.querySelector("#progress");
const diplayScore = document.querySelector("#scoreContainer");

/* listQuestions: The code creates an array of objects. Each object contains a question and question id, four answers, and
the correct option. */
let listQuestions = [
    {
      id: 1,
      question:
        "Question 1. Which of the following should be the FIRST step in developing an information security plan?",
      imgSrc: "./assets/images/1.jpg",
      options: {
        optionOne: "1. Perform a technical vulnerabilities assessment.",
        optionTwo: "2. Analyze the current business strategy.",
        optionThree: "3. Perform a business impact analysis.",
        optionFour: "4. Assess the current levels of security awareness.",
      },
      correctOption: 2,
    },
    {
      id: 2,
      question:
        "Question 2. Senior management commitment and support for information security can BEST be obtained through presentations that:",
      imgSrc: "./assets/images/2.jpg",
      options: {
        optionOne:
          "1. use illustrative examples of sugetAnswerThreeessful attacks.",
        optionTwo: "2. explain the technical risks to the organization.",
        optionThree:
          "3. evaluate the organization against best security practices.",
        optionFour: "4. Tie security risks to key business objectives.",
      },
      correctOption: 4,
    },
    {
      id: 3,
      question:
        "Question 3. The MOST appropriate role for senior management in supporting information security is the:",
      imgSrc: "./assets/images/3.jpg",
      options: {
        optionOne: "1. Evaluation of vendors offering security products.",
        optionTwo: "2. Assessment of risks to the organization.",
        optionThree: "3. Approval of policy statements and funding.",
        optionFour: "4. Monitoring adherence to regulatory requirements.",
      },
      correctOption: 3,
    },
    {
      id: 4,
      question:
        "Question 4. Which of the following would BEST ensure the sugetAnswerThreeess of information security governance within an organization?",
      imgSrc: "./assets/images/4.jpg",
      options: {
        optionOne: "1. Steering committees approve security projects.",
        optionTwo: "2. Security policy training provided to all managers.",
        optionThree:
          "3. Security training available to all employees on the intranet.",
        optionFour:
          "4. Steering committees enforce compliance with laws and regulations.",
      },
      correctOption: 1,
    },
    {
      id: 5,
      question:
        "Question 5. Information security governance is PRIMARILY driven by:",
      imgSrc: "./assets/images/5.jpg",
      options: {
        optionOne: "1. technology constraints.",
        optionTwo: "2. regulatory requirements.",
        optionThree: "3. litigation potential.",
        optionFour: "4. business strategy",
      },
      correctOption: 4,
    },
    {
      id: 6,
      question:
        "Question 6. Which of the following represents the MAJOR focus of privacy regulations?",
      imgSrc: "./assets/images/6.jpg",
      options: {
        optionOne: "1. Unrestricted data mining",
        optionTwo: "2. Identity theft",
        optionThree: "3. Human rights protection",
        optionFour: "4. Identifiable personal data",
      },
      correctOption: 4,
    },
    {
      id: 7,
      question:
        "Question 7. Investments in information security technologies should be based on:",
      imgSrc: "./assets/images/7.jpg",
      options: {
        optionOne: "1. vulnerability assessments.",
        optionTwo: "2. value analysis.",
        optionThree: "3. business climate",
        optionFour: "4. audit recommendations.",
      },
      correctOption: 2,
    },
    {
      id: 8,
      question:
        "Questionn 8. Retention of business records should PRIMARILY be based on:",
      imgSrc: "./assets/images/8.jpg",
      options: {
        optionOne: "1. business strategy and direction.",
        optionTwo: "2. regulatory and legal requirements.",
        optionThree: "3. storage capacity and longevity.",
        optionFour: "4. business ease and value analysis.",
      },
      correctOption: 2,
    },
    {
      id: 9,
      question:
        "Question 9. Which of the following is characteristic of centralized information security management?",
      imgSrc: "./assets/images/9.jpg",
      options: {
        optionOne: "1. More expensive to administer",
        optionTwo: "2. Better adherence to policies",
        optionThree: "3. More aligned with business unit needs",
        optionFour: "4. Faster turnaround of requests",
      },
      correctOption: 2,
    },
    {
      id: 10,
      question:
        "Question 10. SugetAnswerThreeessful implementation of information security governance will FIRST require:",
      imgSrc: "./assets/images/10.jpg",
      options: {
        optionOne: "1. security awareness training.",
        optionTwo: "2. updated security policies.",
        optionThree: "3. a computer incident management team.",
        optionFour: "4. a security architecture.",
      },
      correctOption: 2,
    },
  ];

  /* This is a function that is called when the DOM is loaded. It is listening for the submit event on
the form. When the form is submitted, it gets the value of the textbox and stores it in the session
storage. */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#myForm").addEventListener("submit", () => {
      const inputValue = document.querySelector("#tbName").value;
      sessionStorage.setItem("userName", inputValue);
    });
  });
  
  /* Listening for the DOM to load and then sets the text content of the welcome
  element to the user name. If there is no user name, it will display user. */
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#welcome").textContent = `Hello! ${
      sessionStorage.getItem("userName") || "user"
    }!`;
  });

const previousQuestion = listQuestions.length - 1; // Previous Player Question
let currentQuestion = 0; // Question player on
let count = 0; // set count
let TIMER; // declare timer
let score = 0; // Set score
const QUESTION_TIME = 30; // 30 seconds
const GAUGE_WIDTH = 50; // 50px width
const GAUGE_UNIT = GAUGE_WIDTH / QUESTION_TIME; // scorePercentage
let progressQuesIndex = 0; // declare progressQuesIndex

/**
 * showQuestion: Takes the current question from the listQuestions array and displays it on the page within <p> element.
 */
 let showQuestion = () => {
    let ques = listQuestions[currentQuestion];
    getQuestion.innerHTML = `<p>${ques.question}</p>`;
    getAnswerImage.innerHTML = `<img src="${ques.imgSrc}">`;
    getOptionOne.innerHTML = ques.options.optionOne;
    getOptionTwo.innerHTML = ques.options.optionTwo;
    getOptionThree.innerHTML = ques.options.optionThree;
    getOptionFour.innerHTML = ques.options.optionFour;
  };
  
  start.addEventListener("click", startQuiz);

/**
 * startQuiz: When the start button is clicked, hide the start button, show the first question, show the quiz,
 * show the progress, show the counter, and start the timer.
 */
function startQuiz() {
  start.style.display = "none";
  showQuestion();
  quiz.style.display = "block";
  showProgress();
  showCounter();
  TIMER = setInterval(showCounter, 1000); // 1000ms = 1s
}

/**
 * showProgress: While the progressQuesIndex is less than or equal to the previousQuestion, add a <div> element with a class of
 * prog and an id of the progressQuesIndex to the progress <div> element.
 */
let showProgress = () => {
  while (progressQuesIndex <= previousQuestion) {
    progress.innerHTML += `<div class='progress' id='${progressQuesIndex}' + "></div>`;
    progressQuesIndex++;
  }
};

/**
 * showCounter: If the count is less than or equal to the question time, then display the count, change the width of
 * the gauge, and increment the count. Otherwise, reset the count, change the progress color to red,
 * and if the current question is less than the previous question, increment the current question and
 * show the question. Otherwise, end the quiz and show the score.
 */
 let showCounter = () => {
    if (count <= QUESTION_TIME) {
      counter.innerHTML = count;
      questionTimer.style.width = count * GAUGE_UNIT + "px";
      count++;
    } else {
      count = 0;
      // incorrect so set color in counter to red
      quessIncorrect();
      if (currentQuestion < previousQuestion) {
        currentQuestion++;
        showQuestion();
      } else {
        // Finish quiz and show the score
        clearInterval(TIMER);
        showScore();
      }
    }
  };
  
  /**
   * checkAnswer: If the answer is correct, the score is incremented and the progress bar is colored green. If the
   * answer is wrong, the progress bar is colored red. If the current question is less than the previous
   * question, the current question is incremented and the next question is shown. If the current
   * question is greater than the previous question, the quiz is ended and the score is shown.
   * @param answer - the answer the user selected.
   */
  function checkAnswer(answer) {
    if (answer == listQuestions[currentQuestion].correctOption) {
      // answer is correct
      score++;
      // change progress color to green
      document.getElementById(currentQuestion).style.backgroundColor = "#00FF00";
    } else {
      // answer is wrong
      // change progress color to red
      document.getElementById(currentQuestion).style.backgroundColor = "#FF0000";
    }
    count = 0;
    if (currentQuestion < previousQuestion) {
      currentQuestion++;
      showQuestion();
    } else {
      // end the quiz and show the score
      clearInterval(TIMER);
      showScore();
    }
  }

  /**
 * showScore: This displays the percentage of the score.
 */
let showScore = () => {
    diplayScore.style.display = "block";
  
  
    /* Calculating the percentage of the score. */
    const scorePercentage = (score / listQuestions.length) * 100;
  
    /* Setting the img variable to a different image based on the score percentage. */
    let img;
    if (scorePercentage >= 80) {
      img = "img/5.png";
    } else if (scorePercentage >= 60 && scorePercentage < 80) {
      img = "img/4.png";
    } else if (scorePercentage >= 40 && scorePercentage < 60) {
      img = "img/3.png";
    } else if (scorePercentage >= 20 && scorePercentage < 40) {
      img = "img/2.png";
    } else {
      img = "img/1.png";
    }
    // displayScore with img based on scorePercentage.
    diplayScore.innerHTML = `<img src='${img}'>`;
    diplayScore.innerHTML += `<br>% was: `;
    diplayScore.innerHTML += `<p>${scorePercentage}</p>`;
  };
  