//#region --- DOM Elements -----

//Buttons
const skipToMain = document.querySelector("#skip-to-main") as HTMLDivElement;
const navLinks = document.querySelector("#nav-links") as HTMLDivElement;
const menuIcon = document.querySelector("#menu-icon") as HTMLButtonElement;
const startQuizBtn = document.querySelector("#start-quiz-btn") as HTMLElement;
const submitAnswerBtn = document.querySelector("#answer-btn") as HTMLElement;
const nextQuestionBtn = document.querySelector("#next-question-btn") as HTMLElement;
const startAgainBtn = document.querySelector("#start-again-btn") as HTMLButtonElement;
const radioButtonCheck = document.querySelectorAll('input[name="question1"]') as NodeListOf<HTMLInputElement>;
const motionModeIcon = document.querySelector("#motion-mode-icon") as HTMLElement;
const darkmodetoggle = document.querySelector("#dark-mode-icon") as HTMLButtonElement;

//Links
const indexPage = document.querySelector("#index-page") as HTMLAnchorElement;
const aboutPage = document.querySelector("#about-page") as HTMLAnchorElement;

//Containers & sections
const theBody = document.querySelector("body") as HTMLBodyElement;
const main = document.querySelector("#main-content") as HTMLElement;
const selectionForm = document.querySelector("#selection-form") as HTMLFormElement;
const legend = document.querySelector("#legend") as HTMLAnchorElement;
const testing = document.querySelector("#testing") as HTMLAnchorElement;
const startPage = document.querySelector("#start-page") as HTMLElement;
const quizContainer = document.querySelector("#quiz-container") as HTMLElement;
const answerBtnContainer = document.querySelector("#answer-btn-container") as HTMLButtonElement;
const resultContainer = document.querySelector("#result-container") as HTMLElement;
const radioButtonGroup = document.querySelector(".radio-button-group") as HTMLDivElement;
const darkModeContainer = document.querySelector("#dark-mode-container") as HTMLButtonElement;

//texts
const titleText = document.querySelector(".title-text") as HTMLElement;
const questionTitle = document.querySelector("#question-title") as HTMLHeadingElement;
const questionText = document.querySelector("#question-text") as HTMLParagraphElement;
const resultTitle = document.querySelector("#result-title") as HTMLElement;
const resultExplanation = document.querySelector("#result-explanation") as HTMLParagraphElement;
const quizResult = document.querySelector("#quiz-result") as HTMLElement;
const quizResultTitle = document.querySelector("#quiz-result-title") as HTMLElement;
const quizResultText = document.querySelector("#quiz-result-text") as HTMLParagraphElement;


//Options
const optionA = document.querySelector('label[for="option-a"]') as HTMLLabelElement;
const optionB = document.querySelector('label[for="option-b"]') as HTMLLabelElement;
const optionC = document.querySelector('label[for="option-c"]') as HTMLLabelElement;
const optionD = document.querySelector('label[for="option-d"]') as HTMLLabelElement;

//Extra
const cards = document.querySelectorAll(".card") as NodeListOf<HTMLElement>;
const scrollLeft = main.scrollLeft;
const cardWidth = cards[0].offsetWidth; // Assuming all cards have the same width

//Objects & Arrays

let reduceMotion = false;
let currentStep: number = -1;
let currentPage = startPage;
let userChoice: string = "";
let currentQuestion: any = null;
let score: number = 0;

//#endregion

//#region --- Functions -----

//#region --- User Idetifier -----
const userChoiseIdentifier = (): void => {
  const options = document.querySelectorAll('input[name="question1"]') as NodeListOf<HTMLInputElement>;
  options.forEach((button) => {
    button.addEventListener("change", (event) => {
      userChoice = (event.target as HTMLInputElement).value;
    });
  });
};

userChoiseIdentifier();

//#endregion

//#region --- Burger Menu -----
const burgerMenu = (): void => {
  navLinks.classList.toggle("active");
  menuIcon.classList.toggle("fa-bars");
  menuIcon.classList.toggle("fa-times");

  const isExpanded = menuIcon.getAttribute("aria-expanded") === "true";
  menuIcon.setAttribute("aria-expanded", isExpanded ? "false" : "true");

  const currentLabel = isExpanded ? "Open main menu" : "Close main menu";
  menuIcon.setAttribute("aria-label", currentLabel);

  const isMenuOpen = navLinks.classList.contains("active");
  navLinks.setAttribute("aria-hidden", isMenuOpen ? "false" : "true");
};
//#endregion

