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
const quizCard = document.getElementById("quizCard");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizAnswer = document.getElementById("quizAnswer");
const score = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");
const submitAnswer = document.getElementById("submitAnswer");
let index = 0, scr = 0;
let selectedOption = null;
const quizInstructions = document.getElementById("quizInstructions");
quizInstructions === null || quizInstructions === void 0 ? void 0 : quizInstructions.focus();
function loadQuestion() {
    if (index >= quiz.length)
        return endQ();
    const getQ = quiz[index];
    if (quizQuestion)
        quizQuestion.textContent = getQ.ask;
    if (quizOptions)
        quizOptions.innerHTML = "";
    let selectedOption = null;
    getQ.choose.forEach((element, i) => {
        const btn = document.createElement("input");
        btn.type = "radio";
        btn.name = "aria";
        btn.id = `aria-${i}`;
        btn.value = `${i + 1}. ${element}`;
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
    const currentQuestion = quiz[index];
    if (opt === quiz[index].answer) {
        scr++;
        index++;
        loadQuestion();
    }
    else {
        console.log("incorrect answer");
        submitAnswer === null || submitAnswer === void 0 ? void 0 : submitAnswer.style.setProperty('display', 'none');
        quizCard.innerHTML = `
  <h3>Oh no wrong answer</H3>
  <button id=retryBtn>Click to Retry</button>
  `;
    }
    const retryBtn = document.getElementById("retryBtn");
    retryBtn.onclick = () => {
        const last = quiz[index - 1];
        retryQuestion(currentQuestion);
    };
}
function retryQuestion(question) {
    quizCard.innerHTML = "";
    if (quizQuestion)
        quizQuestion.textContent = question.ask;
    if (quizOptions)
        quizOptions.innerHTML = "";
    let selectedOption = null;
    question.choose.forEach((element, i) => {
        const btn = document.createElement("input");
        btn.type = "radio";
        btn.name = "aria";
        btn.id = `aria-${i}`;
        btn.value = `${i + 1}. ${element}`;
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
    submitAnswer.style.display = "block";
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
console.log(loadQuestion);
loadQuestion();
