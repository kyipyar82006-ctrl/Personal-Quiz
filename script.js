// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What color do I love the most?🎨",
    answers: [
      { text: "Dark Brown 🟤", correct: false },
      { text: "Matcha Green 🟢", correct: true },
      { text: "Olive Green 🟢", correct: false },
      { text: "Dark Blue 🔵", correct: false },
    ],
  },
  {
    question: "What do I drink when I'm feeling down?🧃",
    answers: [
      { text: "Chocolate  🍫", correct: false },
      { text: "Hot Matcha 🍵", correct: false },
      { text: "Energy Drink 🥤", correct: false },
      { text: "Coffee ☕", correct: true },
    ],
  },
  {
    question: "If I were an animal, which one would I be?🕸",
    answers: [
      { text: "Dinosaur 🦕", correct: false },
      { text: "Cat 😺", correct: false },
      { text: "Turtle 🐢", correct: true },
      { text: "Butterfly 🦋", correct: false },
    ],
  },
  {
    question: "What is my dream travel destination?🗺",
    answers: [
      { text: "Pyramids ⛰️", correct: false },
      { text: "Taj Mahal 🕌", correct: true },
      { text: "Greece 🏖", correct: false },
      { text: "Tokyo Tower 🗼", correct: false },
    ],
  },
  {
    question: "What is my Personality Type?🎱",
    answers: [
      { text: "The Virtuoso 🎭", correct: false },
      { text: "The Explorer 🗺️", correct: false },
      { text: "The Advocate ⚖️", correct: true },
      { text: "The Adventurer 🧗", correct: false },
    ],
  },
  {
    question: "What kind of affection do I crave the most?🌵",
    answers: [
      { text: "Speaking gently 🪐", correct: false },
      { text: "Physical touch 🌱", correct: true },
      { text: "Checking in on me 💻", correct: false },
      { text: "Being patient and understanding 🤗", correct: false },
    ],
  },
  {
    question: "What is my biggest pet peeve?💨",
    answers: [
      { text: "People chewing loudly 🥢", correct: false },
      { text: "Being ignored 😤", correct: false },
      { text: "Messy room 🧹", correct: true },
      { text: "Leaving me alone 😔", correct: false },
    ],
  },
  {
    question: "What would I buy even if it were super expensive?💋",
    answers: [
      { text: "Makeup Products 💄", correct: false },
      { text: "Skincare Products 🧴", correct: true },
      { text: "Clothing 👕", correct: false },
      { text: "Perfume 🌸", correct: false },
    ],
  },
  {
    question: "What is my most red flag trait?🔥",
    answers: [
      { text: "Never posting anything 📲", correct: false },
      { text: "Acting uninterested when I'm actually obsessed 🎧", correct: true },
      { text: "Pretending to be obsessed when I'm really uninterested 💦", correct: false },
      { text: "Very stubborn 🔨", correct: false },
    ],
  },
  {
    question: "What bothers me the most?🧨",
    answers: [
      { text: "Breaking a promise 🚫", correct: false },
      { text: "Unfairness ⚖️", correct: true },
      { text: "Favoritism 🎯", correct: false },
      { text: "Being two-faced 🎭", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
  const username = document.getElementById("username").value.trim();

    if (username === "") {
        alert("Please enter your name! 🐥");
        return;
    }

    localStorage.setItem("username", username);

    // Go to quiz page
    window.location.href = "index.html";
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 800);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  let img1 = document.createElement("img");
  img1.src = "photo_2026-08-14_20-40-09.jpg";
  img1.alt = "celebration";
  img1.style.width = "160px";
  img1.style.height = "160px";
  img1.style.margin = "20px auto 0";
  img1.style.display = "block";
  img1.style.borderRadius = "10px";

  let img2 = document.createElement("img");
  img2.src = "photo_2026-08-14_21-06-45.jpg";
  img2.alt = "celebration";
  img2.style.width = "160px";
  img2.style.height = "160px";
  img2.style.margin = "20px auto 0";
  img2.style.display = "block";
  img2.style.borderRadius = "10px";

  let img3 = document.createElement("img");
  img3.src = "photo_2026-08-14_21-08-56.jpg";
  img3.alt = "celebration";
  img3.style.width = "160px";
  img3.style.height = "160px";
  img3.style.margin = "20px auto 0";
  img3.style.display = "block";
  img3.style.borderRadius = "10px";

  let img4 = document.createElement("img");
  img4.src = "photo_2026-08-15_13-31-20.jpg";
  img4.alt = "celebration";
  img4.style.width = "160px";
  img4.style.height = "160px";
  img4.style.margin = "20px auto 0";
  img4.style.display = "block";
  img4.style.borderRadius = "10px";

  let img5 = document.createElement("img");
  img5.src = "photo_2026-08-14_21-11-41.jpg";
  img5.alt = "celebration";
  img5.style.width = "160px";
  img5.style.height = "160px";
  img5.style.margin = "20px auto 0";
  img5.style.display = "block";
  img5.style.borderRadius = "10px";
  

  if (percentage === 100) {
    resultMessage.textContent = "Bro knows me better than I know myself!💯";
    resultMessage.appendChild(img1);
  } else if (percentage >= 80) {
    resultMessage.textContent = "That's actually impressive!✨";
    resultMessage.appendChild(img2);
  } else if (percentage >= 60) {
    resultMessage.textContent = "Okayyy, you know me🍄";
    resultMessage.appendChild(img3);
  } else if (percentage >= 40) {
    resultMessage.textContent = "We need to talk!🗣";
    resultMessage.appendChild(img4);
  } else {
    resultMessage.textContent = "I admire the confidence. Not the answers.💣";
    resultMessage.appendChild(img5);
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}