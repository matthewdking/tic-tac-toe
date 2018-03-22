export default class Game {
  constructor(ui, board, players, currentTurn) {
    this.patterns1 = [
      [/ OO....../, 0],
      [/O..O.. ../, 6],
      [/......OO /, 8],
      [/.. ..O..O/, 2],
      [/ ..O..O../, 0],
      [/...... OO/, 6],
      [/..O..O.. /, 8],
      [/OO ....../, 2],
      [/ ...O...O/, 0],
      [/..O.O. ../, 6],
      [/O...O... /, 8],
      [/.. .O.O../, 2],
      [/O O....../, 1],
      [/O.. ..O../, 3],
      [/......O O/, 7],
      [/..O.. ..O/, 5],
      [/. ..O..O./, 1],
      [/... OO.../, 3],
      [/.O..O.. ./, 7],
      [/...OO .../, 5],
    ];
    this.patterns2 = [
      [/  X . X  /, 1],
      [/ XX....../, 0],
      [/X..X.. ../, 6],
      [/......XX /, 8],
      [/.. ..X..X/, 2],
      [/ ..X..X../, 0],
      [/...... XX/, 6],
      [/..X..X.. /, 8],
      [/XX ....../, 2],
      [/ ...X...X/, 0],
      [/..X.X. ../, 6],
      [/X...X... /, 8],
      [/.. .X.X../, 2],
      [/X X....../, 1],
      [/X.. ..X../, 3],
      [/......X X/, 7],
      [/..X.. ..X/, 5],
      [/. ..X..X./, 1],
      [/... XX.../, 3],
      [/.X..X.. ./, 7],
      [/...XX .../, 5],
      [/ X X.. ../, 0],
      [/ ..X.. X /, 6],
      [/.. ..X X /, 8],
      [/ X ..X.. /, 2],
      [/  XX.. ../, 0],
      [/X.. .. X /, 6],
      [/.. .XX   /, 8],
      [/X  ..X.. /, 2],
      [/ X  ..X../, 0],
      [/ ..X..  X/, 6],
      [/..X..  X /, 8],
      [/X  ..X.. /, 2],
    ];
    this.patterns3 = [
      [/OOO....../, 'O'],
      [/...OOO.../, 'O'],
      [/......OOO/, 'O'],
      [/O..O..O../, 'O'],
      [/.O..O..O./, 'O'],
      [/..O..O..O/, 'O'],
      [/O...O...O/, 'O'],
      [/..O.O.O../, 'O'],
      [/XXX....../, 'X'],
      [/...XXX.../, 'X'],
      [/......XXX/, 'X'],
      [/X..X..X../, 'X'],
      [/.X..X..X./, 'X'],
      [/..X..X..X/, 'X'],
      [/X...X...X/, 'X'],
      [/..X.X.X../, 'X'],
    ];
    this.ui = ui;
    this.board = board;
    [this.X, this.O] = players;
    this.currentTurn = currentTurn;
  }
  getMove() {
    if (this.board[4] == ' ') {
      return 4;
    }
    return this.board.indexOf(' ');
  }
  getPatternMove1() {
    let boardString = this.board.join('');
    for (let i = 0; i < this.patterns1.length; i++) {
      let array = boardString.match(this.patterns1[i][0]);
      if (array) {
        return this.patterns1[i][1];
      }
    }
    return -1;
  }
  getPatternMove2() {
    let boardString = this.board.join('');
    for (let i = 0; i < this.patterns2.length; i++) {
      let array = boardString.match(this.patterns2[i][0]);
      if (array) {
        return this.patterns2[i][1];
      }
    }
    return -1;
  }
  comp() {
    let x = this.getPatternMove1();
    if (x == -1) {
      x = this.getPatternMove2();
      if (x == -1) {
        x = this.getMove();
      }
    }
    this.move(x, this.O);
  }
  move(pos, x) {
    if (x != this.currentTurn) {
      return false;
    }
    if (+pos >= 0 && +pos <= 8 && !isNaN(+pos) && this.board[+pos] == ' ') {
      this.board.splice(+pos, 1, x);
      this.currentTurn = x == this.X ? this.O : this.X;
      return true;
    }
    return false;
  }
  boardFilled() {
    let x = this.getMove();
    if (x == -1) {
      this.ui.showBoard();
      this.ui.gameOver();
      return true;
    }
    return false;
  }
  winner() {
    let boardString = this.board.join('');
    let theWinner = null;
    for (let i = 0; i < this.patterns3.length; i++) {
      let array = boardString.match(this.patterns3[i][0]);
      if (array) {
        theWinner = this.patterns3[i][1];
      }
    }
    if (theWinner) {
      this.ui.showBoard();
      this.ui.gameOver();
      return true;
    }
    return false;
  }
  exit() {
    process.exit();
  }
  play() {
    this.ui.showBoard();
    this.ui.askForMove();
    process.openStdin().on('data', res => {
      if (this.move(res, this.X)) {
        if (this.winner() || this.boardFilled()) {
          exit();
        } else {
          this.comp();
          if (this.winner() || this.boardFilled()) {
            this.exit();
          } else {
            this.ui.showBoard();
          }
        }
      }
    });
  }
}