//#region --- Load Next Question -----
const loadNextQuestion = (): void => {
  userChoice = "";
  currentStep++;
  radioButtonCheck.forEach((radio): void => {
    radio.checked = false;
  });

  if (currentStep >= questions.length) {
    quizResultTitle.innerHTML = "The quiz is over!";
    quizResultText.innerHTML = `Your result is ${score} / ${questions.length}`;
    transition(resultContainer, quizResult, null);
  } else {
    currentQuestion = questions[currentStep];
    questionTitle.innerHTML = `Question ${currentStep + 1}/${questions.length}`;
    questionText.innerHTML = currentQuestion.questionText;
    optionA.innerHTML = currentQuestion.options[0];
    optionB.innerHTML = currentQuestion.options[1];
    optionC.innerHTML = currentQuestion.options[2];
    optionD.innerHTML = currentQuestion.options[3];
    transition(resultContainer, quizContainer, startPage);
  }
};

//#endregion

//#region --- Load answer -----
const loadNextAnswer = (event: Event): void => {
  if (event) event.preventDefault();

  if (userChoice === "") {
    legend.innerHTML = "You have not selected an option";

    legend.classList.add("error-text");
    submitAnswerBtn.classList.add("error-btn");
    radioButtonGroup.classList.add("error-frame");

    legend.setAttribute("aria-live", "assertive");
    legend.setAttribute("role", "alert");
    legend.focus();

    return;
  }

  if (userChoice === currentQuestion.correctAnswer) {
    resultTitle.innerHTML = currentQuestion.resultTitleWin;
    resultExplanation.innerHTML = currentQuestion.resultExplanationWin;
    score++;
  } else {
    resultTitle.innerHTML = currentQuestion.resultTitleLose;
    resultExplanation.innerHTML = currentQuestion.resultExplanationLose;
  }
  transition(quizContainer, resultContainer, null);

  if (currentStep % questions.length === questions.length - 1) {
    nextQuestionBtn.innerHTML = "SEE RESULT";
  }
};

const resetErrorStyle = () => {
  legend.innerHTML = "Choose the correct answer:";
  legend.classList.remove("error-text");
  submitAnswerBtn.classList.remove("error-btn");
  radioButtonGroup.classList.remove("error-frame");
  legend.removeAttribute("aria-live");
  legend.removeAttribute("role");
};

//#endregion

//#region --- Start over ----
const startAgain = (): void => {
  nextQuestionBtn.innerHTML = "NEXT QUESTION";
  currentStep = -1;
  score = 0;
  transition(quizResult, startPage, null);
};

//#endregion

//#region --- Keyboard Navigation ----
const handleKeyEvent = (event: KeyboardEvent, button: HTMLElement): void => {
  switch (event.key) {
    case "Enter":
      switch (document.activeElement) {
        case button:
          button.click();
          break;
        case skipToMain:
          main.focus()
          break;
        case menuIcon:
          burgerMenu();
          break;
        case indexPage:
          indexPage.click();
          break;
        case aboutPage:
          aboutPage.click();
          break;
        case darkModeContainer:
          darkmode();
          break;
        case motionModeIcon:
          toggleReduceMotion(); // Add this line!
          break;
        case optionA:
          event.preventDefault();
          optionA.click();
          break;
        case optionB:
          event.preventDefault();
          optionB.click();
          break;
        case optionC:
          event.preventDefault();
          optionC.click();
          break;
        case optionD:
          event.preventDefault();
          optionD.click();
          break;
        case answerBtnContainer:
          loadNextAnswer();
          setTimeout(() => {
            resultTitle.focus();
          }, 600);
          break;
        case nextQuestionBtn:
          setTimeout(() => {
            questionTitle.focus();
          }, 600);
          break;
        case startAgainBtn:
          setTimeout(() => {
            titleText.focus();
          }, 600);
          break;
        default:
          if (
            document.activeElement !== skipToMain &&
            document.activeElement !== button &&
            document.activeElement !== menuIcon &&
            document.activeElement !== indexPage &&
            document.activeElement !== aboutPage &&
            document.activeElement !== darkmodetoggle &&
            document.activeElement !== motionModeIcon &&
            document.activeElement !== optionA &&
            document.activeElement !== optionB &&
            document.activeElement !== optionC &&
            document.activeElement !== optionD &&
            document.activeElement !== answerBtnContainer &&
            document.activeElement !== nextQuestionBtn &&
            document.activeElement !== startAgainBtn
          ) {
            event.preventDefault();
            button.focus();
          }
          break;
      }
      break;

    case "Escape":
      if (
        document.activeElement !== skipToMain &&
        document.activeElement !== button &&
        document.activeElement !== menuIcon &&
        document.activeElement !== indexPage &&
        document.activeElement !== aboutPage &&
        document.activeElement !== darkmodetoggle &&
        document.activeElement !== motionModeIcon &&
        document.activeElement !== optionA &&
        document.activeElement !== optionB &&
        document.activeElement !== optionC &&
        document.activeElement !== optionD &&
        document.activeElement !== answerBtnContainer &&
        document.activeElement !== nextQuestionBtn &&
        document.activeElement !== startAgainBtn
      ) {
        event.preventDefault();
        optionA.focus();
      } else {
        return;
        // optionA.focus()
      }
      break;

    case "ArrowDown":
      if (document.activeElement === optionD) {
        event.preventDefault();
        answerBtnContainer.focus();
      }
  }
};

