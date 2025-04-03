// Quiz State Management
let currentQuestionIndex = 0;
let userAnswers = [];
let questionsData = [];

// DOM Elements
const introSection = document.getElementById("introduction");
const quizSection = document.getElementById("quiz");
const resultsSection = document.getElementById("results");
const startQuizButton = document.getElementById("start-quiz-button");
const quizForm = document.getElementById("quiz-form");
const questionContainer = document.getElementById("question-container");
const questionContent = document.querySelector(".question-content");
const progressText = document.querySelector(".progress-text");
const progressFill = document.querySelector(".progress-fill");
const nextButton = document.getElementById("nextQuestion");
const previousButton = document.getElementById("previousQuestion");
const submitQuizButton = document.getElementById("submitQuiz");
const restartQuizButton = document.getElementById("restartQuiz");
const backToHomeButton = document.getElementById("backToHome");
const resultContent = document.getElementById("result-content");
const feedbackDetails = document.getElementById("feedback-details");
const announcer = document.getElementById("announcer");
const questionError = document.getElementById("question-error");
const errorMessage = document.querySelector(".error-message");

// Initialize the quiz
document.addEventListener("DOMContentLoaded", () => {
  // Import quiz questions from quiz.js
  questionsData = questions || [];
  console.log(questionsData); // TA BORT SEN

  // Event Listeners
  startQuizButton.addEventListener("click", startQuiz);
  nextButton.addEventListener("click", goToNextQuestion);
  previousButton.addEventListener("click", goToPreviousQuestion);
  quizForm.addEventListener("submit", handleQuizSubmit);
  restartQuizButton.addEventListener("click", restartQuiz);
  backToHomeButton.addEventListener("click", goToHomepage);

  // Set initial state
  userAnswers = new Array(questionsData.length).fill(null);
});

// Start the quiz
function startQuiz() {
  introSection.hidden = true;
  quizSection.hidden = false;
  resultsSection.hidden = true;
  window.location.hash = "#quiz";
  // document.getElementById("input[0]").focus();
  // announcer.textContent = "Moved to quiz section";

  // Reset quiz state
  currentQuestionIndex = 0;
  userAnswers = new Array(questionsData.length).fill(null);

  // Load the first question
  loadQuestion(currentQuestionIndex);

  // Announce that the quiz has started
  announceMessage("Quiz started. First question loaded.");
}

// Load a question
function loadQuestion(index) {
  // Update progress indicators
  updateProgress(index);

  // Get the current question
  const currentQuestion = questionsData[index];

  // Clear previous question
  questionContent.innerHTML = "";

  // progressText.innerHTML = `<b>${questionsData.length}</b> questions total`;
  // progressFill.style.width = "0%"; // Start at 0%

  // Create legend with question text
  const legend = document.createElement("legend");
  legend.textContent = currentQuestion.question;
  questionContent.appendChild(legend);

  // Create radio group div
  const radioGroup = document.createElement("div");
  radioGroup.className = "radio-group";
  radioGroup.setAttribute("role", "radiogroup");

  // Add options
  currentQuestion.options.forEach((option, optionIndex) => {
    const radioOption = document.createElement("div");
    radioOption.className = "radio-option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = `question-${index}`;
    input.value = optionIndex;
    input.id = `option-${index}-${optionIndex}`;

    // Check if user has already answered this question
    if (userAnswers[index] !== null && userAnswers[index] === optionIndex) {
      input.checked = true;
    }

    const label = document.createElement("label");
    label.setAttribute("for", `option-${index}-${optionIndex}`);
    label.textContent = option.text;

    // Add event listener to capture answers
    input.addEventListener("change", () => {
      userAnswers[index] = optionIndex;
      hideError();
      updateNavigationButtons();
    });

    radioOption.appendChild(input);
    radioOption.appendChild(label);
    radioGroup.appendChild(radioOption);
  });

  questionContent.appendChild(radioGroup);

  // Hide error message
  questionError.hidden = true;

  // Update navigation buttons
  updateNavigationButtons();
}

