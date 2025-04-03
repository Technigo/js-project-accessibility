const questions = [
  {
    question: "What is the main goal of web accessibility?",
    options: [
      { text: "Making websites load faster", correct: false },
      {
        text: "Ensuring all users, including those with disabilities, can access and use web content",
        correct: false,
      },
      { text: "<button> with proper ARIA labels", correct: true },
      { text: "Increasing ad revenue", correct: false },
    ],
  },
  {
    question: "What does WCAG stand for?",
    options: [
      { text: "Web Code Accessibility Guidelines", correct: false },
      { text: "World Content Accessibility Guide", correct: false },
      { text: "Web Content Accessibility Guidelines", correct: true },
      { text: "Wide Coverage Accessibility Guide", correct: false },
    ],
  },
  {
    question:
      "What is the minimum color contrast ratio recommended by WCAG for normal text?",
    options: [
      { text: "2.1:1", correct: false },
      { text: "3.5:1", correct: false },
      { text: "4.5:1", correct: true },
      { text: "7.0:1", correct: false },
    ],
  },
  {
    question:
      "What happens if you use only color to convey important information?",
    options: [
      {
        text: "Users with color blindness may miss critical information",
        correct: false,
      },
      { text: "It improves the website’s visual appeal", correct: true },
      { text: "It makes the site easier to navigate", correct: false },
      { text: "Nothing, as long as the colors contrast well", correct: false },
      { text: "It makes the site easier to navigate", correct: false },
    ],
  },
  {
    question: 'What is a "skip link," and why is it important?',
    options: [
      {
        text: "A link that reloads the page for better accessibility",
        correct: false,
      },
      {
        text: "A link that allows users to skip repetitive content and go directly to the main content",
        correct: true,
      },
      {
        text: "A hidden link that only screen readers can detect",
        correct: false,
      },
      {
        text: "A link that reloads the page for better accessibility",
        correct: false,
      },
      { text: "A shortcut key to close pop-ups", correct: false },
    ],
  },
];