const enterKeySelect = (event: KeyboardEvent): void => {
  handleKeyEvent(event, submitAnswerBtn);
  handleKeyEvent(event, startQuizBtn);
  // handleKeyEvent(event, nextQuestionBtn);
  // handleKeyEvent(event, startAgainBtn);
};

//#endregion

//#region --- Transition ----

const transition = (
  hideElement: HTMLElement,
  showElement: HTMLElement,
  hideElementExtra?: HTMLElement
): void => {
  const mediaQueryIpad = window.matchMedia("(min-width: 768px)");
  const mediaQuerySmall = window.matchMedia("(max-width: 360px)");

  if (
    mediaQueryIpad.matches ||
    mediaQuerySmall.matches ||
    reduceMotion === true
  ) {
    showElement.classList.remove("hide");
    hideElement.classList.add("hide");
    if (hideElementExtra) {
      hideElementExtra.classList.add("hide");
    }
  } else {
    showElement.classList.remove("hide");
    requestAnimationFrame(() => {
      main.scrollTo({
        left: main.scrollLeft + cardWidth,
        behavior: "smooth",
      });
    });
    setTimeout(() => {
      hideElement.classList.add("hide");
      if (hideElementExtra) {
        hideElementExtra.classList.add("hide");
      }
      const parent = hideElement.parentNode;
      if (parent) {
        parent.insertBefore(showElement, hideElement);
      }
    }, 500);
  }
};

//#endregion

//#region --- Dark mode & Reduce motion----

if (localStorage.getItem("dark-mode") === "enabled") {
  theBody.classList.add("dark-mode");
}

const darkmode = () => {
  if (theBody.classList.contains("dark-mode")) {
    theBody.classList.remove("dark-mode");
    localStorage.setItem("dark-mode", "disabled");
    darkmodetoggle.classList.remove("dark-button");
    darkmodetoggle.innerHTML = "DARK MODE";
  } else {
    theBody.classList.add("dark-mode");
    localStorage.setItem("dark-mode", "enabled");
    darkmodetoggle.classList.add("dark-button");
    darkmodetoggle.innerHTML = "LIGHT MODE";
  }

  const isExpanded = darkmodetoggle.getAttribute("aria-expanded") === "true";
  darkmodetoggle.setAttribute("aria-expanded", isExpanded ? "false" : "true");
};

const toggleReduceMotion = () => {
  reduceMotion = !reduceMotion;
  if (reduceMotion) {
    motionModeIcon.classList.add("dark-button");
  } else {
    motionModeIcon.classList.remove("dark-button");
  }

  const isExpanded = motionModeIcon.getAttribute("aria-expanded") === "true";
  motionModeIcon.setAttribute("aria-expanded", isExpanded ? "false" : "true");
};

//#endrigion

//#endregion

//#endregion

//#region --- Event listeners -----
menuIcon.addEventListener("click", burgerMenu);
startQuizBtn.addEventListener("click", loadNextQuestion);
submitAnswerBtn.addEventListener("click", loadNextAnswer);
nextQuestionBtn.addEventListener("click", loadNextQuestion);
startAgainBtn.addEventListener("click", startAgain);
darkmodetoggle.addEventListener("click", darkmode);
motionModeIcon.addEventListener("click", toggleReduceMotion);
document.addEventListener("keydown", enterKeySelect);

radioButtonCheck.forEach((btn) => {
  btn.addEventListener("click", resetErrorStyle);
});

//#endregion
