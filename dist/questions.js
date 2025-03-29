"use strict";
//#endregion
//#region --- Object -----
const questions = [
    {
        id: "question1",
        currentStep: 1,
        questionTitle: "Question ",
        questionText: "What is a screen reader?",
        options: ["A car", "A digital text reader", "A cat", "A fruite"],
        correctAnswer: "B",
        resultTitleWin: "Congratulations",
        resultExplanationWin: "You got it right!",
        resultTitleLose: "Oh no!",
        resultExplanationLose: "You got it wrong"
    },
    {
        id: "question2",
        questionTitle: "Question ",
        questionText: "What is an alt text? A description of..",
        currentStep: 2,
        options: ["an image", "a div element", "a header", "a link"],
        correctAnswer: "A",
        resultTitleWin: "Congratulations",
        resultExplanationWin: "You got it right!",
        resultTitleLose: "Oh no!",
        resultExplanationLose: "You got it wrong"
    },
    {
        id: "question3",
        currentStep: 3,
        questionTitle: "Question ",
        questionText: "What is the purpose of a 'skip to content' link?",
        options: ["to skip advertisements", "to skip the navigation", "to skip to all images", "to skip the footer"],
        correctAnswer: "B",
        resultTitleWin: "Congratulations",
        resultExplanationWin: "You got it right!",
        resultTitleLose: "Oh no!",
        resultExplanationLose: "You got it wrong"
    }
];
//#endregion
