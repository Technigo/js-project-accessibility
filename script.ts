interface quizData {
  ask: string;
  choose: string[];
  answer: string;
}


const quiz: quizData[] = [
  { ask: "What is the capital of France?", choose: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: "Paris" },
  { ask: "Which language is used for web development?", choose: ["Python", "HTML", "Java", "C++"], answer: "HTML" },
  {
    ask: "Who wrote 'Hamlet'?", choose: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    answer: "William Shakespeare"
  }
]