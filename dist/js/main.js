"use strict";
//#region --- DOM Elements -----
//Buttons
const skipToMain = document.querySelector("#skip-to-main");
const navLinks = document.querySelector("#nav-links");
const menuIcon = document.querySelector("#menu-icon");
const startQuizBtn = document.querySelector("#start-quiz-btn");
const submitAnswerBtn = document.querySelector("#answer-btn");
const nextQuestionBtn = document.querySelector("#next-question-btn");
const startAgainBtn = document.querySelector("#start-again-btn");
const radioButtonCheck = document.querySelectorAll('input[name="question1"]');
const motionModeIcon = document.querySelector("#motion-mode-icon");
const darkmodetoggle = document.querySelector("#dark-mode-icon");
//Links
const indexPage = document.querySelector("#index-page");
const aboutPage = document.querySelector("#about-page");
//Containers & sections
const theBody = document.querySelector("body");
const main = document.querySelector("#main-content");
const selectionForm = document.querySelector("#selection-form");
const legend = document.querySelector("#legend");
const testing = document.querySelector("#testing");
const startPage = document.querySelector("#start-page");
const quizContainer = document.querySelector("#quiz-container");
const answerBtnContainer = document.querySelector("#answer-btn-container");
const resultContainer = document.querySelector("#result-container");
const radioButtonGroup = document.querySelector(".radio-button-group");
const darkModeContainer = document.querySelector("#dark-mode-container");
//texts
const titleText = document.querySelector(".title-text");
const questionTitle = document.querySelector("#question-title");
const questionText = document.querySelector("#question-text");
const resultTitle = document.querySelector("#result-title");
const resultExplanation = document.querySelector("#result-explanation");
const quizResult = document.querySelector("#quiz-result");
const quizResultTitle = document.querySelector("#quiz-result-title");
const quizResultText = document.querySelector("#quiz-result-text");
//Options
const optionA = document.querySelector('label[for="option-a"]');
const optionB = document.querySelector('label[for="option-b"]');
const optionC = document.querySelector('label[for="option-c"]');
const optionD = document.querySelector('label[for="option-d"]');
//Extra
const cards = document.querySelectorAll(".card");
const scrollLeft = main.scrollLeft;
const cardWidth = cards[0].offsetWidth; // Assuming all cards have the same width
//Objects & Arrays
let reduceMotion = false;
let currentStep = -1;
let currentPage = startPage;
let userChoice = "";
let currentQuestion = null;
let score = 0;
//#endregion
//#region --- Functions -----
//#region --- User Idetifier -----
const userChoiseIdentifier = () => {
    const options = document.querySelectorAll('input[name="question1"]');
    options.forEach((button) => {
        button.addEventListener("change", (event) => {
            userChoice = event.target.value;
        });
    });
};
userChoiseIdentifier();
//#endregion
//#region --- Burger Menu -----
const burgerMenu = () => {
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
const loadNextQuestion = () => {
    userChoice = "";
    currentStep++;
    radioButtonCheck.forEach((radio) => {
        radio.checked = false;
    });
    if (currentStep >= questions.length) {
        quizResultTitle.innerHTML = "The quiz is over!";
        quizResultText.innerHTML = `Your result is ${score} / ${questions.length}`;
        transition(resultContainer, quizResult, null);
    }
    else {
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
const loadNextAnswer = (event) => {
    if (event)
        event.preventDefault();
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
    }
    else {
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
const startAgain = () => {
    nextQuestionBtn.innerHTML = "NEXT QUESTION";
    currentStep = -1;
    score = 0;
    transition(quizResult, startPage, null);
};
//#endregion
//#region --- Keyboard Navigation ----
const handleKeyEvent = (event, button) => {
    switch (event.key) {
        case "Enter":
            switch (document.activeElement) {
                case button:
                    button.click();
                    break;
                case skipToMain:
                    main.focus();
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
                    if (document.activeElement !== skipToMain &&
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
                        document.activeElement !== startAgainBtn) {
                        event.preventDefault();
                        button.focus();
                    }
                    break;
            }
            break;
        case "Escape":
            if (document.activeElement !== skipToMain &&
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
                document.activeElement !== startAgainBtn) {
                event.preventDefault();
                optionA.focus();
            }
            else {
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
const enterKeySelect = (event) => {
    handleKeyEvent(event, submitAnswerBtn);
    handleKeyEvent(event, startQuizBtn);
    // handleKeyEvent(event, nextQuestionBtn);
    // handleKeyEvent(event, startAgainBtn);
};
//#endregion
//#region --- Transition ----
const transition = (hideElement, showElement, hideElementExtra) => {
    const mediaQueryIpad = window.matchMedia("(min-width: 768px)");
    const mediaQuerySmall = window.matchMedia("(max-width: 360px)");
    if (mediaQueryIpad.matches ||
        mediaQuerySmall.matches ||
        reduceMotion === true) {
        showElement.classList.remove("hide");
        hideElement.classList.add("hide");
        if (hideElementExtra) {
            hideElementExtra.classList.add("hide");
        }
    }
    else {
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
    }
    else {
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
    }
    else {
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
