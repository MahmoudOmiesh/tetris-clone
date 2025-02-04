import { canPieceMove } from './collision';

export function move({ name, color, coords }, dir) {
  let newCoords;

  switch (dir) {
    case 'down':
      newCoords = coords.map(({ r, c }) => ({ r: r + 1, c }));
      break;
    case 'left':
      newCoords = coords.map(({ r, c }) => ({ r, c: c - 1 }));
      break;
    case 'right':
      newCoords = coords.map(({ r, c }) => ({ r, c: c + 1 }));
      break;
    default:
      throw new Error(`${dir} Is Not Defined.`);
  }

  return { name, color, coords: newCoords };
}

export function rotate({ name, color, coords }) {
  const { r: r0, c: c0 } = coords[0];

  const newCoords = coords.map(({ r, c }) => ({
    r: c - c0 + r0,
    c: r0 - r + c0,
  }));

  return {
    name,
    color,
    coords: newCoords,
  };
}

export function drop(tetrisGrid, piece) {
  const newCoords = getDropCoords(tetrisGrid, piece);

  return { name: piece.name, color: piece.color, coords: newCoords };
}

export function getDropCoords(tetrisGrid, piece) {
  tetrisGrid = structuredClone(tetrisGrid);
  piece = structuredClone(piece);

  while (canPieceMove(tetrisGrid, piece, 'down')) {
    piece.coords.forEach(({ r, c }) => (tetrisGrid[r][c] = { type: 'blank' }));
    piece = move(piece, 'down');
    piece.coords.forEach(({ r, c }) => (tetrisGrid[r][c] = { type: 'piece' }));
  }

  return piece.coords;
}

export function getInitialPieceCoords(pieceName) {
  //pivot point at index 0 for each piece
  switch (pieceName) {
    case 'i-block':
      return [
        { r: 0, c: 3 },
        { r: 0, c: 4 },
        { r: 0, c: 5 },
        { r: 0, c: 6 },
      ];
    case 'j-block':
      return [
        { r: 1, c: 4 },
        { r: 0, c: 3 },
        { r: 1, c: 3 },
        { r: 1, c: 5 },
      ];
    case 'l-block':
      return [
        { r: 1, c: 4 },
        { r: 0, c: 5 },
        { r: 1, c: 3 },
        { r: 1, c: 5 },
      ];
    case 'o-block':
      return [
        { r: 0, c: 4 },
        { r: 0, c: 5 },
        { r: 1, c: 4 },
        { r: 1, c: 5 },
      ];
    case 's-block':
      return [
        { r: 1, c: 5 },
        { r: 0, c: 5 },
        { r: 0, c: 6 },
        { r: 1, c: 4 },
      ];
    case 't-block':
      return [
        { r: 1, c: 4 },
        { r: 1, c: 3 },
        { r: 1, c: 5 },
        { r: 0, c: 4 },
      ];
    case 'z-block':
      return [
        { r: 1, c: 5 },
        { r: 1, c: 6 },
        { r: 0, c: 4 },
        { r: 0, c: 5 },
      ];
  }
}
