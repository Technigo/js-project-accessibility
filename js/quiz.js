const submitAnswers = () => {
  const submitButton = document.getElementById("submit-button")
  submitButton.addEventListener("click", () => {
    compareAnswers()
  })

  return
}

const compareAnswers = (submitAnswers) => {
  const question1 = document.getElementById("question-1")
  const question2 = document.getElementById("question-2")
  const question3 = document.getElementById("question-3")
  let results = ""

  if (question1.checked) {
    results++
  }

  if (question2.checked) {
    results++
  }

  if (question3.checked) {
    results++
  }

  revealAnswers(results)
}

const revealAnswers = (results) => {
  const quizContainer = document.getElementById(".quiz")
  // If submitAnswers has run
  if (submitAnswers) {
    // Clear container
    quizContainer.innerHTML = ""
    // Display results
    quizContainer.innerHTML = `<h2>Your results:</h2> You answered ${results} questions correctly.`
  }
}
