const submitAnswers = (event) => {
  const submitButton = document.getElementById("submit-button")
  submitButton.addEventListener("click", (event) => {
    event.preventDefault() // Prevent the form from reloading the page
    console.log("Submit button clicked")
    // Call the function to compare answers
    compareAnswers()
  })
}

const compareAnswers = () => {
  const correctAnswers = ["answer1", "answer2", "answer3"] // Question 1's correct answer is [0], question 2's is [1], etc.).

  const userAnswers = [] // Array to store user-selected answers
  const numberOfQuestions = 3 // Number of questions in the quiz - in case we want to add more questions in the future - just change this variable

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

  displayAnswers(totalCorrectAnswers, correctAnswers)
}

// Display the results
const displayAnswers = (totalCorrectAnswers, correctAnswers) => {
  console.log("Displaying results")
  const resultContainer = document.getElementById("result-container")
  resultContainer.innerHTML = `<h2>Your results:</h2>
  <p>You answered ${totalCorrectAnswers} out of ${correctAnswers.length} questions correctly.</p>`
}
