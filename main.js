document.addEventListener('DOMContentLoaded', function () {
  const introductionSection = document.getElementById('introduction');
  const quizSection = document.getElementById('quiz');
  const startQuizButton = document.getElementById('start-quiz');
  const announcer = document.getElementById('announcer');
  const quizForm = document.getElementById('quiz-form');
  const resultSection = document.getElementById('results');
  const resultsContent = document.getElementById('results-content');

  startQuizButton.addEventListener('click', () => {
    introductionSection.hidden = true;
    quizSection.hidden = false;
    window.location.hash = '#quiz';
    document.getElementById('answer1').focus();
    quizSection.scrollIntoView({ behavior: 'smooth' });
    announcer.textContent = 'Quiz started!';
  })
  quizForm.addEventListener('submit', (event) => {
    console.log(event);
    event.preventDefault();
    announcer.textContent = 'Quiz completed!';
    const formData = new FormData(quizForm);
    const userAnswers = Object.fromEntries(formData);
    console.log(userAnswers);
    resultSection.hidden = false;
    document.getElementById('submit-button').hidden = true;
    var inputs = quizForm.querySelectorAll('input[type="radio"]');
    inputs.forEach(input => {
      input.disabled = true;
    });

    window.location.hash = '#results';
    let score = 0;
    document.getElementById('answer2').parentElement.classList.add('valid');

    const answer1 = document.getElementById('answer1').parentElement.querySelector('label').textContent;
    const answer2 = document.getElementById('answer2').parentElement.querySelector('label').textContent;
    const answer3 = document.getElementById('answer3').parentElement.querySelector('label').textContent;

    const answer23 = document.getElementById('answer-2-1').parentElement.querySelector('label').textContent;
    const answer24 = document.getElementById('answer-2-2').parentElement.querySelector('label').textContent;
    const answer25 = document.getElementById('answer-2-3').parentElement.querySelector('label').textContent;

    const answer31 = document.getElementById('answer-3-1').parentElement.querySelector('label').textContent;
    const answer32 = document.getElementById('answer-3-2').parentElement.querySelector('label').textContent;
    const answer33 = document.getElementById('answer-3-3').parentElement.querySelector('label').textContent;

    const questionsExplanations = [];

    if (userAnswers.question1 === 'b') {
      score++;
      const question1Explanation = document.createElement('p');
      question1Explanation.textContent = `Correct! The correct answer is ${answer2}`;
      questionsExplanations.push(question1Explanation);
    }
    else {
      const element = userAnswers.question1 === 'a' ? 'answer1' : 'answer3';
      document.getElementById(element).parentElement.classList.add('invalid');
      const question1Explanation = document.createElement('p');
      question1Explanation.textContent = `Incorrect. The correct answer is ${answer2}`;
      questionsExplanations.push(question1Explanation);
    }

    document.getElementById('answer-2-1').parentElement.classList.add('valid');
    if (userAnswers.question2 === 'a') {
      score++;
      const question2Explanation = document.createElement('p');
      question2Explanation.textContent = `Correct! The correct answer is ${answer23}`;
      questionsExplanations.push(question2Explanation);
    }
    else {
      const element = userAnswers.question2 === 'b' ? 'answer-2-2' : 'answer-2-3';
      document.getElementById(element).parentElement.classList.add('invalid');
      const question2Explanation = document.createElement('p');
      question2Explanation.textContent = `Incorrect. The correct answer is ${answer23}`;
      questionsExplanations.push(question2Explanation);
    }


    document.getElementById('answer-3-2').parentElement.classList.add('valid');
    if (userAnswers.question3 === 'b') {
      score++;
      const question3Explanation = document.createElement('p');
      question3Explanation.textContent = `Correct! The correct answer is ${answer32}`;
      questionsExplanations.push(question3Explanation);
    }
    else {
      const element = userAnswers.question3 === 'a' ? 'answer-3-1' : 'answer-3-3';
      document.getElementById(element).parentElement.classList.add('invalid');
      const question3Explanation = document.createElement('p');
      question3Explanation.textContent = `Incorrect. The correct answer is ${answer32}`;
      questionsExplanations.push(question3Explanation);
    }

    const resultsHeader = document.createElement('h2');
    resultsHeader.textContent = 'Quiz Results';

    const resultsText = document.createElement('p');
    resultsText.textContent = `You scored ${score} out of 3.`;






    resultsContent.appendChild(resultsHeader);
    resultsContent.appendChild(resultsText);
    questionsExplanations.forEach(explanation => {
      resultsContent.appendChild(explanation);
    });
  })


});