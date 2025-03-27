"use strict";
const quiz = [
    { ask: "What is the capital of France?",
        choose: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris" },
    { ask: "Which language is used for web development?", choose: ["Python", "HTML", "Java", "C++"], answer: "HTML" },
    {
        ask: "Who wrote 'Hamlet'?", choose: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
        answer: "William Shakespeare"
    }
];
const quizCard = document.getElementById("quizCard");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizAnswer = document.getElementById("quizAnswer");
const score = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");
let index = 0, scr = 0;
function loadQuestion() {
    if (index >= quiz.length)
        return endQ();
    const getQ = quiz[index];
    if (quizQuestion)
        quizQuestion.textContent = getQ.ask;
    if (quizOptions)
        quizOptions.innerHTML = "";
    getQ.choose.forEach((element, i) => {
        const btn = document.createElement('button');
        btn.classList.add("element");
        btn.textContent = `${i + 1}. ${element}`;
        btn.onclick = () => checkA(element);
        quizOptions === null || quizOptions === void 0 ? void 0 : quizOptions.appendChild(btn);
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
