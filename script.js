const questions = [
  {
    question: "Which language is known as the 'mother of all languages'?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 1
  },
  {
    question: "What does OOP stand for?",
    options: ["Object Oriented Programming", "Order Of Precedence", "Open Object Protocol", "Output Oriented Program"],
    answer: 0
  },
  {
    question: "Which data structure uses FIFO?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: 1
  },
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(n^2)", "O(log n)", "O(1)"],
    answer: 2
  },
  {
    question: "Which keyword is used to inherit a class in Java?",
    options: ["implements", "extends", "inherits", "super"],
    answer: 1
  },
  {
    question: "Which HTML tag is used to link a CSS file?",
    options: ["<style>", "<css>", "<link>", "<script>"],
    answer: 2
  },
  {
    question: "What does SQL stand for?",
    options: ["Structured Query Language", "Simple Query Logic", "Sequential Query Language", "System Query Language"],
    answer: 0
  },
  {
    question: "Which operator is used for comparison in JavaScript (strict)?",
    options: ["=", "==", "===", "!="],
    answer: 2
  },
  {
    question: "In C++, which symbol is used for pointers?",
    options: ["&", "*", "#", "@"],
    answer: 1
  },
  {
    question: "Which sorting algorithm has the best average time complexity?",
    options: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"],
    answer: 2
  }
];

let currentQuestion = 0;
let score = 0;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const optionsDiv = document.getElementById("options");
const questionCount = document.getElementById("question-count");
const scoreDisplay = document.getElementById("score-display");
const progressFill = document.getElementById("progress-fill");
const finalScore = document.getElementById("final-score");

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  startScreen.classList.remove("active");
  endScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  questionCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  scoreDisplay.textContent = `Score: ${score}`;
  progressFill.style.width = `${(currentQuestion / questions.length) * 100}%`;

  optionsDiv.innerHTML = "";
  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => selectAnswer(index));
    optionsDiv.appendChild(btn);
  });
}

function selectAnswer(selectedIndex) {
  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === q.answer) {
      btn.classList.add("correct");
    } else if (index === selectedIndex) {
      btn.classList.add("wrong");
    }
  });

  if (selectedIndex === q.answer) {
    score++;
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      finishQuiz();
    }
  }, 1000);
}

function finishQuiz() {
  quizScreen.classList.remove("active");
  endScreen.classList.add("active");
  progressFill.style.width = "100%";
  finalScore.textContent = `You scored ${score} out of ${questions.length}!`;
      }
