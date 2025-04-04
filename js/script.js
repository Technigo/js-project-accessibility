"use strict";
const quiz = [
    {
        ask: "When should you avoid using descriptive alt text for images?",
        choose: ["For decorative images", "For informational images ", "For functional images"],
        answer: "For decorative images"
    },
    {
        ask: "What are the different levels of the Web content accessibility guidelines (WCAG)?",
        choose: ["A, B, C ", "G, VG, MVG ", "A, AA, AAA"], answer: "A, AA, AAA"
    },
    {
        ask: "Which description of flowers is easiest to understand?",
        choose: ["Flowers symbolize emotions and culture.", "Flowers are nature's drip—bold and meaningful.", "Flowers are colorful plants that show feelings."],
        answer: "Flowers symbolize emotions and culture."
    }
];
const quizSection = document.getElementById("quizSection");
const quizCard = document.getElementById("quizCard");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizAnswer = document.getElementById("quizAnswer");
const score = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");
const submitAnswer = document.getElementById("submitAnswer");
const quizFeedback = document.getElementById("quizFeedback");
let index = 0, scr = 0;
let selectedOption = null;
let currentQuestion = 0;
let currentOption = [];
const quizInstructions = document.getElementById("quizInstructions");
function loadQuestion() {
    if (index >= quiz.length)
        return endQ();
    const getQ = quiz[index];
    currentQuestion = index;
    currentOption = getQ.choose;
    if (quizQuestion)
        quizQuestion.textContent = getQ.ask;
    if (quizOptions)
        quizOptions.innerHTML = "";
    getQ.choose.forEach((element, i) => {
        const btn = document.createElement("input");
        btn.type = "radio";
        btn.name = "option";
        btn.id = `option-${i}`;
        btn.value = `${i + 1}. ${element}`;
        btn.tabIndex = -1;
        btn.setAttribute("aria-labelledby", `label-${i}`);
        btn.setAttribute("role", "radio");
        if (i === 0) {
            btn.checked = true;
            btn.focus();
            selectedOption = element;
        }
        btn.addEventListener("keydown", (event) => {
            const radioButtons = document.querySelectorAll('input[name="option"]');
            const currentIndex = Array.from(radioButtons).indexOf(btn);
            if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                event.preventDefault();
                const nextIndex = (currentIndex + 1) % radioButtons.length;
                radioButtons[nextIndex].focus();
                radioButtons[nextIndex].checked = true;
                selectedOption = radioButtons[nextIndex].value;
            }
            else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                event.preventDefault();
                const prevIndex = (currentIndex - 1 + radioButtons.length) % radioButtons.length;
                radioButtons[prevIndex].focus();
                radioButtons[prevIndex].checked = true;
                selectedOption = radioButtons[prevIndex].value;
            }
        });
        btn.onclick = () => {
            selectedOption = element;
        };
        const label = document.createElement("label");
        label.htmlFor = btn.id;
        label.id = `label-${i}`;
        label.tabIndex = 0;
        label.appendChild(btn);
        label.append(` ${element}`);
        label.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                btn.click();
            }
        });
        quizOptions === null || quizOptions === void 0 ? void 0 : quizOptions.appendChild(label);
    });
    trapFocus();
}
submitAnswer.onclick = (event) => {
    event.preventDefault();
    if (selectedOption !== null) {
        checkA(selectedOption);
    }
};
function checkA(opt) {
    const quizFeedback = document.getElementById("quizFeedback");
    if (quizFeedback) {
        quizFeedback.remove();
    }
    if (opt === quiz[index].answer) {
        scr++;
        quizSection.insertAdjacentHTML("beforeend", `<div id="quizFeedback" aria-live="polite">
         <p tabindex="0">Correct answer!</p>
         <button id="continueBtn">Continue to the next question</button>
       </div>`);
    }
    else if (opt !== quiz[index].answer) {
        quizSection.insertAdjacentHTML("beforeend", `<div id="quizFeedback" aria-live="polite">
          <p tabindex="0">Oh no wrong answer, try again or continue to the next question!</p>
          <button id="continueBtn">Continue to the next question</button>
        </div>`);
    }
    const continueBtn = document.getElementById("continueBtn");
    if (continueBtn) {
        continueBtn.addEventListener("click", (event) => {
            event.preventDefault();
            const quizFeedback = document.getElementById("quizFeedback");
            if (quizFeedback) {
                quizFeedback.remove();
            }
            index++;
            loadQuestion();
        });
    }
}
function endQ() {
    quizQuestion === null || quizQuestion === void 0 ? void 0 : quizQuestion.style.setProperty('display', 'none');
    quizOptions === null || quizOptions === void 0 ? void 0 : quizOptions.style.setProperty('display', 'none');
    quizAnswer === null || quizAnswer === void 0 ? void 0 : quizAnswer.style.setProperty('display', 'block');
    if (score)
        score.textContent = scr.toString();
    restartBtn === null || restartBtn === void 0 ? void 0 : restartBtn.style.setProperty('display', 'block');
    submitAnswer.style.setProperty('display', 'none');
}
function trapFocus() {
    const focusableElements = quizCard.querySelectorAll('input, button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    quizCard.addEventListener("keydown", (event) => {
        if (event.key === "Tab") {
            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            }
            else {
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}
restartBtn.addEventListener("click", () => {
    index = 0;
    scr = 0;
    quizQuestion === null || quizQuestion === void 0 ? void 0 : quizQuestion.style.setProperty("display", "block");
    quizOptions === null || quizOptions === void 0 ? void 0 : quizOptions.style.setProperty("display", "block");
    quizAnswer === null || quizAnswer === void 0 ? void 0 : quizAnswer.style.setProperty("display", "none");
    restartBtn === null || restartBtn === void 0 ? void 0 : restartBtn.style.setProperty("display", "none");
    submitAnswer === null || submitAnswer === void 0 ? void 0 : submitAnswer.style.setProperty("display", "block");
    loadQuestion();
});
function changeFont(event) {
    const selectElement = event.target;
    const selectedFont = selectElement.value;
    document.body.classList.remove('font1', 'font2');
    if (selectedFont === 'font1') {
        document.body.classList.add('font1');
    }
    else if (selectedFont === 'font2') {
        document.body.classList.add('font2');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const fontToggle = document.getElementById('font-toggle');
    fontToggle.addEventListener('change', changeFont);
});
loadQuestion();
