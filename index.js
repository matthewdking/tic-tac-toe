import UI from './src/UI';
import Game from './src/Game';

const board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let X = 'X';
let O = 'O';
let players = [X, O];
let currentTurn = X;

const ui = new UI(board);
const game = new Game(ui, board, players, currentTurn);

game.play();
