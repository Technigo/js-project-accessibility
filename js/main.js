document.addEventListener('DOMContentLoaded', function () {

  const cards = document.querySelectorAll('.quiz-card');
  let currentIndex = 0;
  let userAnswers = {};

  const correctAnswers = {
    0: "Images with helpful descriptions",
    1: "Collapsible sections",
    2: "A dark mode option",
    3: "Simple layout and easy-to-read text",
    4: "Videos with captions and text",
    5: "Keyboard friendly buttons",
  };

  //A function that loops through all the quiz cards and only shows the one that matches the target index, by adding the active class to it and hiding the rest
  const showCard = (targetIndex) => {
    cards.forEach((card, index) => {
      card.classList.toggle('active', index === targetIndex);
    });
  };

  // Gets all next buttons and adds an action
  const nextButtons = document.querySelectorAll('.next-btn')
  nextButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Move to the next question 
      if (currentIndex <= cards.length - 1) {
        handleNext();
      }
    });
  });

  //Gets all previous buttons and adds an action
  const previousButtons = document.querySelectorAll('.prev-btn')
  previousButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (currentIndex > 0) {
        handlePrevious();
      }
    });
  });

  //Start by showing first card
  showCard(currentIndex)

  //Get the answer selected by the user 

  const getSelectedAnswer = () => {
    const selectedOption = document.querySelector(`.quiz-card.active input[type="radio"]:checked`);
    return selectedOption ? selectedOption.value : null;
  };

  // Progress bar logic

  const form = document.getElementById('accessibility-quiz');
  const progressBar = document.querySelector(".quiz-progress");
  const progressFill = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-text');
  let answeredQuestions = new Set();

  const updateProgress = () => {
        const totalQuestions = 6; 
        const answeredCount = answeredQuestions.size;
        const percentage = (answeredCount / totalQuestions) * 100;

        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `${answeredCount} of ${totalQuestions} questions answered`;
        announcer.textContent = `${answeredCount} of ${totalQuestions} questions answered`;
      }

  form.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.addEventListener('change', () => {
          const questionName = radio.name; 
          answeredQuestions.add(questionName);
          updateProgress();
        });
      });

  // const createErrorMessage = () => {
  //   const errorMessage = document.createElement("div");
  //   errorMessage.classList.add("error-message");
  //   errorMessage.setAttribute("aria-live", "polite");
  //   errorMessage.textContent = "Please select an answer before proceeding.";
  //   return errorMessage;
  // };

  const createErrorMessage = () => {
    const errorContainer = document.querySelectorAll('.error-container')[currentIndex];
    errorContainer.textContent = "Please select an answer before proceeding";
  }

  const showSummary = () => {
    let summaryCard = document.getElementById("summary-card");
    progressBar.setAttribute("hidden", "true");

    if (!summaryCard) {
      summaryCard = document.createElement("fieldset");
      summaryCard.id = "summary-card";
      summaryCard.classList.add("quiz-card");
      summaryCard.innerHTML = `
        <h2>Your results:</h2>
        <div id="summary-content" aria-live="polite"></div>
        <button type="button" id="restart-btn">Restart Quiz</button>
      `;
      document.getElementById("accessibility-quiz").appendChild(summaryCard);
    }

    summaryCard.classList.add("active");

    const summaryContent = document.getElementById("summary-content");
    summaryContent.innerHTML = "";

    let correctCount = 0;
    Object.keys(userAnswers).forEach(index => {
      const answer = userAnswers[index];
      const resultText = answer.isCorrect ? "Correct ✅" : "Incorrect ❌";
      if (answer.isCorrect) {
        correctCount++;
      }

      summaryContent.innerHTML += `
        <p>Question ${parseInt(index) + 1}: ${resultText}</p>
      `;
    });

    summaryContent.innerHTML += `<h3>You got ${correctCount} out of ${cards.length} questions right!</h3>`;

    const restartButton = document.getElementById("restart-btn");
    restartButton.addEventListener("click", () => {
      currentIndex = 0;
      userAnswers = {};
      
      progressBar.removeAttribute("hidden");
      summaryCard.classList.remove("active");

      document.querySelectorAll('input[type="radio"]:checked').forEach((radio) => {
        radio.checked = false;
      });

      answeredQuestions.clear();

      showCard(currentIndex);

      updateProgress();
      
    });

    showCard(cards.length);
  }

  // Function that gets the user's answer, compares it to the right answer, and marks answer as right or wrong
  const handleNext = () => {

    const currentCard = cards[currentIndex];
    const selectedAnswer = getSelectedAnswer();
    const errorContainer = document.querySelectorAll('.error-container')[currentIndex];

    // Check if error message already exists and remove it if it does
    // const existingError = currentCard.querySelector(".error-message");
    // if (existingError) {
    //   existingError.remove();
    // }

    // If no answer selected create an error message
    // if (!selectedAnswer) {
    //   const errorMessage = createErrorMessage();
    //   errorContainer.appendChild(errorMessage);
    //   return;
    // }

    if (!selectedAnswer) {
      createErrorMessage();
      return;
    }

    // Store user's answer and correctness
    const correctAnswer = correctAnswers[currentIndex];
    userAnswers[currentIndex] = {
      selected: selectedAnswer,
      isCorrect: selectedAnswer === correctAnswer
    };

    if (currentIndex < cards.length) {
      currentIndex++;
    }

    // If at the end, show summary
    if (currentIndex === cards.length) {
      showSummary();
    } else {
      showCard(currentIndex);
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      currentIndex--;
      showCard(currentIndex);
    }
  }

});