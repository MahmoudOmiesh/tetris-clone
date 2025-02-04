import { GRID_COLUMNS, GRID_ROWS } from './config';

export function initialTetrisGrid() {
  return Array.from(
    {
      length: GRID_ROWS,
    },
    () =>
      Array.from(
        {
          length: GRID_COLUMNS,
        },
        () => {
          return { type: 'blank' };
        },
      ),
  );
}

export function getLineClearText(completeLines) {
  let text = '';
  switch (completeLines) {
    case 1:
      text = 'SINGLE';
      break;
    case 2:
      text = 'DOUBLE';
      break;
    case 3:
      text = 'TRIPLE';
      break;
    case 4:
      text = 'TETRIS';
      break;
  }

  return text;
}

export function isRowFull(row) {
  return row.every((cell) => cell.type === 'piece');
}

export function isRowEmpty(row) {
  return row.every((cell) => cell.type === 'piece');
}

export function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function cc(...classes) {
  return classes.filter((cl) => typeof cl === 'string').join(' ');
}