// Update progress indicators
function updateProgress(index) {
  const totalQuestions = questionsData.length;
  const currentQuestionNum = index + 1;

  // Update text
  progressText.innerHTML = `Question <b>${currentQuestionNum}</b> of <b>${totalQuestions}</b>`;

  // Update progress bar
  const progressPercentage = (currentQuestionNum / totalQuestions) * 100;
  progressFill.style.width = `${progressPercentage}%`;
}

// Update navigation buttons based on current state
function updateNavigationButtons() {
  const isLastQuestion = currentQuestionIndex === questionsData.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const currentAnswerProvided = userAnswers[currentQuestionIndex] !== null;

  // Show/hide previous button
  previousButton.hidden = isFirstQuestion;

  // Show/hide next and submit buttons
  nextButton.hidden = isLastQuestion;
  submitQuizButton.hidden = !isLastQuestion;
}

// Go to next question
function goToNextQuestion() {
  // Make sure we have an answer for the current question
  if (userAnswers[currentQuestionIndex] === null) {
    showError("Please select an answer before continuing.");
    return;
  }
  // Move to the next question
  if (currentQuestionIndex < questionsData.length - 1) {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
    announceMessage(`Question ${currentQuestionIndex + 1} loaded.`);
  }
}

// Go to previous question
function goToPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);
    announceMessage(`Question ${currentQuestionIndex + 1} loaded.`);
  }
}

// Show error message
function showError(message) {
  questionError.hidden = false;
  errorMessage.textContent = message;
}

// Hide error message
function hideError() {
  questionError.hidden = true;
}

// Handle quiz submission
function handleQuizSubmit(event) {
  event.preventDefault();

  // Make sure we have an answer for the current (last) question
  if (userAnswers[currentQuestionIndex] === null) {
    showError("Please select an answer before submitting.");
    return;
  }

  // Show results
  showResults();
}

// Calculate and display results
function showResults() {
  // Hide quiz section and show results section
  quizSection.hidden = true;
  resultsSection.hidden = false;

  // Calculate score
  let correctAnswers = 0;
  userAnswers.forEach((answer, index) => {
    if (answer !== null && questionsData[index].options[answer].correct) {
      correctAnswers++;
    }
  });

  const totalQuestions = questionsData.length;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);

  // Display results
  resultContent.innerHTML = `
    <p>You scored <strong>${correctAnswers}</strong> out of <strong>${totalQuestions}</strong> questions correctly.</p>
    <p>Your score: <strong>${scorePercentage}%</strong></p>
  `;

  // Generate feedback details
  let feedbackHTML = "<h3>Question Summary</h3><ul>";

  questionsData.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    const isCorrect =
      userAnswer !== null && question.options[userAnswer].correct;
    const userAnswerText =
      userAnswer !== null ? question.options[userAnswer].text : "Not answered";

    // Find the correct answer
    const correctAnswerText = question.options.find(
      (option) => option.correct
    ).text;

    feedbackHTML += `
      <li>
        <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
        <p>Your answer: <span class="${
          isCorrect ? "correct" : "incorrect"
        }">${userAnswerText}</span></p>
        ${!isCorrect ? `<p>Correct answer: ${correctAnswerText}</p>` : ""}
      </li>
    `;
  });

  feedbackHTML += "</ul>";
  feedbackDetails.innerHTML = feedbackHTML;

  // Announce results
  announceMessage(
    `Quiz completed. You scored ${correctAnswers} out of ${totalQuestions} questions correctly.`
  );
}

// Restart the quiz
function restartQuiz() {
  // Reset state and start over
  currentQuestionIndex = 0;
  userAnswers = new Array(questionsData.length).fill(null);

  // Show quiz section and hide others
  introSection.hidden = true;
  quizSection.hidden = false;
  resultsSection.hidden = true;

  // Load first question
  loadQuestion(currentQuestionIndex);

  // Announce restart
  announceMessage("Quiz restarted. First question loaded.");
}

// Go to homepage
function goToHomepage() {
  // Show intro section and hide others
  introSection.hidden = false;
  quizSection.hidden = true;
  resultsSection.hidden = true;

  // Announce homepage return
  announceMessage("Returned to homepage.");
}

// Utility function for screen reader announcements
function announceMessage(message) {
  announcer.textContent = message;
}
