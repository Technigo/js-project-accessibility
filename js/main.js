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
const quizContainer = document.getElementById("quiz-container");

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
            <input aria-controls="answer-section" type="radio" id="option-${
              i + 1
            }" name="q${quizQuestion.questionNumber}" value="${answer.value}" />
            <label for="option-${i + 1}">${answer.label}</label>
          </div>
        `;
            })
            .join("")}
        </fieldset>`;
});
