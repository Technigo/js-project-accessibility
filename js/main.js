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

  //Klicka sig till nästa tab/flik
  nextBtn.addEventListener('click', () => {
    //Kontrollera att frågan är besvarad
    const currentFieldset = fieldsets[currentStep];
    const radios = currentFieldset.querySelectorAll("input[type='radio']");
    const oneChecked = Array.from(radios).some((radio) => radio.checked);

    //tar bort tidigare errormeddelande om det finns
    currentFieldset.classList.remove('error');
    const existingError = currentFieldset.querySelector('.error-message');
    if (existingError) existingError.remove();

    //ERROR om användaren inte valt ett svar
    if (!oneChecked) {
      currentFieldset.classList.add('error'); //röd border

      const errorMsg = document.createElement('div');
      errorMsg.className = 'error-message';
      errorMsg.setAttribute('role', 'alert');
      errorMsg.textContent = 'Ops! Did you forgot to select an answer?';
      currentFieldset.appendChild(errorMsg); //

      // Felmeddelande i announser
      announcer.textContent = 'Ops! Did you forgot to select an answer?';

      currentFieldset.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    //Om ett svar är valt -> Dölj frågan och visa nästa
    currentFieldset.style.display = 'none';
    currentFieldset.setAttribute('aria-hidden', 'true');
    currentStep++;

    if (currentStep < fieldsets.length) {
      const nextFieldset = fieldsets[currentStep];
      nextFieldset.style.display = 'block';
      nextFieldset.setAttribute('aria-hidden', 'false');

      const firstInput = nextFieldset.querySelector('input');
      if (firstInput) firstInput.focus();
    } else {
      console.log('Quiz done! 🎉');
    }
  });

  //Submita quizet

  //Feedback och resultat till användaren
});
