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

function generateQuiz() {
  let quizContainer = document.getElementById("question-container");
  quizContainer.innerHTML = "";

  questions.forEach((q, index) => {
    let fieldset = document.createElement("fieldset");
    let legend = document.createElement("legend");
    legend.textContent = q.question;
    fieldset.appendChild(legend);

    q.options.forEach((option, i) => {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "question" + index;
      radio.id = `question${index}-option${i}`;
      radio.value = i;
      radio.required = true;
      radio.setAttribute("aria-required", "true");

      let label = document.createElement("label");
      label.htmlFor = radio.id;
      label.textContent = option.text;

      fieldset.appendChild(radio);
      fieldset.appendChild(label);
      fieldset.appendChild(document.createElement("br"));
    });

    quizContainer.appendChild(fieldset);
  });
}

function checkAnswers(event) {
  event.preventDefault();
  let score = 0;

  questions.forEach((q, index) => {
    let selectedAnswer = document.querySelector(
      'input[name="question' + index + '"]:checked'
    );
    if (selectedAnswer && q.options[parseInt(selectedAnswer.value)].correct) {
      score++;
    }
  });

  alert("Du fick " + score + " av " + questions.length + " rätt!");
}

window.onload = () => generateQuiz();
