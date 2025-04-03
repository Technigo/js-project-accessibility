interface quizData {
  ask: string;
  choose: string[];
  answer: string;
}

//Quiz data
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

//DOM Selectors
const quizSection = document.getElementById("quizSection") as HTMLSelectElement
const quizCard = document.getElementById("quizCard") as HTMLFieldSetElement
const quizQuestion = document.getElementById("quizQuestion") as HTMLHeadElement
const quizOptions = document.getElementById("quizOptions") as HTMLInputElement
const quizAnswer = document.getElementById("quizAnswer") as HTMLDivElement
const score = document.getElementById("score") as HTMLSpanElement
const restartBtn = document.getElementById("restartBtn") as HTMLButtonElement
const submitAnswer = document.getElementById("submitAnswer") as HTMLButtonElement
const quizFeedback = document.getElementById("quizFeedback") as HTMLDivElement

let index = 0, scr = 0;
let selectedOption: string | null = null;

//instructions for screen readers at the start of the quiz
const quizInstructions = document.getElementById("quizInstructions");
quizInstructions?.focus(); // Focus on instructions first

//Function to load the question
function loadQuestion(): void {
  if (index >= quiz.length) return endQ(); // End if no more questions

  const getQ = quiz[index];

  if (quizQuestion) quizQuestion.textContent = getQ.ask;
  if (quizOptions) quizOptions.innerHTML = ""; // Clear previous options 

  getQ.choose.forEach((element, i) => {
    const btn = document.createElement("input");
    btn.type = "radio";
    btn.name = "option";
    btn.id = `option-${i}`; // Unique ID for accessibility
    btn.value = `${i + 1}. ${element}`;
    btn.tabIndex = 0;
    btn.setAttribute("aria-labelledby", `labeel-${i}`); //V Uses aria-labelledby for better screen reader support
    btn.setAttribute("role", "radio"); //V 

    // V  for thee fiirst radio button selected by deefault
    if (i === 0) {
      btn.checked = true;
      selectedOption = element;

    }

    // Allow arrow key navigation
    btn.addEventListener("keydown", (event) => {
      const radioButtons = document.querySelectorAll<HTMLInputElement>('input[name="option"]');
      const currentIndex = Array.from(radioButtons).indexOf(btn);

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % radioButtons.length;
        radioButtons[nextIndex].focus();
        radioButtons[nextIndex].checked = true;
        selectedOption = radioButtons[nextIndex].value;
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        const prevIndex = (currentIndex - 1 + radioButtons.length) % radioButtons.length;
        radioButtons[prevIndex].focus();
        radioButtons[prevIndex].checked = true;
        selectedOption = radioButtons[prevIndex].value;
      }
    });

    btn.onclick = () => {
      selectedOption = element;
    };

    const label = document.createElement("label");
    label.htmlFor = btn.id;

    label.appendChild(btn);
    label.append(` ${element}`)

    submitAnswer.onclick = (event) => {
      event.preventDefault(); //Stops form submission from refreshing the page

      if (selectedOption !== null) {
        checkA(selectedOption);
      } else {
        quizSection.insertAdjacentHTML(
          "beforeend",
          `<div id="quizFeedback" aria-live="polite">
           <p>No option is selecten, please select an option and click submit!</p>         
         </div>`)
      }
    };

    // Append elements   
    quizOptions?.appendChild(label);
  });

  trapFocus();

}

function checkA(opt: string): void {
  //Remove quiz feedback
  const quizFeedback = document.getElementById("quizFeedback") as HTMLDivElement | null;
  if (quizFeedback) {
    quizFeedback.remove();
  }

  if (opt === quiz[index].answer) {
    scr++;
    // index++;
    // loadQuestion();
    quizSection.insertAdjacentHTML(
      "beforeend",
      `<div id="quizFeedback" aria-live="polite">
         <p>Correct answer!</p>
         <button id="continueBtn">Continue to the next question</button>
       </div>`);
  } else if (opt !== quiz[index].answer) {
    quizSection.insertAdjacentHTML(
      "beforeend",
      `<div id="quizFeedback" aria-live="polite">
          <p>Oh no wrong answer, try again or continue to the next question!</p>
          <button id="continueBtn">Continue to the next question</button>
        </div>`);
  } else if (selectedOption !== null) {
    quizSection.insertAdjacentHTML(
      "beforeend",
      `<div id="quizFeedback" aria-live="polite">
         <p>No option is selecten, please select an option and click submit!</p>         
       </div>`)
  }

  const continueBtn = document.getElementById("continueBtn") as HTMLButtonElement | null;
  if (continueBtn) {
    continueBtn.addEventListener("click", (event) => {
      event.preventDefault();//Stops form submission from refreshing the page

      //Remove quiz feedback
      const quizFeedback = document.getElementById("quizFeedback") as HTMLDivElement | null;
      if (quizFeedback) {
        quizFeedback.remove();
      }

      index++;
      loadQuestion()
    })
  }
}

function endQ(): void {
  quizQuestion?.style.setProperty('display', 'none');
  quizOptions?.style.setProperty('display', 'none');
  quizAnswer?.style.setProperty('display', 'block');
  if (score) score.textContent = scr.toString();
  restartBtn?.style.setProperty('display', 'block');
  submitAnswer.style.setProperty('display', 'none');
}

loadQuestion();

// V  trrap focus
function trapFocus() {
  const focusableElements = quizCard.querySelectorAll<HTMLElement>(
    'input, button'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  quizCard.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      if (event.shiftKey) {
        // Shift + Tab moves focus backward
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab moves focus forward
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  });
}

