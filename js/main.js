const quizQuestions = [
  {
    questionNumber: 1,
    question: "What does WCAG stand for?",
    altAnswerOne: "Website Compliance and Accessibility Guide",
    correctAnswer: "Web Content Accessibility Guidelines",
    altAnswerTwo: "Web Coding Accessibility Guide",
    altAnswerThree: "Website Content Accessibility Group",
  },

  {
    questionNumber: 2,
    question: "Which HTML attribute provides alternative text for images?",
    altAnswerOne: "title",
    correctAnswer: "alt",
    altAnswerTwo: "aria-label",
    altAnswerThree: "desc",
  },

  {
    questionNumber: 3,
    question: "What is the purpose of semantic HTML?",
    altAnswerOne:
      "To improve accessibility and SEO by using meaningful elements",
    altAnswerTwo: "To reduce page load time",
    correctAnswer:
      "To improve accessibility and SEO by using meaningful elements",
    altAnswerThree: "To style a webpage without CSS",
  },

  {
    questionNumber: 4,
    question:
      "Which of these is NOT a valid way to make a website more accessible?",
    altAnswerOne: "Using only color to convey information",
    altAnswerTwo: "Adding captions to videos",
    correctAnswer: "Using only color to convey information",
    altAnswerThree: "Ensuring good keyboard navigation",
  },

  {
    questionNumber: 5,
    question: "Which feature improves keyboard navigation?",
    altAnswerOne: "Disabling the tab key",
    correctAnswer: "Adding tabindex to interactive elements",
    altAnswerTwo: "Using only mouse-friendly UI components",
    altAnswerThree: "Removing focus outlines",
  },

  {
    questionNumber: 6,
    question: "Why should you avoid autoplaying videos with sound?",
    altAnswerOne: "It can be disruptive and inaccessible to some users",
    altAnswerTwo: "It slows down page load times",
    correctAnswer: "It can be disruptive and inaccessible to some users",
    altAnswerThree: "It's bad for SEO",
  },

  {
    questionNumber: 7,
    question: "How can you make links more accessible?",
    altAnswerOne: "Use descriptive link text instead of 'Click here'",
    correctAnswer: "Use descriptive link text instead of 'Click here'",
    altAnswerTwo: "Add more links to the same destination",
    altAnswerThree: "Only use icons without text",
  },

  {
    questionNumber: 8,
    question:
      "Which of these elements is best for screen readers to understand page structure?",
    altAnswerOne: "div, span, b, i",
    altAnswerTwo: "header, nav, main, footer",
    correctAnswer: "header, nav, main, footer",
    altAnswerThree: "section, article, aside, hr",
  },

  {
    questionNumber: 9,
    question: "What does POUR stand for?",
    altAnswerOne: "Provide Offer Uplift and Rebuild",
    correctAnswer: "Perceivable Operable Understandable Robust",
    altAnswerTwo: "Perceivable Operable Usable Reliable",
    altAnswerThree: "Place of Usual Residence",
  },

  {
    questionNumber: 10,
    question: "Which of these font sizes is best for readability?",
    altAnswerOne: "10px for compact design",
    altAnswerTwo: "12px for minimalism",
    correctAnswer: "At least 16px for body text",
    altAnswerThree: "14px for desktop, 10px for mobile",
  },
];

// SELECTORS
const quizContainer = document.getElementById("quiz-form");

// QUIZ QUESTIONS HTML
quizQuestions.forEach((quizQuestion) => {
  let quizAnswers = [
    { label: quizQuestion.altAnswerOne, value: "wrong" },
    { label: quizQuestion.altAnswerTwo, value: "wrong" },
    { label: quizQuestion.correctAnswer, value: "correct" },
    { label: quizQuestion.altAnswerThree, value: "wrong" },
  ];

  quizAnswers = quizAnswers.sort(() => Math.random() - 0.5);

  quizContainer.innerHTML += `<fieldset class="question-${
    quizQuestion.questionNumber
  }">
          <legend>${quizQuestion.question}</legend>
          ${quizAnswers
            .map((answer, i) => {
              return `<div class="quiz-option">
            <input type="radio" id="option-${i + 1}" name="q${
                quizQuestion.questionNumber
              }" value="${answer.value}" />
            <label for="option-${i + 1}">${answer.label}</label>
          </div>
        `;
            })
            .join("")}
        </fieldset>`;
});
