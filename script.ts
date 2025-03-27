interface quizData {
  ask: string;
  choose: string[];
  answer: string;
}


const quiz: quizData[] = [
  { ask: "What is the capital of France?", 
    choose: ["Berlin", "Madrid", "Paris", "Lisbon"], 
    answer: "Paris" },
  { ask: "Which language is used for web development?", choose: ["Python", "HTML", "Java", "C++"], answer: "HTML" },
  {
    ask: "Who wrote 'Hamlet'?", choose: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    answer: "William Shakespeare"
  }
]

const quizCard = document.getElementById("quizCard")
const quizQuestion = document.getElementById("quizQuestion")
const quizOptions = document.getElementsByClassName("quizOptions")
const quizAnswer = document.getElementById("quizAnswer")
const score = document.getElementById("score")
const restartBtn = document.getElementById("restartBtn")
let index = 0, scr = 0;

// quizQuestion
//quizOptions
//quizAnswer
//quizBtn

function loadQuestion ():void { 
  if (index >= quiz.length) return endQ();
  const getQ = quiz[index];
  if (quizQuestion) quizQuestion.textContent = getQ.ask;
  if (quizOptions) quizOptions.innerHTML = "";
  getQ.choose.forEach((element, i) => {
    const btn = document.createElement(
`<input type="button"
                   class="quizOptions"
                   name="aria">
            <label for="aria-1">${quiz.}</label>`);
    btn.classList.add ("element");
    btn.textContent = `${i + 1}. ${element}`;
    btn.onclick = () => checkA(element);
    quizOptions?.innerHTML(btn);     
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


