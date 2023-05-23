let titles = document.querySelectorAll(".title");

let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let beingShuffled = false;

function buildRandWord(length) {
  let result = "";

  for (let i = 0; i < length; i++)
    result += letters[Math.floor(Math.random() * 26)];

  return result;
}

function shuffleLetters(event, original) {
  let n = -1;
  beingShuffled = true;

  function loopLetters() {
    let randWord = buildRandWord(original.length);
    n++;
    setTimeout(() => {
      if (n == 0) event.target.innerText = randWord;
      else {
        let originalPiece = original.slice(0, n);

        let randPiece = randWord.slice(n);
        event.target.innerText = originalPiece + randPiece;
      }

      if (n < original.length) loopLetters();
      else beingShuffled = false;
    }, 30);
  }

  loopLetters();
}

function getInterval(interval) {
  return interval;
}

function shuffleText(event, original) {
  let interval = setInterval(() => {
    if (!beingShuffled) {
      shuffleLetters(event, original);
      console.log("EXECUTING");
      clearInterval(interval);
    }
  }, 1);
}

let originalTitleTop = titles[0].innerText;
titles[0].onmouseover = (event) => {
  shuffleText(event, originalTitleTop);
};

let originalTitleBot = titles[1].innerText;
titles[1].onmouseover = (event) => {
  shuffleText(event, originalTitleBot);
};

window.addEventListener("mousemove", (event) => {
  let screen = document.querySelectorAll(".screen");

  let mouseX =
    -(
      (event.clientY - window.innerHeight / 2) /
      (window.innerHeight / 2)
    ) *
      20 +
    "deg";
  let mouseY =
    ((event.clientX - window.innerWidth / 2) /
      (window.innerWidth / 2)) *
      20 +
    "deg";

  screen.forEach((screen) => {
    screen.style.setProperty("--mouseX", mouseX);
    screen.style.setProperty("--mouseY", mouseY);
  });
});

// carousel of screens
const rightBtn = document.querySelector(".forward-arrow");
const leftBtn = document.querySelector(".back-arrow");
const carousel = document.querySelector(".card-container");

rightBtn.addEventListener("click", () => {
  leftBtn.hidden = false;
  leftBtn.style.opacity = 1;
  let currentCard = document.querySelector(".current-card");
  let curr = Array.from(carousel.children).findIndex(
    (card, index) => card == currentCard
  );
  if (
    curr + 1 ==
    Array.from(carousel.children).length - 1
  ) {
    rightBtn.style.opacity = 0;
    rightBtn.hidden = true;
  }
  let nextCard = Array.from(carousel.children)[curr + 1];

  if (curr < Array.from(carousel.children).length - 1) {
    currentCard.style.left = -100 + "%";
    nextCard.style.left = 0;

    currentCard.children[0].classList.remove(
      "follow-mouse"
    );
    currentCard.classList.remove("current-card");
    nextCard.classList.add("current-card");
    nextCard.children[0].classList.add("follow-mouse");
  }
});

leftBtn.addEventListener("click", () => {
  rightBtn.hidden = false;
  rightBtn.style.opacity = 1;
  let currentCard = document.querySelector(".current-card");
  let curr = Array.from(carousel.children).findIndex(
    (card, index) => card == currentCard
  );

  if (curr - 1 == 2) {
    leftBtn.style.opacity = 0;
    leftBtn.hidden = true;
  }
  let prevCard = Array.from(carousel.children)[curr - 1];

  if (curr > 2) {
    currentCard.style.left = 100 + "%";
    prevCard.style.left = 0;

    currentCard.children[0].classList.remove(
      "follow-mouse"
    );
    currentCard.classList.remove("current-card");
    prevCard.classList.add("current-card");
    prevCard.children[0].classList.add("follow-mouse");
  }
});
