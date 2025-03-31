//DOM ELEMENT
const form = document.getElementById('quiz-form');

// Listen to skip a link click
document.querySelector('.skip-link').addEventListener('click', () => {
  form.classList.add('show-focus');

  target.scrollIntoView({ behavior: 'smooth', block: 'start' }); //Osäker på denna det var något för mobil
});
