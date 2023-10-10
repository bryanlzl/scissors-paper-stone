let outcome = [];

let gameRecord = JSON.parse(localStorage.getItem("gameRecord")) ?? {
  winCount: 0,
  lossCount: 0,
  drawCount: 0,
};

document.querySelector(".game-history").innerText =
  "Win: " +
  gameRecord.winCount +
  ", Lose: " +
  gameRecord.lossCount +
  ", Draw: " +
  gameRecord.drawCount;

function gameReset() {
  localStorage.removeItem("gameRecord");
  document.querySelector(".commentary-parent").style.display = "none";
  document.querySelector(".game-outcome").style.display = "none";
  document.querySelector(".game-history").innerText =
    "Win: " + 0 + ", Lose: " + 0 + ", Draw: " + 0;
  gameRecord = {
    winCount: 0,
    lossCount: 0,
    drawCount: 0,
  };
}

function pickComputerMove() {
  return Math.floor(Math.random() * 3) + 1;
}

function mainGame(move, gameRecord) {
  let opp = pickComputerMove();
  let playerMove = "";
  let oppMove = "";
  let gameState = "";
  if (move === 1) {
    playerMove = "SCISSORS";
  } else if (move === 2) {
    playerMove = "PAPER";
  } else if (move === 3) {
    playerMove = "STONE";
  }
  if (opp === 1) {
    oppMove = "SCISSORS";
    if (move == 1) {
      gameRecord.drawCount++;
      gameState = "win";
    } else if (move == 2) {
      gameRecord.lossCount++;
      gameState = "lose";
    } else if (move == 3) {
      gameRecord.winCount++;
      gameState = "draw";
    }
  } else if (opp === 2) {
    oppMove = "PAPER";
    if (move === 1) {
      gameRecord.winCount++;
      gameState = "win";
    } else if (move === 2) {
      gameRecord.drawCount++;
      gameState = "draw";
    } else if (move === 3) {
      gameRecord.lossCount++;
      gameState = "lose";
    }
  } else if (opp === 3) {
    oppMove = "STONE";
    if (move === 1) {
      gameRecord.lossCount++;
      gameState = "lose";
    } else if (move === 2) {
      gameRecord.winCount++;
      gameState = "win";
    } else if (move === 3) {
      gameRecord.drawCount++;
      gameState = "draw";
    }
  }
  localStorage.setItem("gameRecord", JSON.stringify(gameRecord));
  return [gameState, playerMove, oppMove, gameRecord];
}

function determineMoveIcon(playerIcon, oppIcon) {
  const playerMoveIcon = document.createElement("img");
  const oppMoveIcon = document.createElement("img");
  playerMoveIcon.className = "player-move-icon";
  oppMoveIcon.className = "player-move-icon";
  playerMoveIcon.src =
    playerIcon == "SCISSORS"
      ? "./assets/icons/scissors-emoji.png"
      : playerIcon == "PAPER"
      ? "./assets/icons/paper-emoji.png"
      : "./assets/icons/rock-emoji.png";
  oppMoveIcon.src =
    oppIcon == "SCISSORS"
      ? "./assets/icons/scissors-emoji.png"
      : oppIcon == "PAPER"
      ? "./assets/icons/paper-emoji.png"
      : "./assets/icons/rock-emoji.png";
  return [playerMoveIcon, oppMoveIcon];
}

function playGame(move, gameRecord) {
  outcome = mainGame(move, gameRecord);
  document.querySelector(".game-outcome").innerText = "You " + outcome[0];

  // Game Commetary append elements int commentary-parent //
  document.querySelector(".game-outcome").style.display = "block";
  document.querySelector(".commentary-parent").style.display = "grid";
  document.querySelectorAll(".player-move-icon").forEach((i) => {
    i.remove();
  });
  const moveIcons = determineMoveIcon(outcome[1], outcome[2]);
  const placeholderTarget = document.querySelector(".commentary-placeholder");
  const parentTarget = document.querySelector(".commentary-parent");
  parentTarget.insertBefore(moveIcons[0], placeholderTarget);
  parentTarget.insertBefore(moveIcons[1], placeholderTarget);
  // ------------- //

  document.querySelector(".game-history").innerText =
    "Win: " +
    outcome[3].winCount +
    ", Lose: " +
    outcome[3].lossCount +
    ", Draw: " +
    outcome[3].drawCount;
}

let isAutoPlay = false;
let autoPlayIntervalId;

function autoPlay() {
  if (!isAutoPlay) {
    autoPlayIntervalId = setInterval(() => {
      playGame(Math.floor(Math.random() * 3) + 1, gameRecord);
    }, 50);
    isAutoPlay = true;
  } else {
    clearInterval(autoPlayIntervalId);
    isAutoPlay = false;
  }
}

let scissorButton = document.querySelector("#scissors");
let paperButton = document.querySelector("#paper");
let stoneButton = document.querySelector("#stone");
let resetScoreButton = document.querySelector(".reset-score");
let autoPlayButton = document.querySelector(".auto-play");

scissorButton.addEventListener("click", () => {
  playGame(1, gameRecord);
});
paperButton.addEventListener("click", () => {
  playGame(2, gameRecord);
});
stoneButton.addEventListener("click", () => {
  playGame(3, gameRecord);
});
resetScoreButton.addEventListener("click", () => {
  gameReset();
});
autoPlayButton.addEventListener("click", () => {
  autoPlay();
});
