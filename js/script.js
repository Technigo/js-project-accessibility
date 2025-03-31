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
const quizInstructions = document.getElementById("quizInstructions");
quizInstructions === null || quizInstructions === void 0 ? void 0 : quizInstructions.focus();
let selectedOption = null;
function loadQuestion() {
    if (index >= quiz.length)
        return endQ();
    const getQ = quiz[index];
    if (quizQuestion)
        quizQuestion.textContent = getQ.ask;
    if (quizOptions)
        quizOptions.innerHTML = "";
    getQ.choose.forEach((element, i) => {
        const btn = document.createElement("input");
        btn.type = "button";
        btn.classList.add("quizOptions");
        btn.name = "aria";
        btn.id = `aria-${i}`;
        btn.value = `${i + 1}. ${element}`;
        btn.onclick = () => {
            selectedOption = element;
            console.log("Selected:", selectedOption);
        };
        const label = document.createElement("label");
        label.hidden = true;
        label.htmlFor = btn.id;
        label.textContent = element;
        submitAnswer.onclick = (event) => {
            event.preventDefault();
            if (selectedOption !== null) {
                checkA(selectedOption);
            }
            else {
                console.log("No option selected!");
            }
        };
        quizOptions === null || quizOptions === void 0 ? void 0 : quizOptions.appendChild(btn);
        quizOptions === null || quizOptions === void 0 ? void 0 : quizOptions.appendChild(label);
    });
}
function checkA(opt) {
    if (opt === quiz[index].answer)
        scr++;
    index++;
    loadQuestion();
}
function endQ() {
    quizQuestion === null || quizQuestion === void 0 ? void 0 : quizQuestion.style.setProperty('display', 'none');
    quizOptions === null || quizOptions === void 0 ? void 0 : quizOptions.style.setProperty('display', 'none');
    quizAnswer === null || quizAnswer === void 0 ? void 0 : quizAnswer.style.setProperty('display', 'block');
    if (score)
        score.textContent = scr.toString();
    restartBtn === null || restartBtn === void 0 ? void 0 : restartBtn.style.setProperty('display', 'block');
}
console.log(loadQuestion);
loadQuestion();
