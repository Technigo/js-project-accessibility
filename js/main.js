//DOM ELEMENT
const form = document.getElementById('quiz-form');
const introSection = document.getElementById('quiz-introduction');
const startBtn = document.getElementById('intro-continue');
const quizSection = document.getElementById('quiz');
const fieldsets = document.querySelectorAll('form fieldset.tab'); //lista av frågorna
const nextBtn = document.getElementById('nextBtn');
let announcer = document.getElementById('announcer');
const prevBtn = document.getElementById('prevBtn');
const progressText = document.getElementById('progress-text');

//Variabler
let currentStep = 0;
let score = 0;
let answeredQuestions = new Set();

const correctAnswers = {
  question1: 'b', // Describes images to screen readers
  question2: 'b', // <fieldset>
  question3: 'b', // Politely reads dynamic changes to users
  // question4: 'b', // Helps search engines and assistive tech
  // question5: 'c', // <button>
  // question6: 'b', // Arrow keys within a group
  // question7: 'c', // Jump past repeated content
  // question8: 'b', // 4.5:1
  // question9: 'b', // Adds to normal tab order
  // question10: 'c', // Everyone
};

document.addEventListener('DOMContentLoaded', () => {
  // Listen to skip content link click
  document.querySelector('.skip-link').addEventListener('click', (e) => {
    introSection.classList.add('show-focus');
    e.target.scrollIntoView({ behavior: 'smooth', block: 'start' }); //Osäker på denna det var något för mobil
  });

  //Döljer quizet från start
  quizSection.style.display = 'none';
  fieldsets.forEach((fs) => {
    fs.style.display = 'none';
  });

  //START-BUTTON Starta quizet
  startBtn.addEventListener('click', () => {
    introSection.style.display = 'none';
    quizSection.style.display = 'block';

    const firstFieldset = fieldsets[0];
    firstFieldset.style.display = 'block';
    firstFieldset.setAttribute('aria-hidden', 'false');

    const firstInput = fieldsets[0].querySelector('input');
    if (firstInput) firstInput.focus();

    updateStepIndicator();
  });

  //Progress punkter
  const totalSteps = fieldsets.length;
  const stepsContainer = document.getElementById('progress-steps');

  for (let i = 0; i < totalSteps; i++) {
    const step = document.createElement('span');
    step.classList.add('step');
    stepsContainer.appendChild(step);
  }

  //NEXT-BUTTOM Klicka sig till nästa tab/flik
  nextBtn.addEventListener('click', () => {
    console.log('Innan ökning, currentStep:', currentStep);

    const currentFieldset = fieldsets[currentStep];
    const radios = currentFieldset.querySelectorAll("input[type='radio']");
    const oneChecked = Array.from(radios).some((radio) => radio.checked);

    // Rensa tidigare fel
    currentFieldset.classList.remove('error');
    const existingError = currentFieldset.querySelector('.error-message');
    if (existingError) existingError.remove();

    if (!oneChecked) {
      currentFieldset.classList.add('error');

      const errorMsg = document.createElement('div');
      errorMsg.className = 'error-message';
      errorMsg.setAttribute('role', 'alert');
      errorMsg.textContent = 'Ops! Did you forgot to select an answer?';
      currentFieldset.appendChild(errorMsg);

      announcer.textContent = 'Ops! Did you forgot to select an answer?';
      currentFieldset.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Lägg till frågan i Set: answeredQuestions
    const selected = Array.from(radios).find((radio) => radio.checked);
    answeredQuestions.add(selected.name);
    updateProgressText();

    // Dölj nuvarande fråga
    currentFieldset.style.display = 'none';
    currentFieldset.setAttribute('aria-hidden', 'true');

    // Gå vidare till nästa steg
    currentStep++;
    console.log('efter ökning currentStep:', currentStep);

    if (currentStep < fieldsets.length) {
      // Visa nästa fråga
      const nextFieldset = fieldsets[currentStep];
      nextFieldset.style.display = 'block';
      nextFieldset.setAttribute('aria-hidden', 'false');

      const firstInput = nextFieldset.querySelector('input');
      if (firstInput) firstInput.focus();

      updateStepIndicator();
      updateNextButtonText();
      updatePrevButtonVisibility();
    }
  });

  //PREVIOUS BUTTON
  prevBtn.addEventListener('click', () => {
    //göm nuvarande fråga
    const currentFieldset = fieldsets[currentStep];
    currentFieldset.style.display = 'none';
    currentFieldset.setAttribute('aria-hidden', 'true');

    currentStep--;

    //Visa föregående fråga
    const previousFieldset = fieldsets[currentStep];
    previousFieldset.style.display = 'block';
    previousFieldset.setAttribute('aria-hidden', 'false');

    const firstInput = previousFieldset.querySelector('input');
    if (firstInput) firstInput.focus();

    //rensa eventulla errormeddelanden eller announcers
    previousFieldset.classList.remove('error');
    const errorMsg = previousFieldset.querySelector('.error-message');
    if (errorMsg) errorMsg.remove();

    announcer = '';

    updatePrevButtonVisibility();
    updateNextButtonText();
    updateStepIndicator();
    updateProgressText();
  });

  //Submita quizet
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Quiz done! 🎉');

    //Dölj quiz
    const quizSection = document.getElementById('quiz');
    quizSection.style.display = 'none';
    quizSection.setAttribute('aria-hidden', 'true');

    //Visa section quiz-result
    const resultSection = document.getElementById('quiz-result');
    resultSection.style.display = 'block';
    resultSection.setAttribute('aria-hidden', 'false');

    //samla användarens svar
    const formData = new FormData(form);
    console.log('form submitted');
    const userAnswers = Object.fromEntries(formData.entries());

    //räkna poäng
    for (const key in correctAnswers) {
      if (userAnswers[key] === correctAnswers[key]) {
        score++;
      }
    }

    //Skriv ut poängen
    const totalQuestions = Object.keys(correctAnswers).length;
    document.getElementById(
      'quiz-score'
    ).textContent = `You got ${score} out of ${totalQuestions} correct.`;
  });

  console.log('Antal frågor:', fieldsets.length);
});

//Kontrollerar om previous-knappen ska synas eller inte
const updatePrevButtonVisibility = () => {
  if (currentStep === 0) {
    nextBtn.blur(); // Ta bort fokus från knappen innan vi gömmer den
    prevBtn.style.display = 'none';
    prevBtn.setAttribute('aria-hidden', 'true');
  } else {
    prevBtn.style.display = 'inline';
    prevBtn.setAttribute('aria-hidden', 'false');
  }
};

//Kollar om next-knappen ska bli en submitknapp
const updateNextButtonText = () => {
  if (currentStep === fieldsets.length - 1) {
    nextBtn.textContent = 'Submit Quiz';
    // Vänta tills nuvarande klickhändelse är klar
    setTimeout(() => {
      nextBtn.setAttribute('type', 'submit');
    }, 0);
  } else {
    nextBtn.textContent = 'Next';
    nextBtn.setAttribute('type', 'button');
  }
};

//aktivera progresspunkter
const updateStepIndicator = () => {
  const steps = document.querySelectorAll('.step');

  steps.forEach((step, i) => {
    //rensa vid varje start.
    step.classList.remove('active', 'completed');

    if (i < currentStep) {
      step.classList.add('completed');
    } else if (i === currentStep) {
      step.classList.add('active');
    }
  });
};

//Lärare-Niklas progress-räkning
const updateProgressText = () => {
  const totalQuestions = fieldsets.length;
  const answeredCount = answeredQuestions.size;

  progressText.textContent = `${answeredCount} of ${totalQuestions} questions answered`;
};
