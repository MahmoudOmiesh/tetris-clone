import { GRID_ROWS, GRID_COLUMNS, PIECE_NAMES } from '../utilities/config';
import {
  move,
  drop,
  rotate,
  getInitialPieceCoords,
  getDropCoords,
} from '../utilities/movement';

import {
  isRowFull,
  isRowEmpty,
  getRandom,
  initialTetrisGrid,
} from '../utilities/helpers';

import { useMemo, useReducer } from 'react';

const DISPATCH_ACTIONS = {
  INIT: 'init',
  NEW: 'new-piece',
  MOVE: 'move',
  ROTATE: 'rotate',
  DROP: 'drop',
  CLEAR_COMPLETE_LINES: 'clear-complete-lines',
};

function applyPieceCoords(tetrisBoard, { coords, ...piece }) {
  coords.forEach(({ r, c }) => {
    tetrisBoard[r][c] = { type: 'piece', ...piece };
  });
}

function applyBlankCoords(tetrisBoard, { coords }) {
  coords.forEach(({ r, c }) => {
    tetrisBoard[r][c] = { type: 'blank' };
  });
}

function applyDropCoords(tetrisBoard, currentPiece) {
  getDropCoords(tetrisBoard, currentPiece).forEach(({ r, c }) => {
    if (tetrisBoard[r][c].type === 'blank')
      tetrisBoard[r][c] = { type: 'drop' };
  });
}

function removeLines(tetrisBoard) {
  for (let i = 1; i < GRID_ROWS; ++i) {
    if (!isRowFull(tetrisBoard[i])) continue;
    let j = i;

    while (j > 0 && !isRowEmpty(tetrisBoard[j - 1])) {
      [tetrisBoard[j], tetrisBoard[j - 1]] = [
        tetrisBoard[j - 1],
        tetrisBoard[j],
      ];
      --j;
    }

    tetrisBoard[j] = Array.from({ length: GRID_COLUMNS }, () => ({
      type: 'blank',
    }));
  }
}

function tetrisBoardReducer(prevState, action) {
  const { type } = action;
  const [tetrisBoard, currentPiece, nextPiece] = prevState;

  const newTetrisBoard =
    type === DISPATCH_ACTIONS.INIT
      ? initialTetrisGrid()
      : structuredClone(tetrisBoard);

  if (type === DISPATCH_ACTIONS.INIT || type === DISPATCH_ACTIONS.NEW) {
    const newPieceName =
      type === DISPATCH_ACTIONS.INIT ? getRandom(PIECE_NAMES) : nextPiece.name;
    const newPieceCoords = getInitialPieceCoords(newPieceName);

    const newCurrentPiece = {
      name: newPieceName,
      coords: newPieceCoords,
    };

    const newNextPiece = {
      name: getRandom(PIECE_NAMES),
    };

    applyPieceCoords(newTetrisBoard, newCurrentPiece);
    applyDropCoords(newTetrisBoard, newCurrentPiece);

    return [newTetrisBoard, newCurrentPiece, newNextPiece];
  }

  if (
    type === DISPATCH_ACTIONS.MOVE ||
    type === DISPATCH_ACTIONS.ROTATE ||
    type === DISPATCH_ACTIONS.DROP
  ) {
    let newCurrentPiece;

    switch (action.type) {
      case DISPATCH_ACTIONS.MOVE:
        newCurrentPiece = move(currentPiece, action.dir);
        break;
      case DISPATCH_ACTIONS.ROTATE:
        newCurrentPiece = rotate(currentPiece);
        break;
      case DISPATCH_ACTIONS.DROP:
        newCurrentPiece = drop(tetrisBoard, currentPiece);
        break;
    }

    applyBlankCoords(newTetrisBoard, {
      coords: getDropCoords(tetrisBoard, currentPiece),
    });
    applyBlankCoords(newTetrisBoard, currentPiece);

    applyPieceCoords(newTetrisBoard, newCurrentPiece);
    applyDropCoords(newTetrisBoard, newCurrentPiece);

    return [newTetrisBoard, newCurrentPiece, nextPiece];
  }

  if (action.type === DISPATCH_ACTIONS.CLEAR_COMPLETE_LINES) {
    removeLines(newTetrisBoard);

    return [newTetrisBoard, currentPiece, nextPiece];
  }

  throw new Error(`Action: ${type} Is Not Defined`);
}

export function useTetrisBoard() {
  const [state, dispatch] = useReducer(tetrisBoardReducer, [
    initialTetrisGrid(),
    {},
    {},
  ]);

  const boardActions = useMemo(() => {
    return {
      initBoard: () => dispatch({ type: DISPATCH_ACTIONS.INIT }),
      newPiece: () => dispatch({ type: DISPATCH_ACTIONS.NEW }),
      movePiece: (dir) => dispatch({ type: DISPATCH_ACTIONS.MOVE, dir }),
      rotatePiece: () => dispatch({ type: DISPATCH_ACTIONS.ROTATE }),
      dropPiece: () => dispatch({ type: DISPATCH_ACTIONS.DROP }),
      clearCompleteLines: () =>
        dispatch({ type: DISPATCH_ACTIONS.CLEAR_COMPLETE_LINES }),
    };
  }, [dispatch]);

  return {
    boardData: {
      tetrisBoard: state[0],
      currentPiece: state[1],
      nextPiece: state[2],
    },
    boardActions,
  };
}
