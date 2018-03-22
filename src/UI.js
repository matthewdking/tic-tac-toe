export default class UI {
  constructor(board) {
    this.board = board;
  }
  boardDisplay(board) {
    return ` ${board[0]} | ${board[1]} | ${board[2]} \n===+===+===\n ${
      board[3]
    } | ${board[4]} | ${board[5]} \n===+===+===\n ${board[6]} | ${board[7]} | ${
      board[8]
    }\n`;
  }
  showBoard() {
    console.log(this.boardDisplay(this.board));
  }
  gameOver() {
    console.log('Game over');
  }
  askForMove() {
    console.log("It's your turn\n");
    console.log('Enter a number between 0 and 8\n');
  }
  showComputerMove(move) {
    console.log(`The computer player: ${move}\n`);
  }
}
