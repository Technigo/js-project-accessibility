const submitAnswers = (event) => {
  const submitButton = document.getElementById("submit-button");
  submitButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the form from reloading the page
    console.log("Submit button clicked");
    // Call the function to compare answers
    compareAnswers();
  });
};

const compareAnswers = () => {
  console.log("Comparing answers");
  // Correct answers
  // Question 1's correct answer is "A", question 2's is "B", etc.).
  const correctAnswers = ["answer1", "answer2", "answer3"];

  // Array to store user-selected answers
  const userAnswers = [];

  // Retrieve user answers
  for (let i = 1; i <= 3; i++) {
    const question = document.querySelector(
      `input[name="question${i}"]:checked`
    );
    if (question) {
      userAnswers.push(question.value); // Add the selected answer to the userAnswers array
    } else {
      userAnswers.push(null); // If no answer is selected, push null
    }
  }

  let totalCorrectAnswers = 0;

  // Compare user answers with correct answers
  for (let i = 0; i < correctAnswers.length; i++) {
    if (userAnswers[i] === correctAnswers[i]) {
      totalCorrectAnswers++; // Increment the count of correct answers
    }
  }

  // Loop through each question to display individual feedback (correct/incorrect)
  // Get the question number, the user's selected answer, and the correct answer
  for (let i = 0; i < correctAnswers.length; i++) {
    const questionNumber = i + 1;
    const userAnswer = userAnswers[i];
    const correct = correctAnswers[i];

    console.log(`Question ${questionNumber}:`);
    console.log(`Your answer: ${userAnswer}`);
    console.log(`Right answer: ${correct}`);

    const feedbackDiv = document.getElementById(
      `feedback-question${questionNumber}`
    );

    if (userAnswer === correct) {
      feedbackDiv.innerHTML = `<p style="color: green;> Yes! You got this!</p>"`;
    } else if (userAnswer === null) {
      feedbackDiv.innerHTML = `<p style="color": red;> You forgot to answer!</p>`;
    } else {
      feedbackDiv.innerHTML = `<p style="color": red; Wrong. The right answer is ${correct}</p>`;
    }
  }

  function displayAnswers();
  
  // Display the results
  displayAnswers = (totalCorrectAnswers, correctAnswers) => {
    console.log("Displaying results");
    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = `<h2>Your results:</h2>
  <p>You answered ${totalCorrectAnswers} out of ${correctAnswers.length} questions correctly.</p>`;
  };
};
