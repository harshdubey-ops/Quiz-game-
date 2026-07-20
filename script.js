const questionBank = {
  easy: [
    { q: "Which language is known as the 'mother of all languages'?", options: ["Java", "C", "Python", "JavaScript"], answer: 1, explain: "C, created in 1972, directly influenced C++, Java, JavaScript, and many others." },
    { q: "What does OOP stand for?", options: ["Object Oriented Programming", "Order Of Precedence", "Open Object Protocol", "Output Oriented Program"], answer: 0, explain: "OOP organizes code around objects that bundle data and behavior together." },
    { q: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], answer: 1, explain: "Queue follows First In First Out — the first element added is the first removed." },
    { q: "Which HTML tag is used to link a CSS file?", options: ["<style>", "<css>", "<link>", "<script>"], answer: 2, explain: "<link rel=\"stylesheet\"> connects an external CSS file to an HTML document." },
    { q: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Logic", "Sequential Query Language", "System Query Language"], answer: 0, explain: "SQL is used to query and manage data in relational databases." },
    { q: "Which symbol is used for single-line comments in JavaScript?", options: ["<!-- -->", "/* */", "//", "#"], answer: 2, explain: "// starts a single-line comment in JavaScript, C, C++, and Java." },
    { q: "What is the file extension for Python files?", options: [".py", ".pt", ".pn", ".python"], answer: 0, explain: "Python source files use the .py extension." },
    { q: "Which of these is a loop in most programming languages?", options: ["if", "for", "switch", "try"], answer: 1, explain: "The for loop repeats a block of code a set number of times." }
  ],
  medium: [
    { q: "What is the time complexity of binary search?", options: ["O(n)", "O(n^2)", "O(log n)", "O(1)"], answer: 2, explain: "Binary search halves the search space each step, giving logarithmic time." },
    { q: "Which keyword is used to inherit a class in Java?", options: ["implements", "extends", "inherits", "super"], answer: 1, explain: "extends is used for class inheritance; implements is for interfaces." },
    { q: "Which operator is used for strict comparison in JavaScript?", options: ["=", "==", "===", "!="], answer: 2, explain: "=== checks both value and type, unlike == which allows type coercion." },
    { q: "In C++, which symbol is used for pointers?", options: ["&", "*", "#", "@"], answer: 1, explain: "* declares a pointer variable; & is used to get an address." },
    { q: "Which sorting algorithm has the best average time complexity?", options: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"], answer: 2, explain: "Quick Sort averages O(n log n), better than the O(n^2) of the others listed." },
    { q: "What does the 'this' keyword refer to in a JavaScript object method?", options: ["The global object", "The object the method belongs to", "The parent function", "Nothing, it's unused"], answer: 1, explain: "Inside a method, 'this' refers to the object that called the method." },
    { q: "Which HTTP method is typically used to update existing data?", options: ["GET", "POST", "PUT", "DELETE"], answer: 2, explain: "PUT is conventionally used to update or replace an existing resource." },
    { q: "What is a primary key in a database table?", options: ["A duplicate-allowed column", "A uniquely identifying column", "A foreign reference", "An index type"], answer: 1, explain: "A primary key uniquely identifies each row and cannot contain duplicates or NULLs." }
  ],
  hard: [
    { q: "What is the worst-case time complexity of Quick Sort?", options: ["O(n log n)", "O(n)", "O(n^2)", "O(log n)"], answer: 2, explain: "Quick Sort degrades to O(n^2) when the pivot repeatedly splits data unevenly." },
    { q: "Which data structure is best suited for implementing recursion internally?", options: ["Queue", "Stack", "Heap", "Linked List"], answer: 1, explain: "Function calls use a call stack — each call is pushed and popped in LIFO order." },
    { q: "In dynamic programming, what does memoization primarily reduce?", options: ["Space complexity", "Redundant computation", "Code length", "Compilation time"], answer: 1, explain: "Memoization caches results of subproblems so they aren't recomputed." },
    { q: "What is the space complexity of an adjacency matrix for a graph with V vertices?", options: ["O(V)", "O(V + E)", "O(V^2)", "O(E)"], answer: 2, explain: "An adjacency matrix stores a V x V grid regardless of edge count, giving O(V^2)." },
    { q: "Which of these is NOT a property of a B-Tree?", options: ["Self-balancing", "All leaves at same depth", "Only two children per node", "Used in databases and file systems"], answer: 2, explain: "B-Trees can have many children per node, unlike binary trees which have at most two." },
    { q: "What does the CAP theorem say a distributed system can guarantee at most?", options: ["All four of consistency, availability, partition tolerance, and speed", "Two of consistency, availability, and partition tolerance", "Only consistency", "Only availability"], answer: 1, explain: "CAP theorem states a distributed system can only fully guarantee two of the three: Consistency, Availability, Partition tolerance." },
    { q: "Which technique helps prevent SQL injection most effectively?", options: ["String concatenation", "Parameterized queries", "Client-side validation only", "Using SELECT *"], answer: 1, explain: "Parameterized queries separate SQL logic from data, preventing malicious input from altering the query." },
    { q: "What is the amortized time complexity of inserting into a dynamic array (like ArrayList)?", options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"], answer: 2, explain: "Occasional resizing costs O(n), but averaged over many insertions it amortizes to O(1)." }
  ]
};

const DIFFICULTY_CONFIG = {
  easy: { time: 20, correct: 10, wrong: -5, label: "Easy" },
  medium: { time: 15, correct: 15, wrong: -7, label: "Medium" },
  hard: { time: 10, correct: 20, wrong: -10, label: "Hard" }
};

const HIGH_SCORE_PREFIX = "codeQuizHighScore_";

let selectedDifficulty = null;
let quizQuestions = [];
let currentQuestion = 0;
let points = 0;
let correctCount = 0;
let streak = 0;
let timeLeft = 0;
let timerInterval = null;
let answered = false;
let soundOn = true;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");

const diffButtons = document.querySelectorAll(".diff-btn");
const restartBtn = document.getElementById("restart-btn");
const skipBtn = document.getElementById("skip-btn");
const shareBtn = document.getElementById("share-btn");
const muteBtn = document.getElementById("mute-btn");

const questionText = document.getElementById("question-text");
const optionsDiv = document.getElementById("options");
const questionCount = document.getElementById("question-count");
const scoreDisplay = document.getElementById("score-display");
const progressFill = document.getElementById("progress-fill");
const finalScore = document.getElementById("final-score");
const finalDetail = document.getElementById("final-detail");
const resultHeading = document.getElementById("result-heading");
const timerDisplay = document.getElementById("timer");
const streakDisplay = document.getElementById("streak");
const highScoreDisplay = document.getElementById("high-score");
const bestScoreMsg = document.getElementById("best-score-msg");
const explanationBox = document.getElementById("explanation");

diffButtons.forEach(btn => btn.addEventListener("click", () => startQuiz(btn.dataset.diff)));
restartBtn.addEventListener("click", () => {
  endScreen.classList.remove("active");
  startScreen.classList.add("active");
  showHighScoreOnStart();
});
skipBtn.addEventListener("click", () => selectAnswer(-2));
shareBtn.addEventListener("click", shareResult);
muteBtn.addEventListener("click", toggleMute);
document.addEventListener("keydown", handleKeydown);

showHighScoreOnStart();

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getHighScore(diff) {
  return parseInt(localStorage.getItem(HIGH_SCORE_PREFIX + diff) || "0", 10);
}

function showHighScoreOnStart() {
  const best = Math.max(getHighScore("easy"), getHighScore("medium"), getHighScore("hard"));
  highScoreDisplay.textContent = best > 0 ? `Best score so far: ${best} pts` : "";
}

function startQuiz(difficulty) {
  selectedDifficulty = difficulty;
  const bank = shuffle(questionBank[difficulty]);
  quizQuestions = bank.map(item => {
    const optionPairs = item.options.map((opt, i) => ({ text: opt, isCorrect: i === item.answer }));
    const shuffledOptions = shuffle(optionPairs);
    return {
      question: item.q,
      explain: item.explain,
      options: shuffledOptions.map(o => o.text),
      answer: shuffledOptions.findIndex(o => o.isCorrect)
    };
  });

  currentQuestion = 0;
  points = 0;
  correctCount = 0;
  streak = 0;

  startScreen.classList.remove("active");
  endScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();
}

function showQuestion() {
  answered = false;
  skipBtn.disabled = false;
  explanationBox.classList.remove("visible");
  explanationBox.textContent = "";

  const q = quizQuestions[currentQuestion];
  const config = DIFFICULTY_CONFIG[selectedDifficulty];

  questionText.textContent = q.question;
  questionCount.textContent = `Q${String(currentQuestion + 1).padStart(2, "0")} / ${quizQuestions.length}`;
  scoreDisplay.textContent = `${points} pts`;
  progressFill.style.width = `${(currentQuestion / quizQuestions.length) * 100}%`;
  streakDisplay.textContent = streak >= 2 ? `🔥 ${streak} streak` : "";

  optionsDiv.innerHTML = "";
  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.innerHTML = `<span class="option-index">[${index + 1}]</span><span>${option}</span>`;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => selectAnswer(index));
    optionsDiv.appendChild(btn);
  });

  startTimer(config.time);
}

