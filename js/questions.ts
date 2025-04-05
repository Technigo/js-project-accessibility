//#region --- Interface -----
interface Question {
  id: string;
  currentStep: number;
  questionTitle: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  resultTitleWin: string;
  resultExplanationWin: string;
  resultTitleLose: string;
  resultExplanationLose: string;
}
//#endregion

//#region --- Object -----
const questions: Question[] = [
  {
    id: "question1",
    currentStep: 1,
    questionTitle: "This is question ",
    questionText: "Which of the following is NOT a principle of the WCAG?",
    options: ["Perceivable", "Operable", "Flexible", "Robust"],
    correctAnswer: "C",
    resultTitleWin: "This is correct!",
    resultExplanationWin:
      "Perceivable, Operable, Understandable and Robust are the four main principles. Well done!",
    resultTitleLose: "Oh no!",
    resultExplanationLose:
      "You got it wrong. Perceivable, Operable, Understandable and Robust are the four main principles.",
  },
  {
    id: "question2",
    questionText: "What does ARIA stand for?",
    questionTitle: "This is question ",
    currentStep: 2,
    options: [
      "Accessible Rich Internet Applications",
      "Advanced Responsive Internet Accessibility",
      "Automated Resource Integration API",
      "Assistive Rendering & Interaction Attributes",
    ],
    correctAnswer: "A",
    resultTitleWin: "Yay!",
    resultExplanationWin:
      "You got it right. Accessible Rich Internet Applications is correct!",
    resultTitleLose: "Not quite!",
    resultExplanationLose:
      "The correct answer is Accessible Rich Internet Applications. Now you know!",
  },
  {
    id: "question3",
    currentStep: 3,
    questionTitle: "This is question ",
    questionText: "What is the purpose of a 'skip to content' link?",
    options: [
      "To skip advertisements",
      "To skip the navigation",
      "To skip all images",
      "To skip the logo",
    ],
    correctAnswer: "B",
    resultTitleWin: "Yes!",
    resultExplanationWin:
      "That is the right choice. When you press 'skip to content' you want the user to skip the navigation.",
    resultTitleLose: "Oh no!",
    resultExplanationLose:
      "This is incorrect. When you press 'skip to content' you want the user to skip the navigation.",
  },
];

//#endregion
