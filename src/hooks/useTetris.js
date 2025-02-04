import { useCallback, useEffect, useState } from 'react';

import moveSound from '../sfx/move.mp3';
import rotateSound from '../sfx/rotate.mp3';
import dropSound from '../sfx/drop.mp3';
import lineClearSound from '../sfx/line-clear.mp3';
import useSound from 'use-sound';

import {
  CONTROLS,
  GAME_SPEEDS,
  GRID_EXTRA_ROWS,
  LINES_PER_LEVEL,
  MAX_LEVEL,
  SCORE_PER_LINE,
} from '../utilities/config';
import { isRowFull, getLineClearText } from '../utilities/helpers';
import { canPieceMove, canPieceRotate } from '../utilities/collision';

import { useInterval } from './useInterval';
import { useTetrisBoard } from './useTetrisBoard';

export function useTetris() {
  const { boardData, boardActions } = useTetrisBoard();
  const { tetrisBoard, currentPiece, nextPiece } = boardData;
  const {
    initBoard,
    newPiece,
    movePiece,
    rotatePiece,
    dropPiece,
    clearCompleteLines,
  } = boardActions;

  const [didGameStart, setDidGameStart] = useState(false);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [didPlayerLose, setDidPlayerLose] = useState(false);

  const [gameSpeed, setGameSpeed] = useState(null);

  const [score, setScore] = useState(0);
  const [clearedLines, setClearedLines] = useState(0);
  const level = Math.min(
    Math.floor(clearedLines / LINES_PER_LEVEL) + 1,
    MAX_LEVEL,
  );

  const [animationInfo, setAnimationInfo] = useState({});

  const [playMoveSound] = useSound(moveSound);
  const [playRotateSound] = useSound(rotateSound);
  const [playDropSound] = useSound(dropSound);
  const [playLineClearSound] = useSound(lineClearSound);

  const startNewGame = useCallback(() => {
    initBoard();
    setDidGameStart(true);
    setIsGameRunning(true);
    setDidPlayerLose(false);
    setGameSpeed(GAME_SPEEDS[1]);
    setScore(0);
    setClearedLines(0);
    setAnimationInfo({});
  }, [initBoard]);

  const stopGame = useCallback(() => {
    setIsGameRunning(false);
    setGameSpeed(null);
  }, []);

  const resumeGame = useCallback(() => {
    setIsGameRunning(true);
    setGameSpeed(GAME_SPEEDS[level]);
  }, [level]);

  const endGame = useCallback(() => {
    setIsGameRunning(false);
    setDidPlayerLose(true);
    setGameSpeed(null);
  }, []);

  const movePieceAndPlaySound = useCallback(
    (dir) => {
      movePiece(dir);
      playMoveSound();
    },
    [movePiece, playMoveSound],
  );

  const rotatePieceAndPlaySound = useCallback(() => {
    rotatePiece();
    playRotateSound();
  }, [rotatePiece, playRotateSound]);

  const dropPieceAndPlaySound = useCallback(() => {
    dropPiece();
    playDropSound();
  }, [dropPiece, playDropSound]);

  const getCompletedLinesNum = () => {
    return tetrisBoard.reduce((acc, cur) => acc + isRowFull(cur), 0);
  };

  const didGameEnd = () => {
    return currentPiece.coords.some(({ r }) => r < GRID_EXTRA_ROWS);
  };

  const updateStats = (completedLines) => {
    setClearedLines((l) => l + completedLines);
    setScore((s) => s + SCORE_PER_LINE[completedLines] * level);
  };

  const gameLoop = () => {
    if (canPieceMove(tetrisBoard, currentPiece, 'down')) {
      movePiece('down');
    } else {
      if (didGameEnd()) {
        endGame();
        return;
      }

      const completedLines = getCompletedLinesNum();

      const newAnimationInfo = {
        bounce: true,
        shimmerCoords: completedLines > 0 ? null : currentPiece.coords,
        text: completedLines > 0 ? getLineClearText(completedLines) : null,
      };
      setAnimationInfo(newAnimationInfo);

      if (completedLines !== 0) {
        playLineClearSound();
        updateStats(completedLines);
        clearCompleteLines();
      }

      newPiece();
    }

    setGameSpeed(GAME_SPEEDS[level]);
  };

  useEffect(() => {
    if (!isGameRunning) return;

    if (!canPieceMove(tetrisBoard, currentPiece, 'down')) {
      setGameSpeed(GAME_SPEEDS.slidingWindow);
    }
  }, [isGameRunning, tetrisBoard, currentPiece]);

  useEffect(() => {
    if (!didGameStart || didPlayerLose) return;

    const handlePauseKey = (e) => {
      if (!CONTROLS.PAUSE.includes(e.key) || e.repeat) return;

      if (isGameRunning) stopGame();
      else resumeGame();
    };

    document.addEventListener('keydown', handlePauseKey);

    return () => document.removeEventListener('keydown', handlePauseKey);
  }, [didGameStart, didPlayerLose, isGameRunning, resumeGame, stopGame]);

  useEffect(() => {
    if (!isGameRunning) return;

    const handleKeyDown = (e) => {
      const { key } = e;

      if (
        CONTROLS.MOVE_DOWN.includes(key) &&
        canPieceMove(tetrisBoard, currentPiece, 'down')
      ) {
        setGameSpeed(null);
        movePieceAndPlaySound('down');
      }

      if (
        CONTROLS.MOVE_LEFT.includes(key) &&
        canPieceMove(tetrisBoard, currentPiece, 'left')
      ) {
        movePieceAndPlaySound('left');
      }

      if (
        CONTROLS.MOVE_RIGHT.includes(key) &&
        canPieceMove(tetrisBoard, currentPiece, 'right')
      ) {
        movePieceAndPlaySound('right');
      }

      if (
        CONTROLS.ROTATE.includes(key) &&
        !e.repeat &&
        canPieceRotate(tetrisBoard, currentPiece)
      ) {
        rotatePieceAndPlaySound();
      }

      if (
        CONTROLS.DROP.includes(key) &&
        !e.repeat &&
        canPieceMove(tetrisBoard, currentPiece, 'down')
      ) {
        setGameSpeed(0);
        dropPieceAndPlaySound();
      }
    };

    const handleKeyUp = (e) => {
      if (CONTROLS.MOVE_DOWN.includes(e.key)) {
        setGameSpeed(Math.min(GAME_SPEEDS[level], GAME_SPEEDS.slidingWindow));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [
    isGameRunning,
    level,
    tetrisBoard,
    currentPiece,
    movePieceAndPlaySound,
    rotatePieceAndPlaySound,
    dropPieceAndPlaySound,
  ]);

  useInterval(() => {
    if (!isGameRunning) return;
    gameLoop();
  }, gameSpeed);

  return {
    tetrisBoard,
    currentPiece,
    nextPiece,
    stopGame,
    resumeGame,
    score,
    clearedLines,
    level,
    didGameStart,
    isGameRunning,
    didPlayerLose,
    startNewGame,
    animationInfo,
    setAnimationInfo,
  };
}