function startTimer(duration) {
  clearInterval(timerInterval);
  timeLeft = duration;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      if (!answered) selectAnswer(-1);
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerDisplay.textContent = timeLeft;
  timerDisplay.classList.toggle("low", timeLeft <= 4);
}

function handleKeydown(e) {
  if (!quizScreen.classList.contains("active") || answered) return;
  if (["1", "2", "3", "4"].includes(e.key)) {
    const index = parseInt(e.key, 10) - 1;
    const buttons = document.querySelectorAll(".option-btn");
    if (buttons[index]) selectAnswer(index);
  }
}

function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;
  skipBtn.disabled = true;
  clearInterval(timerInterval);

  const q = quizQuestions[currentQuestion];
  const config = DIFFICULTY_CONFIG[selectedDifficulty];
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === q.answer) btn.classList.add("correct");
    else if (index === selectedIndex) btn.classList.add("wrong");
  });

  if (selectedIndex === q.answer) {
    points += config.correct;
    correctCount++;
    streak++;
    playTone("correct");
  } else if (selectedIndex === -2) {
    playTone("skip");
    streak = 0;
  } else {
    points += config.wrong;
    streak = 0;
    playTone("wrong");
  }

  scoreDisplay.textContent = `${points} pts`;
  explanationBox.innerHTML = `<strong>Why:</strong> ${q.explain}`;
  explanationBox.classList.add("visible");

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      showQuestion();
    } else {
      finishQuiz();
    }
  }, 2200);
}

