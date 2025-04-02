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
quizInstructions === null || quizInstructions === void 0 ? void 0 : quizInstructions.focus();
function loadQuestion() {
    if (index >= quiz.length)
        return endQ();
    const getQ = quiz[index];
    currentQuestion = index;
    currentOption = getQ.choose;
    console.log(currentOption);
    if (quizQuestion)
        quizQuestion.textContent = getQ.ask;
    if (quizOptions)
        quizOptions.innerHTML = "";
    getQ.choose.forEach((element, i) => {
        const btn = document.createElement("input");
        btn.type = "radio";
        btn.name = "aria";
        btn.id = `aria-${i}`;
        btn.value = `${i + 1}. ${element}`;
        btn.hidden;
        btn.onclick = () => {
            selectedOption = element;
            console.log("Selected:", selectedOption);
        };
        const label = document.createElement("label");
        label.htmlFor = btn.id;
        label.appendChild(btn);
        label.append(` ${element}`);
        submitAnswer.onclick = (event) => {
            event.preventDefault();
            if (selectedOption !== null) {
                checkA(selectedOption);
            }
            else {
                console.log("No option selected!");
            }
        };
        quizOptions === null || quizOptions === void 0 ? void 0 : quizOptions.appendChild(label);
    });
}
function checkA(opt) {
    console.log("Current question index:", index);
    console.log("Current options:", currentOption);
    const quizFeedback = document.getElementById("quizFeedback");
    if (quizFeedback) {
        quizFeedback.remove();
    }
    if (opt === quiz[index].answer) {
        scr++;
        index++;
        loadQuestion();
    }
    else {
        console.log("incorrect answer");
        quizSection.insertAdjacentHTML("beforeend", `<div id="quizFeedback" aria-live="polite">
          <p>Oh no wrong answer, try again or continue to the next question!</p>
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
            console.log("hejDå");
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
loadQuestion();
