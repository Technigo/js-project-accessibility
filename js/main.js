import { generateQuiz, checkAnswers } from "./quiz.js";

document.addEventListener("DOMContentLoaded", () => {
  const startQuizButton = document.getElementById("start-quiz-button");
  const quizSection = document.querySelector(".quiz-section");
  const introSection = document.querySelector(".intro-section");

  if (startQuizButton && quizSection && introSection) {
    startQuizButton.addEventListener("click", () => {
      // Show the quiz section
      quizSection.style.display = "block"; // Or 'flex' or 'grid' if needed

      // Hide the intro section
      introSection.style.display = "none";
    });
  } else {
    console.error(
      "Could not find one or more of the required elements: startQuizButton, quizSection, introSection"
    );
  }

  const submitQuizButton = document.getElementById("submitQuiz");
  const resultSection = document.querySelector(".results-section");

  if (submitQuizButton && resultSection) {
    submitQuizButton.addEventListener("click", (event) => {
      event.preventDefault();
      checkAnswers();
      quizSection.style.display = "none";
      resultSection.style.display = "block";
    });
  }

  const restartQuizButton = document.getElementById("restartQuiz");

  restartQuizButton.addEventListener("click", () => {
    // Hide the result section
    resultSection.style.display = "none";

    // Show the quiz section
    // quizSection.innerHTML = "";
    generateQuiz();
    quizSection.style.display = "block";
  });

  const toIntroButton = document.getElementById("backToHome");

  toIntroButton.addEventListener("click", () => {
    // Hide the result section
    resultSection.style.display = "none";

    // Show the intro section
    introSection.style.display = "block";
  });
});
