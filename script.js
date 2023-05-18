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
  let n = 0;
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
    }, 40);
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
