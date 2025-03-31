interface quizData {
  ask: string;
  choose: string[];
  answer: string;
}


const quiz: quizData[] = [
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
]

const quizCard = document.getElementById("quizCard") as HTMLFieldSetElement
const quizQuestion = document.getElementById("quizQuestion") as HTMLHeadElement
const quizOptions = document.getElementById("quizOptions") as HTMLInputElement
const quizAnswer = document.getElementById("quizAnswer") as HTMLDivElement
const score = document.getElementById("score") as HTMLSpanElement
const restartBtn = document.getElementById("restartBtn") as HTMLButtonElement
const submitAnswer = document.getElementById("submitAnswer") as HTMLButtonElement 

let index = 0, scr = 0;

// quizQuestion
//quizOptions
//quizAnswer
//quizBtn

//instructions for screen readers at the start of the quiz
const quizInstructions = document.getElementById("quizInstructions");
quizInstructions?.focus(); // Focus on instructions first

let selectedOption: string | null = null;

function loadQuestion(): void {

  if (index >= quiz.length) return endQ(); // End if no more questions

  const getQ = quiz[index];

  if (quizQuestion) quizQuestion.textContent = getQ.ask;
  if (quizOptions) quizOptions.innerHTML = ""; // Clear previous options

 

  getQ.choose.forEach((element, i )=> {
    const btn = document.createElement("input");
    btn.type = "button";
    btn.classList.add("quizOptions");
    btn.name = "aria";
    btn.id = `aria-${i}`; // Unique ID for accessibility
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

    event.preventDefault(); //Stops form submission from refreshing the page

    if (selectedOption !== null) {
      checkA(selectedOption);
    } else {
      console.log("No option selected!");
    }
  };
    // Append elements
    quizOptions?.appendChild(btn);
    quizOptions?.appendChild(label);
  });
}


function checkA(opt: string): void {
  if (opt === quiz[index].answer) 
    scr++;
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


