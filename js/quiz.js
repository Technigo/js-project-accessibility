const questions = [
  {
    question: "Vad är huvudstaden i Sverige?",
    options: [
      { text: "Göteborg", correct: false },
      { text: "Stockholm", correct: true },
      { text: "Malmö", correct: false },
    ],
  },
  {
    question: "Vilken är världens största ocean?",
    options: [
      { text: "Atlanten", correct: false },
      { text: "Indiska oceanen", correct: false },
      { text: "Stilla havet", correct: true },
    ],
  },
  {
    question: "Hur många landskap finns det i Sverige?",
    options: [
      { text: "21", correct: false },
      { text: "25", correct: true },
      { text: "29", correct: false },
    ],
  },
];

export function generateQuiz() {
  let quizContainer = document.getElementById("question-container");
  quizContainer.innerHTML = "";

  questions.forEach((question, index) => {
    let fieldset = document.createElement("fieldset");
    let legend = document.createElement("legend");
    legend.textContent = question.question;
    fieldset.appendChild(legend);

    question.options.forEach((option, i) => {
      let optionContainer = document.createElement("div");
      optionContainer.classList.add("option-container");

      let radioBtn = document.createElement("input");
      radioBtn.type = "radio";
      radioBtn.name = "question" + index;
      radioBtn.id = `question${index}-option${i}`;
      radioBtn.value = i;
      radioBtn.setAttribute("aria-required", "true");

      let label = document.createElement("label");
      label.htmlFor = radioBtn.id;
      label.textContent = option.text;

      optionContainer.appendChild(radioBtn);
      optionContainer.appendChild(label);
      fieldset.appendChild(optionContainer);
    });

    quizContainer.appendChild(fieldset);
  });
}

export function checkAnswers() {
  // event.preventDefault();
  let score = 0;

  questions.forEach((question, index) => {
    let selectedAnswer = document.querySelector(
      'input[name="question' + index + '"]:checked'
    );
    if (
      selectedAnswer &&
      question.options[parseInt(selectedAnswer.value)].correct
    ) {
      score++;
    }
  });

  let resultMessage = document.getElementById("result-message");
  resultMessage.textContent = `You answered ${score} out of ${questions.length} questions correctly.`;
}

window.onload = generateQuiz;
