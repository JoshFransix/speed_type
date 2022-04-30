window.addEventListener("load", init);

// Globals

// Available levels
const levels = {
  easy: 15,
  medium: 10,
  hard: 5,
};

// To change level
let currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const skipBtn = document.querySelector(".btn");
const selection = document.querySelector("#list");
const selectedValue = document.querySelector("#list").value;

const words = [
  "remodelling",
  "overcivilizing",
  "germicidal",
  "domelike",
  "basti",
  "nontrigonometric",
  "deadlight",
  "beady",
  "dixit",
  "weevil",
  "july",
  "java",
  "jinker",
  "jazzily",
  "jargonesque",
  "jointress",
  "junkie",
  "jellify",
  "juju",
  "jackboxes",
  "interdenominationalism",
  "antiutilitarianism",
  "desoxyribonucleoprotein",
  "dicyclopentadienyliron",
  "overindividualization",
  "magnetohydrodynamically",
  "poliencephalomyelitis",
  "antimaterialistically",
  "oxydase",
  "violable",
  "undergeneral",
  "resubmitted",
  "transcribed",
  "equipoise",
  "zoospore",
  "nonirenic",
  "interasteroidal",
  "aneurysmal",
];

// Initialize Game

function init() {
  selection.addEventListener("change", changeLevel);
  // Show seconds
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener("input", startMatch);
  // Run countdown
  setInterval(countDown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
  // Hide skipBtn
  skipBtn.style.display = "none";
}

function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = "";
    score++;
  }

  // If score is -1,display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match current word to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct";
    message.style.color = "green";
    message.style.transition = "all 0.3s ease-in-out";
    skipBtn.style.display = "block";

    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

// Pick and Show random words
function showWord(words) {
  // Generate random index
  const randIndex = Math.floor(Math.random() * words.length);

  // Output random word
  currentWord.innerHTML = words[randIndex];
}

function changeLevel() {
  // showWord(words);
  if (selection.options[selection.selectedIndex].text === "Easy") {
    if (matchWords()) {
      startMatch();
    }

    currentLevel = levels.easy;
    time = currentLevel;
    seconds.innerHTML = currentLevel;
    showWord(words);

    // currentWord.innerHTML = "Easypeezy";
  }
  if (selection.options[selection.selectedIndex].text === "Medium") {
    if (matchWords()) {
      startMatch();
    }
    currentLevel = levels.medium;
    time = currentLevel;
    seconds.innerHTML = currentLevel;
    showWord(words);
  }
  if (selection.options[selection.selectedIndex].text === "Hard") {
    if (matchWords()) {
      startMatch();
    }
    currentLevel = levels.hard;
    time = currentLevel;
    seconds.innerHTML = currentLevel;
    showWord(words);
  }
}

// Run countdown timer
function countDown() {
  // Make sure time is not exhausted
  if (time > 0) {
    // Decrement time
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }

  // Show time
  timeDisplay.innerHTML = time;
}

// Check Game Status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = "Game over!!!";
    message.style.color = "red";
    score = -1;
    skipBtn.style.display = "none";
  }
}

// Skip word
skipBtn.addEventListener("click", () => {
  showWord(words);
});

// TYPEWRITER EFFECT

const typeWriter = function (txtElement, wordss, wait = 3000) {
  this.txtElement = txtElement;
  this.wordss = wordss;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

// Type method
typeWriter.prototype.type = function () {
  // Current index of word
  const current = this.wordIndex % this.wordss.length;

  // Get full txt of current word
  const fullTxt = this.wordss[current];

  // Check if deleting
  if (this.isDeleting) {
    // Remove character
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // Add character
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Initial type speed
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // If word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // Make pause at end
    typeSpeed = this.wait;
    // Set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    // Move to next word
    this.wordIndex++;
    // Pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

// Init on DOM Load
document.addEventListener("DOMContentLoaded", initialize);

// Init app
function initialize() {
  const txtElement = document.querySelector(".txt-type");
  const wordss = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init typewriter
  new typeWriter(txtElement, wordss, wait);
}
