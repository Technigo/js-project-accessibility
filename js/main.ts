//#region --- DOM Elements ----- 
const navLinks = document.querySelector("#nav-links") as HTMLElement
const menuIcon = document.querySelector("#menu-icon") as HTMLElement
const startQuizBtn = document.querySelector("#start-quiz-btn") as HTMLElement
const questionTitle = document.querySelector("#question-title") as HTMLElement
const questionText = document.querySelector("#question-text") as HTMLParagraphElement
// const optionA2 = document.querySelector('label[for="question1"]')
const optionA = document.querySelector('label[for="option-a"]') as HTMLLabelElement
const optionB = document.querySelector('label[for="option-b"]') as HTMLLabelElement
const optionC = document.querySelector('label[for="option-c"]') as HTMLLabelElement
const optionD = document.querySelector('label[for="option-d"]') as HTMLLabelElement
const resultTitle = document.querySelector("#result-title") as HTMLElement
const resultExplanation = document.querySelector("#result-explanation") as HTMLParagraphElement
const submitAnswerBtn = document.querySelector("#answer-btn") as HTMLElement
const nextQuestionBtn = document.querySelector("#next-question-btn") as HTMLElement
const startPage = document.querySelector("#start-page") as HTMLElement
const quizContainer = document.querySelector("#quiz-container") as HTMLElement
const resultContainer = document.querySelector("#result-container") as HTMLElement
const quizResult = document.querySelector("#quiz-result") as HTMLElement
const quizResultTitle = document.querySelector("#quiz-result-title") as HTMLElement
const quizResultText = document.querySelector("#quiz-result-text") as HTMLParagraphElement
const startAgainBtn = document.querySelector("#start-again-btn") as HTMLButtonElement
const selectionForm = document.querySelector("#selection-from") as HTMLFormElement
const radioButtonGroup = document.querySelector(".radio-button-group") as HTMLDivElement
const radioButtonCheck = document.querySelectorAll('input[name="question1"]') as NodeListOf<HTMLInputElement>
const backBtn = document.querySelector("#back-btn") as HTMLButtonElement


let currentStep: number = -1
let userChoice: string = ""
let currentQuestion: any = null
let score: number = 0

//#endregion

//#region --- Functions -----

//#region --- User Idetifier -----
const userChoiseIdentifier = (): void => {
  const options = document.querySelectorAll('input[name="question1"]') as NodeListOf<HTMLInputElement>
  options.forEach(button => {
    button.addEventListener("change", (event) => {
      userChoice = (event.target as HTMLInputElement).value
      console.log(`User selected: ${userChoice} and correct is ${currentQuestion.correctAnswer}`)
    })
  })
}

userChoiseIdentifier()

//#endregion

//#region --- Burger Menu -----
const burgerMenu = (): void => {
  navLinks.classList.toggle("active")
  menuIcon.classList.toggle("fa-bars")
  menuIcon.classList.toggle("fa-times")
}
//#endregion

//#region --- Load Next Question -----
const loadNextQuestion = () => {
  userChoice = ""
  currentStep++
  radioButtonCheck.forEach((radio): void => {
    radio.checked = false
  }
  )

  console.log(currentStep)

  if (currentStep >= questions.length) {
    quizResultTitle.innerHTML = "Quiz is over"
    quizResultText.innerHTML = `Your score is: ${score} / ${questions.length}`
    resultContainer.style.zIndex = ("0")
    quizResult.style.zIndex = ("1")
    quizResult.classList.remove("hide")
    quizContainer.classList.remove("hide")
    requestAnimationFrame(() => {
      quizResult.classList.remove("offset")
    })
    setTimeout(() => {
      resultContainer.classList.add("hide")
      resultContainer.classList.add("offset")
    }, 50
    )

  } else {
    currentQuestion = questions[currentStep]
    questionTitle.innerHTML = (`Question ${currentStep + 1}/${questions.length}`)
    questionText.innerHTML = (currentQuestion.questionText)
    optionA.innerHTML = (currentQuestion.options[0])
    optionB.innerHTML = (currentQuestion.options[1])
    optionC.innerHTML = (currentQuestion.options[2])
    optionD.innerHTML = (currentQuestion.options[3])

    resultContainer.style.zIndex = ("0")
    quizContainer.style.zIndex = ("1")
    quizContainer.classList.remove("hide")
    requestAnimationFrame(() => {
      quizContainer.classList.remove("offset")
    })
    setTimeout(() => {
      startPage.classList.add("hide")
      resultContainer.classList.add("hide")
      resultContainer.classList.add("offset")
    }, 500)

    if (currentStep % questions.length === questions.length - 1) {
      submitAnswerBtn.innerHTML = "SEE RESULTS"
    }
  }
}

//#endregion

//#region --- Load answer -----
const loadNextAnswer = (event: Event): void => {
  if (event) event.preventDefault()

  if (userChoice === currentQuestion.correctAnswer) {
    console.log("You are correct!")
    resultTitle.innerHTML = currentQuestion.resultTitleWin
    resultExplanation.innerHTML = currentQuestion.resultExplanationWin
    score++
    console.log(score)
  } else if (userChoice === "") {
    alert("Please select an answer.")
  } else {
    console.log("Sorry, wrong answer.")
    resultTitle.innerHTML = currentQuestion.resultTitleLose
    resultExplanation.innerHTML = currentQuestion.resultExplanationLose
  }

  quizContainer.style.zIndex = ("0")
  resultContainer.style.zIndex = ("1")
  resultContainer.classList.remove("hide")
  quizContainer.classList.remove("hide")
  requestAnimationFrame(() => {
    resultContainer.classList.remove("offset")
  })
  setTimeout(() => {
    quizContainer.classList.add("hide")
    quizContainer.classList.add("offset")
  }, 500
  )
}
//#endregion

//#region --- Start over ----
const startAgain = (): void => {
  submitAnswerBtn.innerHTML = "SUBMIT"
  startPage.style.zIndex = ("0")
  startPage.classList.remove("hide")
  startPage.classList.remove("offset")
  quizResult.classList.add("hide")
  currentStep = -1
  score = 0
}

//#endregion


//#endregion

//#region --- Event listeners -----
menuIcon.addEventListener("click", burgerMenu)
startQuizBtn.addEventListener("click", loadNextQuestion)
submitAnswerBtn.addEventListener("click", loadNextAnswer)
nextQuestionBtn.addEventListener("click", loadNextQuestion)
startAgainBtn.addEventListener("click", startAgain)

//#endregion

console.log(questions.length)