function finishQuiz() {
  quizScreen.classList.remove("active");
  endScreen.classList.add("active");
  progressFill.style.width = "100%";

  const config = DIFFICULTY_CONFIG[selectedDifficulty];
  finalScore.textContent = `${points} points`;
  finalDetail.textContent = `${correctCount} / ${quizQuestions.length} correct on ${config.label} difficulty`;

  const pct = correctCount / quizQuestions.length;
  resultHeading.textContent = pct >= 0.8 ? "Excellent work" : pct >= 0.5 ? "Good effort" : "Keep practicing";

  const key = HIGH_SCORE_PREFIX + selectedDifficulty;
  const best = getHighScore(selectedDifficulty);
  if (points > best) {
    localStorage.setItem(key, String(points));
    bestScoreMsg.textContent = `New high score for ${config.label}!`;
  } else {
    bestScoreMsg.textContent = `Best on ${config.label}: ${best} pts`;
  }
}

function shareResult() {
  const config = DIFFICULTY_CONFIG[selectedDifficulty];
  const text = `I scored ${points} points (${correctCount}/${quizQuestions.length} correct) on ${config.label} difficulty in the Programming Quiz!`;

  if (navigator.share) {
    navigator.share({ text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text).then(() => {
      shareBtn.textContent = "Copied!";
      setTimeout(() => { shareBtn.textContent = "Share result"; }, 1800);
    });
  }
}

function toggleMute() {
  soundOn = !soundOn;
  muteBtn.textContent = soundOn ? "🔊" : "🔇";
}

let audioCtx = null;
function playTone(type) {
  if (!soundOn) return;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const freqs = { correct: [523, 659], wrong: [220, 165], skip: [330, 330] };
  const [f1, f2] = freqs[type];

  osc.frequency.setValueAtTime(f1, audioCtx.currentTime);
  osc.frequency.setValueAtTime(f2, audioCtx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.25);
}