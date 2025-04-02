// Quiz answers - most unlikely alternatives
const ANSWERS = {
  question1: 'tom',
  question2: 'crumbles',
  question3: 'gandalf'
};

// DOM Elements
const quizForm = document.getElementById('quiz-form');
const feedbackRegion = document.getElementById('feedback-region');
const quizResults = document.querySelector('#quizResults [role="status"]');
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
    question1: document.querySelector('input[name="question1"]:checked') ? document.querySelector('input[name="question1"]:checked').value : null,
    question2: document.querySelector('input[name="question2"]:checked') ? document.querySelector('input[name="question2"]:checked').value : null,
    question3: document.querySelector('input[name="question3"]:checked') ? document.querySelector('input[name="question3"]:checked').value : null
  };

  // Validate answers
  let score = 0;
  let errors = [];

  // Check each answer using a for loop
  for (let i = 1; i <= 3; i++) {
    const question = 'question' + i;
    const selectedAnswer = answers[question];

    if (!selectedAnswer) {
      errors.push('Please answer question ' + i);
      errorMessages[question].textContent = 'Please select an answer';
      errorMessages[question].style.display = 'block';
    } else if (selectedAnswer === ANSWERS[question]) {
      score++;
      errorMessages[question].textContent = 'Correct!';
      errorMessages[question].style.display = 'block';
      errorMessages[question].classList.add('correct');
    } else {
      errorMessages[question].textContent = 'Incorrect. Try again!';
      errorMessages[question].style.display = 'block';
      errorMessages[question].classList.add('incorrect');
    }
  }

  // Show results
  if (errors.length > 0) {
    quizResults.innerHTML = '<p>Please answer all questions: ' + errors.join(', ') + '</p>';
  } else {
    quizResults.innerHTML = '<p>Your score: ' + score + ' out of 3</p>';
  }
  
  // Scroll to results section
  quizResults.closest('section').scrollIntoView({ behavior: 'smooth' });
});

// Get all interactive elements
const interactiveElements = {
  links: document.querySelectorAll('a'),
  radioButtons: document.querySelectorAll('input[type="radio"]'),
  submitButton: document.querySelector('button[type="submit"]'),
  radioGroups: document.querySelectorAll('[role="radiogroup"]')
};

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
  const activeElement = document.activeElement;
  
  switch(e.key) {
    case 'Tab':
      break;
      
    case 'Enter':
      if (activeElement.tagName === 'A') {
        e.preventDefault();
        activeElement.click();
      }
      break;
      
    case ' ':
      if (activeElement.tagName === 'BUTTON') {
        e.preventDefault();
        activeElement.click();
      } else if (activeElement.closest('[role="radiogroup"]')) {
        e.preventDefault();
        const radioGroup = activeElement.closest('[role="radiogroup"]');
        const radioButtons = radioGroup.querySelectorAll('input[type="radio"]');
        const currentIndex = Array.from(radioButtons).findIndex(radio => radio.checked);
        const nextIndex = (currentIndex + 1) % radioButtons.length;
        radioButtons[nextIndex].checked = true;
        radioButtons[nextIndex].focus();
      }
      break;
      
    case 'ArrowRight':
    case 'ArrowDown':
      e.preventDefault();
      if (activeElement.closest('[role="radiogroup"]')) {
        const radioGroup = activeElement.closest('[role="radiogroup"]');
        const radioButtons = radioGroup.querySelectorAll('input[type="radio"]');
        const currentIndex = Array.from(radioButtons).findIndex(radio => radio.checked);
        const nextIndex = (currentIndex + 1) % radioButtons.length;
        radioButtons[nextIndex].checked = true;
        radioButtons[nextIndex].focus();
      }
      break;
      
    case 'ArrowLeft':
    case 'ArrowUp':
      e.preventDefault();
      if (activeElement.closest('[role="radiogroup"]')) {
        const radioGroup = activeElement.closest('[role="radiogroup"]');
        const radioButtons = radioGroup.querySelectorAll('input[type="radio"]');
        const currentIndex = Array.from(radioButtons).findIndex(radio => radio.checked);
        const prevIndex = (currentIndex - 1 + radioButtons.length) % radioButtons.length;
        radioButtons[prevIndex].checked = true;
        radioButtons[prevIndex].focus();
      }
      break;
      
    case 'Home':
      e.preventDefault();
      if (activeElement.closest('[role="radiogroup"]')) {
        const radioGroup = activeElement.closest('[role="radiogroup"]');
        const firstRadio = radioGroup.querySelector('input[type="radio"]');
        firstRadio.checked = true;
        firstRadio.focus();
      }
      break;
      
    case 'End':
      e.preventDefault();
      if (activeElement.closest('[role="radiogroup"]')) {
        const radioGroup = activeElement.closest('[role="radiogroup"]');
        const radioButtons = radioGroup.querySelectorAll('input[type="radio"]');
        const lastRadio = radioButtons[radioButtons.length - 1];
        lastRadio.checked = true;
        lastRadio.focus();
      }
      break;
  }
});

// Clear error messages when selecting a new answer
const allRadioButtons = document.querySelectorAll('input[type="radio"]');

allRadioButtons.forEach((radio) => {
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

// Announce questions when focused
document.querySelectorAll('fieldset').forEach((fieldset) => {
  fieldset.addEventListener('focus', () => {
    const legend = fieldset.querySelector('legend');
    if (legend) {
      // Create a live region announcement
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.style.position = 'absolute';
      announcement.style.width = '1px';
      announcement.style.height = '1px';
      announcement.style.padding = '0';
      announcement.style.margin = '-1px';
      announcement.style.overflow = 'hidden';
      announcement.style.clip = 'rect(0, 0, 0, 0)';
      announcement.style.whiteSpace = 'nowrap';
      announcement.style.border = '0';
      announcement.textContent = legend.textContent;
      document.body.appendChild(announcement);
      
      // Remove after announcement
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  }, true);
});
