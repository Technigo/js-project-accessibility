// Quiz State Management
let currentQuestionIndex = 0;
let userAnswers = [];
let questionsData = [];

// DOM Elements - Organized by section
const sections = {
  intro: document.getElementById("introduction"),
  quiz: document.getElementById("quiz"),
  results: document.getElementById("results"),
};

const elements = {
  // Buttons
  startButton: document.getElementById("start-quiz-button"),
  nextButton: document.getElementById("nextQuestion"),
  previousButton: document.getElementById("previousQuestion"),
  submitButton: document.getElementById("submitQuiz"),
  restartButton: document.getElementById("restartQuiz"),
  homeButton: document.getElementById("backToHome"),

  // Quiz elements
  quizForm: document.getElementById("quiz-form"),
  questionContainer: document.getElementById("question-container"),
  questionContent: document.querySelector(".question-content"),

  // Progress indicators
  progressText: document.querySelector(".progress-text"),
  progressFill: document.querySelector(".progress-fill"),

  // Results elements
  resultContent: document.getElementById("result-content"),
  feedbackDetails: document.getElementById("feedback-details"),

  // Accessibility and error handling
  announcer: document.getElementById("announcer"),
  questionError: document.getElementById("question-error"),
  errorMessage: document.querySelector(".error-message"),
};

// Initialize the quiz
document.addEventListener("DOMContentLoaded", () => {
  // Import quiz questions from external file
  questionsData = questions || [];

  // Set up event listeners
  setupEventListeners();

  // Initialize user answers array
  resetUserAnswers();
});

// Set up all event listeners
function setupEventListeners() {
  elements.startButton.addEventListener("click", startQuiz);
  elements.nextButton.addEventListener("click", goToNextQuestion);
  elements.previousButton.addEventListener("click", goToPreviousQuestion);
  elements.quizForm.addEventListener("submit", handleQuizSubmit);
  elements.restartButton.addEventListener("click", restartQuiz);
  elements.homeButton.addEventListener("click", goToHomepage);
}

// Reset user answers to initial state
function resetUserAnswers() {
  userAnswers = new Array(questionsData.length).fill(null);
}

// Start the quiz
function startQuiz() {
  showSection("quiz");
  window.location.hash = "#quiz";

  // Reset quiz state
  currentQuestionIndex = 0;
  resetUserAnswers();

  // Load the first question
  loadQuestion(currentQuestionIndex);

  // Announce restart for screen readers
  announceMessage("Quiz started. First question loaded.");
}

// Load a question by index
function loadQuestion(index) {
  // Update progress indicators
  updateProgress(index);

  const currentQuestion = questionsData[index];

  // Clear previous question content
  elements.questionContent.innerHTML = "";

  // Update fieldset legend
  updateQuestionLegend(currentQuestion, index);

  // Create and add radio options
  createRadioOptions(currentQuestion, index);

  // Hide error message
  hideError();

  // Update navigation buttons
  updateNavigationButtons();
}

// Update the question legend in the fieldset
function updateQuestionLegend(question, index) {
  const fieldset = elements.questionContent.closest("fieldset");
  const legendId = `question-${index}`;

  // Remove existing legend if present
  const existingLegend = fieldset.querySelector("legend");
  if (existingLegend) {
    fieldset.removeChild(existingLegend);
  }

  // Create and add new legend
  const legend = document.createElement("legend");
  legend.id = legendId;
  legend.textContent = question.question;
  fieldset.insertBefore(legend, fieldset.firstChild);
}

// Create radio options for the current question
function createRadioOptions(question, questionIndex) {
  const radioGroup = document.createElement("div");
  radioGroup.className = "radio-group";
  radioGroup.setAttribute("role", "radiogroup");

  question.options.forEach((option, optionIndex) => {
    const radioOption = document.createElement("div");
    radioOption.className = "radio-option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = `question-${questionIndex}`;
    input.value = optionIndex;
    input.id = `option-${questionIndex}-${optionIndex}`;

    // Check if user has already answered this question
    if (userAnswers[questionIndex] === optionIndex) {
      input.checked = true;
    }

    const label = document.createElement("label");
    label.setAttribute("for", `option-${questionIndex}-${optionIndex}`);
    label.textContent = option.text;

    // Add event listener to capture answers
    input.addEventListener("change", () => {
      userAnswers[questionIndex] = optionIndex;
      hideError();
      updateNavigationButtons();
      updateProgress(currentQuestionIndex);
    });

    radioOption.appendChild(input);
    radioOption.appendChild(label);
    radioGroup.appendChild(radioOption);
  });

  elements.questionContent.appendChild(radioGroup);
}

