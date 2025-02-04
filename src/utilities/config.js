export const GRID_COLUMNS = 10;
export const GRID_EXTRA_ROWS = 2;
export const GRID_ROWS = 20 + GRID_EXTRA_ROWS; //extra rows for placing pieces initially

export const LINES_PER_LEVEL = 5;
export const MAX_LEVEL = 9;

export const PIECE_NAMES = [
  'i-block',
  'j-block',
  'l-block',
  'o-block',
  's-block',
  't-block',
  'z-block',
];

export const GAME_SPEEDS = {
  1: 1000,
  2: 900,
  3: 800,
  4: 700,
  5: 600,
  6: 500,
  7: 400,
  8: 300,
  9: 200,
  slidingWindow: 500,
};

export const SCORE_PER_LINE = {
  0: 0,
  1: 40,
  2: 100,
  3: 300,
  4: 1200,
};

export const CONTROLS = {
  MOVE_LEFT: ['ArrowLeft', 'h'],
  MOVE_RIGHT: ['ArrowRight', 'l'],
  MOVE_DOWN: ['ArrowDown', 'j'],
  ROTATE: ['ArrowUp', 'k'],
  DROP: [' '],
  PAUSE: ['Escape'],
};
