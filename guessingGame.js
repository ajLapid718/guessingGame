function generateWinningNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

function shuffle(array) {
  let front = 0;
  let back = array.length - 1;

  while (front < back) {
    let randomIdx = Math.floor(Math.random() * (back + 1));
    let temp = array[back];

    array[back] = array[randomIdx];
    array[randomIdx] = temp;

    front++;
    back--;
  }

  return array;
}

function Game() {
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
  return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function() {
  return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(num) {
  if (isNaN(num) || num < 1 || num > 100) {
    throw("That is an invalid guess.");
  }
  else {
    this.playersGuess = num;
  }

  return this.checkGuess();
}

Game.prototype.checkGuess = function() {
  if (this.pastGuesses.length === 4) {
    return "You Lose.";
  }

  if (this.playersGuess === this.winningNumber) {
    return "You Win!";
  }

  if (this.pastGuesses.includes(this.playersGuess)) {
    return "You have already guessed that number.";
  }
  else {
    this.pastGuesses.push(this.playersGuess);
  }

  let temperature = "";
  let difference = Math.abs(this.playersGuess - this.winningNumber);

  switch (true) {
  case difference < 10:
    temperature = "You're burning up!";
    break;
  case difference < 25:
    temperature = "You're lukewarm.";
    break;
  case difference < 50:
    temperature = "You're a bit chilly.";
    break;
  case difference < 100:
    temperature = "You're ice cold!";
  }

  return temperature;
}

function newGame() {
  let newGameInstance = new Game();
  return newGameInstance;
}

Game.prototype.provideHint = function() {
  let arr = Array(3);

  arr[0] = this.winningNumber;
  arr[1] = generateWinningNumber();
  arr[2] = generateWinningNumber();

  return shuffle(arr);
}
