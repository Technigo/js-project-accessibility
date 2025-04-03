//DOM ELEMENT
const form = document.getElementById('quiz-form');
const introSection = document.getElementById('quiz-introduction');
const startBtn = document.getElementById('intro-continue');
const quizSection = document.getElementById('quiz');
const fieldsets = document.querySelectorAll('form fieldset.tab'); //lista av frågorna
const nextBtn = document.getElementById('nextBtn');
const announcer = document.getElementById('announcer');

//Variabler
let currentStep = 0;

document.addEventListener('DOMContentLoaded', () => {
  // Listen to skip content link click
  document.querySelector('.skip-link').addEventListener('click', () => {
    form.classList.add('show-focus');
    target.scrollIntoView({ behavior: 'smooth', block: 'start' }); //Osäker på denna det var något för mobil
  });

  //Döljer quizet från start
  quizSection.style.display = 'none';
  fieldsets.forEach((fs) => {
    fs.style.display = 'none';
  });

  // Starta quizet
  startBtn.addEventListener('click', () => {
    introSection.style.display = 'none';
    quizSection.style.display = 'block';

    const firstFieldset = fieldsets[0];
    firstFieldset.style.display = 'block';
    firstFieldset.setAttribute('aria-hidden', 'false');

    const firstInput = fieldsets[0].querySelector('input');
    if (firstInput) firstInput.focus();
  });

  //Hantera Error/icke besvarade frågor

  //Submita quizet

  //Feedback och resultat till användaren
});
