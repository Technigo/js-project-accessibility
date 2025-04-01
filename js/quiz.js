const submitButton = document.getElementById("submit-button")

submitButton.addEventListener("click", (event) => {
  event.preventDefault() // Prevent the form from reloading the page
  console.log("Submit button clicked")
  submitAnswers()
})

const submitAnswers = (event) => {
  // Call the function to compare answers
  compareAnswers()
}

const compareAnswers = () => {
  const correctAnswers = ["answer1", "answer2", "answer3"] // Question 1's correct answer is [0], question 2's is [1], etc.).

  const userAnswers = [] // Array to store user-selected answers
  const numberOfQuestions = 3 // Number of questions in the quiz - in case we want to add more questions in the future - just change this variable

  console.log("Comparing answers...")

  // Retrieve user answers
  for (let i = 1; i <= numberOfQuestions; i++) {
    const question = document.querySelector(
      `input[name="question${i}"]:checked`
    )
    if (question) {
      userAnswers.push(question.value) // Add the selected answer to the userAnswers array
    } else {
      userAnswers.push(null) // If no answer is selected, push null
    }
  }

  let totalCorrectAnswers = 0

  // Compare user answers with correct answers
  for (let i = 0; i < correctAnswers.length; i++) {
    if (userAnswers[i] === correctAnswers[i]) {
      totalCorrectAnswers++ // Increment the count of correct answers
    }
  }
  displayAnswers(totalCorrectAnswers, correctAnswers, userAnswers)
}

// Loop through each question to display individual feedback (correct/incorrect)
// Get the question number, the user's selected answer, and the correct answer
const displayUserFeedback = (userAnswers, correctAnswers) => {
  for (let i = 0; i < correctAnswers.length; i++) {
    const questionNumber = i + 1
    const userAnswer = userAnswers[i]
    const correctValue = correctAnswers[i]

    const feedbackDiv = document.getElementById(
      `feedback-question${questionNumber}`
    )
    const correctInput = document.querySelector(
      `input[name="question${questionNumber}"][value="${correctValue}"]`
    )

    const correctText = correctInput.parentElement.textContent.trim() // Get the text of the correct answer option

    /*console.log(`Question ${questionNumber}:`);
    console.log(`Your answer: ${userAnswer}`);
    console.log(`Right answer: ${correct}`);*/

    // Display feedback based on the user's answer
    if (userAnswer === correctValue) {
      feedbackDiv.classList.add("success-feedback")
      feedbackDiv.innerHTML = `<p>Yes! You got this! ${correctText} is correct!</p>`
    } else if (userAnswer === null) {
      feedbackDiv.classList.add("error-feedback")
      feedbackDiv.innerHTML = `<p>You forgot to answer!</p>`
    } else {
      feedbackDiv.classList.add("error-feedback")
      feedbackDiv.innerHTML = `<p>Wrong. The right answer is ${correctText.toLowerCase()}</p>`
    }
  }
}

// Display the results
const displayAnswers = (totalCorrectAnswers, correctAnswers, userAnswers) => {
  const resultContainer = document.getElementById("result-container")
  resultContainer.innerHTML = `<h2>Your results:</h2>
  <p>You answered ${totalCorrectAnswers} out of ${correctAnswers.length} questions correctly.</p>`
  displayUserFeedback(userAnswers, correctAnswers) // Call the function to display feedback for each question
}
