const quizQuestions = [
  {
    questionNumber: 1,
    question: "What does WCAG stand for?",
    correctAnswer: "Web Content Accessibility Guidelines",
    altAnswerOne: "Website Compliance and Accessibility Guide",
    altAnswerTwo: "Web Coding Accessibility Guide",
    altAnswerThree: "Website Content Accessibility Group",
  },

  {
    questionNumber: 2,
    question: "Which HTML attribute provides alternative text for images?",
    correctAnswer: "alt",
    altAnswerOne: "title",
    altAnswerTwo: "aria-label",
    altAnswerThree: "desc",
  },

  {
    questionNumber: 3,
    question: "What is the purpose of semantic HTML?",
    correctAnswer:
      "To improve accessibility and SEO by using meaningful elements",
    altAnswerOne: "To reduce page load time",
    altAnswerTwo: "To style a webpage without CSS",
    altAnswerThree: "To use generic divs and spans for layout",
  },

  {
    questionNumber: 4,
    question:
      "Which of these is NOT a valid way to make a website more accessible?",
    correctAnswer: "Using only color to convey information",
    altAnswerOne: "Adding captions to videos",
    altAnswerTwo: "Ensuring good keyboard navigation",
    altAnswerThree: "Providing alternative text for images",
  },

  {
    questionNumber: 5,
    question: "Which feature improves keyboard navigation?",
    correctAnswer: "Adding tabindex to interactive elements",
    altAnswerOne: "Disabling the tab key",
    altAnswerTwo: "Using only mouse-friendly UI components",
    altAnswerThree: "Removing focus outlines",
  },

  {
    questionNumber: 6,
    question: "Why should you avoid autoplaying videos with sound?",
    correctAnswer: "It can be disruptive and inaccessible to some users",
    altAnswerOne: "It slows down page load times",
    altAnswerTwo: "It's bad for SEO",
    altAnswerThree: "It makes the website look unprofessional",
  },

  {
    questionNumber: 7,
    question: "How can you make links more accessible?",
    correctAnswer: "Use descriptive link text instead of 'Click here'",
    altAnswerOne: "Add more links to the same destination",
    altAnswerTwo: "Only use icons without text",
    altAnswerThree: "Use vague link text like 'Learn more'",
  },

  {
    questionNumber: 8,
    question:
      "Which of these elements is best for screen readers to understand page structure?",
    correctAnswer: "header, nav, main, footer",
    altAnswerOne: "div, span, b, i",
    altAnswerTwo: "section, article, aside, hr",
    altAnswerThree: "p, h1, h2, h3",
  },

  {
    questionNumber: 9,
    question: "What does POUR stand for?",
    correctAnswer: "Perceivable Operable Understandable Robust",
    altAnswerOne: "Provide Offer Uplift and Rebuild",
    altAnswerTwo: "Perceivable Operable Usable Reliable",
    altAnswerThree: "Place of Usual Residence",
  },

  {
    questionNumber: 10,
    question: "Which of these font sizes is best for readability?",
    correctAnswer: "At least 16px for body text",
    altAnswerOne: "10px for compact design",
    altAnswerTwo: "12px for minimalism",
    altAnswerThree: "14px for desktop, 10px for mobile",
  },
];

// SELECTORS
const quizSection = document.querySelector(".quiz-section");
let quizForm;

//  HERO BUTTON SCROLL
const ctaBtn = document.querySelector(".cta-btn");
ctaBtn.addEventListener("click", () => {
  const quizSection = document.getElementById("quiz-content");
  quizSection.scrollIntoView({ behavior: "smooth" });
});

// QUIZ QUESTIONS
const displayQuizQuestions = () => {
  quizSection.innerHTML = `
  <h2>Accessibility Quiz!</h2>
  <p>
  Answer the following questions, then click the submit button once you're
  done. You can only select one answer per question.
  </p>
  <form id="quiz-form">
  <div id="quiz-container"></div>
  <div class="btns-container">
    <button class="btn next-btn" aria-label="Next-question">Next question</button>
    <button class="btn prev-btn" aria-label="Previous-question">Previous question</button>
    <button class="btn submit-btn" type="submit" aria-label="Submit-button">Submit!</button>  
  </div>
  </form>
  `;

  quizForm = document.getElementById("quiz-form");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const submitBtn = document.querySelector(".submit-btn");

  let currentQuestionIndex = 0;

  const displayCurrentQuestion = () => {
    const currentQuizQuestion = quizQuestions[currentQuestionIndex];

    let quizAnswers = [
      { label: currentQuizQuestion.altAnswerOne, value: "wrong" },
      { label: currentQuizQuestion.altAnswerTwo, value: "wrong" },
      { label: currentQuizQuestion.correctAnswer, value: "correct" },
      { label: currentQuizQuestion.altAnswerThree, value: "wrong" },
    ];

    quizAnswers = quizAnswers.sort(() => Math.random() - 0.5);

    const quizContainer = document.getElementById("quiz-container");

    quizContainer.innerHTML = `<fieldset class="question-${
      currentQuizQuestion.questionNumber
    }">
              <legend>${currentQuizQuestion.question}</legend>
              ${quizAnswers
                .map((answer, i) => {
                  return `<div class="quiz-option">
                <input class="quiz-input" aria-controls="answer-section" type="radio" id="option-${
                  i + 1
                }" name="q${currentQuizQuestion.questionNumber}" value="${
                    answer.value
                  }" required />
                <label for="option-${i + 1}">${answer.label}</label>
              </div>
            `;
                })
                .join("")}
            </fieldset>`;

    if (currentQuestionIndex === 0) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }

    if (currentQuestionIndex === quizQuestions.length - 1) {
      nextBtn.disabled = true;
      submitBtn.classList.remove("hidden");
    } else {
      nextBtn.disabled = false;
      submitBtn.classList.add("hidden");
    }
  };

  displayCurrentQuestion();

  nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++;
      displayCurrentQuestion();
      prevBtn.disabled = false;
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      displayCurrentQuestion();
    }
  });

  quizForm.addEventListener("submit", (e) => {
    e.preventDefault();
    displaQuizResults();
  });
};

// QUIZ RESULTS
const displaQuizResults = () => {
  const quizInputs = document.querySelectorAll(".quiz-input:checked");

  let answers = [];

  quizInputs.forEach((quizInput) => {
    answers.push(quizInput.value);
  });

  const correctAnswers = answers.filter((answer) => answer === "correct");

  const result = `${correctAnswers.length} / ${answers.length}`;

  let resultText;

  if (correctAnswers.length >= 5 && correctAnswers.length <= 7) {
    resultText = "Almsot there, try again!";
  } else if (correctAnswers.length <= 4) {
    resultText = "Not quite there, try again!";
  } else {
    resultText = "Great job!";
  }

  quizSection.innerHTML = `<h2>Your Results!</h2>
      <p>${resultText} You got ${result}!</p>
      <div class="btns-container">
        <button class="btn retake-btn">Take the quiz again!</button>
        <button class="btn home-btn">To home!</button>
      </div>`;

  const retakeQuizBtn = document.querySelector(".retake-btn");
  const toHomeBtn = document.querySelector(".home-btn");

  retakeQuizBtn.addEventListener("click", displayQuizQuestions);
  toHomeBtn.addEventListener("click", () => {
    const homeSection = document.getElementById("home-content");
    homeSection.scrollIntoView({ behavior: "smooth" });
  });
};

document.addEventListener("DOMContentLoaded", displayQuizQuestions);
