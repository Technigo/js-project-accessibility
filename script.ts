interface quizData {
  ask: string;
  choose: string[];
  answer: string;
}


const quiz: quizData[] = [
  {
    ask: "What is the capital of France?",
    choose: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris"
  },
  { ask: "Which language is used for web development?", choose: ["Python", "HTML", "Java", "C++"], answer: "HTML" },
  {
    ask: "Who wrote 'Hamlet'?", choose: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    answer: "William Shakespeare"
  }
]

const quizCard = document.getElementById("quizCard")
const quizQuestion = document.getElementById("quizQuestion")
const quizOptions = document.getElementById("quizOptions")
const quizAnswer = document.getElementById("quizAnswer")
const score = document.getElementById("score")
const restartBtn = document.getElementById("restartBtn")
let index = 0, scr = 0;

// quizQuestion
//quizOptions
//quizAnswer
//quizBtn

function loadQuestion(): void {
  if (index >= quiz.length) return endQ(); // End if no more questions

  const getQ = quiz[index];

  if (quizQuestion) quizQuestion.textContent = getQ.ask;
  if (quizOptions) quizOptions.innerHTML = ""; // Clear previous options

  getQ.choose.forEach((element, i) => {
    // Create input button
    const btn = document.createElement("input");
    btn.type = "button";
    btn.classList.add("quizOptions");
    btn.name = "aria";
    btn.id = `aria-${i}`; // Unique ID for accessibility
    btn.value = `${i + 1}. ${element}`;
    btn.onclick = () => checkA(element);

    // Create label
    const label = document.createElement("label");
    label.htmlFor = btn.id;
    label.textContent = element;

    // Append elements
    quizOptions?.appendChild(btn);
    quizOptions?.appendChild(label);
  });
}
function checkA(opt: string): void {
  if (opt === quiz[index].answer) scr++;
  index++;
  loadQuestion();
}

function endQ(): void {
  quizQuestion?.style.setProperty('display', 'none');
  quizOptions?.style.setProperty('display', 'none');
  quizAnswer?.style.setProperty('display', 'block');
  if (score) score.textContent = scr.toString();
  restartBtn?.style.setProperty('display', 'block');
}

console.log(loadQuestion)

loadQuestion();


