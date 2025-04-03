//DOM ELEMENT
const form = document.getElementById('quiz-form');

document.addEventListener('DOMContentLoaded', () => {
  // Listen to skip content link click
  document.querySelector('.skip-link').addEventListener('click', () => {
    form.classList.add('show-focus');

    target.scrollIntoView({ behavior: 'smooth', block: 'start' }); //Osäker på denna det var något för mobil
  });

  //Starta quizet

  //Hantera Error/icke besvarade frågor

  //Submita quizet

  //Feedback och resultat till användaren
});
