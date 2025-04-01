// Quiz answers - most unlikely alternatives
const ANSWERS = {
  question1: 'tom',      // Tom Bombadil (ADHD)
  question2: 'crumbles', // Cheese crumbles
  question3: 'gandalf'   // Gandalf Grey
};

// DOM Elements
const quizForm = document.getElementById('quiz-form');
const feedbackRegion = document.getElementById('feedback-region');
const errorMessages = {
  question1: document.getElementById('error-question1'),
  question2: document.getElementById('error-question2'),
  question3: document.getElementById('error-question3')
};

// Handle form submission
quizForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get all selected answers
  const answers = {
    question1: document.querySelector('input[name="question1"]:checked')?.value,
    question2: document.querySelector('input[name="question2"]:checked')?.value,
    question3: document.querySelector('input[name="question3"]:checked')?.value
  };

  // Validate answers
  let score = 0;
  let errors = [];

  // Check each answer
  Object.keys(answers).forEach(question => {
    if (!answers[question]) {
      errors.push(`Please answer question ${question.replace('question', '')}`);
      errorMessages[question].textContent = 'Please select an answer';
      errorMessages[question].style.display = 'block';
    } else if (answers[question] === ANSWERS[question]) {
      score++;
      errorMessages[question].textContent = 'Correct!';
      errorMessages[question].style.display = 'block';
      errorMessages[question].classList.add('correct');
    } else {
      errorMessages[question].textContent = 'Incorrect. Try again!';
      errorMessages[question].style.display = 'block';
      errorMessages[question].classList.add('incorrect');
    }
  });

  // Announce results
  if (errors.length > 0) {
    feedbackRegion.textContent = `Please answer all questions: ${errors.join(', ')}`;
  } else {
    feedbackRegion.textContent = `Your score: ${score} out of 3`;
  }
});

// Keyboard navigation for radio groups
document.querySelectorAll('[role="radiogroup"]').forEach(radiogroup => {
  const radioButtons = radiogroup.querySelectorAll('input[type="radio"]');
  let currentIndex = 0;

  radiogroup.addEventListener('keydown', (e) => {
    switch(e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        currentIndex = (currentIndex + 1) % radioButtons.length;
        radioButtons[currentIndex].focus();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        currentIndex = (currentIndex - 1 + radioButtons.length) % radioButtons.length;
        radioButtons[currentIndex].focus();
        break;
    }
  });
});

// Focus management for error messages
function focusError(messageElement) {
  if (messageElement && messageElement.textContent) {
    messageElement.focus();
  }
}

// Clear error messages when user selects an answer
document.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const questionId = radio.name;
    const errorMessage = errorMessages[questionId];
    if (errorMessage) {
      errorMessage.textContent = '';
      errorMessage.style.display = 'none';
      errorMessage.classList.remove('correct', 'incorrect');
    }
  });
});