// Update progress indicators
function updateProgress(index) {
  const totalQuestions = questionsData.length;
  const currentQuestionNum = index + 1;

  // Update text progress
  elements.progressText.innerHTML = `Question <b>${currentQuestionNum}</b> of <b>${totalQuestions}</b>`;

  // Count answered questions and update progress bar
  const answeredCount = userAnswers.filter((answer) => answer !== null).length;
  const progressPercentage = (answeredCount / totalQuestions) * 100;
  elements.progressFill.style.width = `${progressPercentage}%`;
}

// Update navigation buttons based on current state
function updateNavigationButtons() {
  const isLastQuestion = currentQuestionIndex === questionsData.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  // Show/hide previous button
  elements.previousButton.hidden = isFirstQuestion;

  // Show/hide next and submit buttons
  elements.nextButton.hidden = isLastQuestion;
  elements.submitButton.hidden = !isLastQuestion;
}

// Navigate to next question
function goToNextQuestion() {
  // Ensure current question is answered
  if (userAnswers[currentQuestionIndex] === null) {
    showError("Please select an answer before continuing.");
    return;
  }

  // Move to next question if not at the end
  if (currentQuestionIndex < questionsData.length - 1) {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);

    // Focus on first radio button for accessibility
    focusOnFirstRadioButton();
    announceMessage(`Question ${currentQuestionIndex + 1} loaded.`);
  }
}

// Navigate to previous question
function goToPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);

    // Focus on first radio button for accessibility
    focusOnFirstRadioButton();
    announceMessage(`Question ${currentQuestionIndex + 1} loaded.`);
  }
}

// Focus on the first radio button for keyboard navigation
function focusOnFirstRadioButton() {
  setTimeout(() => {
    const firstRadio = elements.questionContent.querySelector(
      'input[type="radio"]'
    );
    if (firstRadio) {
      firstRadio.focus();
    }
  }, 10);
}

// Show error message
function showError(message) {
  elements.questionError.hidden = false;
  elements.errorMessage.textContent = message;
  elements.announcer.textContent = message;
}

// Hide error message
function hideError() {
  elements.questionError.hidden = true;
}

// Handle quiz submission
function handleQuizSubmit(event) {
  event.preventDefault();

  // Ensure final question is answered
  if (userAnswers[currentQuestionIndex] === null) {
    showError("Please select an answer before submitting.");
    return;
  }

  showResults();
}

// Calculate and display results
function showResults() {
  showSection("results");

  // Calculate score
  const result = calculateScore();

  // Display score summary
  elements.resultContent.innerHTML = `
    <p>You scored <strong>${result.correct}</strong> out of <strong>${result.total}</strong> questions correctly.</p>`;

  // Generate detailed feedback
  elements.feedbackDetails.innerHTML = generateFeedbackHTML(result);

  // Announce results for screen readers
  announceMessage(
    `Quiz completed. You scored ${result.correct} out of ${result.total} questions correctly.`
  );
}

// Calculate quiz score
function calculateScore() {
  let correctAnswers = 0;
  const totalQuestions = questionsData.length;

  userAnswers.forEach((answer, index) => {
    if (answer !== null && questionsData[index].options[answer].correct) {
      correctAnswers++;
    }
  });

  return {
    correct: correctAnswers,
    total: totalQuestions,
    percentage: Math.round((correctAnswers / totalQuestions) * 100),
  };
}

// Generate HTML for feedback details
function generateFeedbackHTML(result) {
  let feedbackHTML = "<h3>Question Summary</h3><ul>";

  questionsData.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    const isCorrect =
      userAnswer !== null && question.options[userAnswer].correct;
    const userAnswerText =
      userAnswer !== null ? question.options[userAnswer].text : "Not answered";

    // Find the correct answer text
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

  return feedbackHTML + "</ul>";
}

// Restart the quiz
function restartQuiz() {
  // Reset state
  currentQuestionIndex = 0;
  resetUserAnswers();

  // Show quiz section
  showSection("quiz");

  // Load first question
  loadQuestion(currentQuestionIndex);

  // Announce restart for screen readers
  announceMessage("Quiz restarted. First question loaded.");
}

// Go to homepage
function goToHomepage() {
  showSection("intro");
  announceMessage("Returned to homepage.");
}

// Helper function to show a specific section and hide others
function showSection(sectionName) {
  Object.keys(sections).forEach((key) => {
    sections[key].hidden = key !== sectionName;
  });
}

// Screen reader announcement utility
function announceMessage(message) {
  elements.announcer.textContent = message;
}
