import { GRID_ROWS, GRID_COLUMNS } from './config';
import { rotate } from './movement';

export function canPieceMove(tetrisGrid, piece, dir) {
  switch (dir) {
    case 'down':
      return canPieceMoveDown(tetrisGrid, piece);
    case 'left':
      return canPieceMoveLeft(tetrisGrid, piece);
    case 'right':
      return canPieceMoveRight(tetrisGrid, piece);
    default:
      throw new Error(`${dir} Is Not Defined`);
  }
}

function canPieceMoveDown(tetrisGrid, { coords }) {
  let rMx = -1;

  coords.forEach(({ r }) => {
    rMx = Math.max(rMx, r);
  });

  return !(
    rMx >= GRID_ROWS - 1 ||
    coords.some(({ r, c }) => {
      return (
        tetrisGrid[r + 1][c].type === 'piece' &&
        !coords.some(({ r: _r, c: _c }) => _r === r + 1 && _c === c)
      );
    })
  );
}

function canPieceMoveRight(tetrisGrid, { coords }) {
  let cMx = -1;

  coords.forEach(({ c }) => {
    cMx = Math.max(cMx, c);
  });

  return !(
    cMx >= GRID_COLUMNS - 1 ||
    coords.some(({ r, c }) => {
      return (
        tetrisGrid[r][c + 1].type === 'piece' &&
        !coords.some(({ r: _r, c: _c }) => _r === r && _c === c + 1)
      );
    })
  );
}

function canPieceMoveLeft(tetrisGrid, { coords }) {
  let cMn = 10000;

  coords.forEach(({ c }) => {
    cMn = Math.min(cMn, c);
  });

  return !(
    cMn <= 0 ||
    coords.some(({ r, c }) => {
      return (
        tetrisGrid[r][c - 1].type === 'piece' &&
        !coords.some(({ r: _r, c: _c }) => _r === r && _c === c - 1)
      );
    })
  );
}

export function canPieceRotate(tetrisGrid, piece) {
  tetrisGrid = structuredClone(tetrisGrid);

  const { name, coords } = piece;
  coords.forEach(({ r, c }) => (tetrisGrid[r][c] = { type: 'blank' }));
  const { coords: newCoords } = rotate(piece);

  return !(
    name === 'o-block' ||
    newCoords.some(
      ({ r, c }) =>
        r < 0 ||
        c < 0 ||
        r >= GRID_ROWS ||
        c >= GRID_COLUMNS ||
        tetrisGrid[r][c].type === 'piece',
    )
  );
}
