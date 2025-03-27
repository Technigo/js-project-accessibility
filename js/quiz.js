const submitAnswers = () => {
  const submitButton = document.getElementById("submit-button")
  submitButton.addEventListener("click", () => {
    compareAnswers()
  })
}

const compareAnswers = () => {
  // Correct answers
  // Question 1's correct answer is "A", question 2's is "B", etc.).
  const correctAnswers = ["answer1", "answer2", "answer3"]

  // Array to store user-selected answers
  const userAnswers = []

  // Retrieve user answers
  for (let i = 1; i <= 3; i++) {
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
  displayAnswers(totalCorrectAnswers, correctAnswers)
}

// Display the results
const displayAnswers = (totalCorrectAnswers, correctAnswers) => {
  const resultContainer = document.getElementById("result-container")
  // Display results
  resultContainer.innerHTML = `<h2>Your results:</h2> <p>You answered ${totalCorrectAnswers} out of ${correctAnswers.length} questions correctly.</p>`
}
