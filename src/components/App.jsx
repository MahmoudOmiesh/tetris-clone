import { useEffect } from 'react';
import { useTetris } from '../hooks/useTetris';
import { TetrisBoard } from './TetrisBoard';
import { LineClearText } from './LineClearText';
import { Stats } from './Stats';
import { TetrisModal } from './TetrisModal';

function App() {
  const {
    tetrisBoard,
    currentPiece,
    nextPiece,
    score,
    clearedLines,
    level,
    didGameStart,
    isGameRunning,
    didPlayerLose,
    startNewGame,
    animationInfo,
    setAnimationInfo,
  } = useTetris();

  useEffect(() => {
    if (didGameStart) return;

    document.addEventListener('keydown', startNewGame);
    return () => document.removeEventListener('keydown', startNewGame);
  }, [startNewGame, didGameStart]);

  useEffect(() => {
    if (!didPlayerLose) return;

    document.addEventListener('keydown', startNewGame);
    return () => document.removeEventListener('keydown', startNewGame);
  }, [startNewGame, didPlayerLose]);

  return (
    <>
      {!isGameRunning && (
        <TetrisModal
          isGameRunning={isGameRunning}
          didPlayerLose={didPlayerLose}
          didGameStart={didGameStart}
        />
      )}
      <div className='wrapper'>
        <TetrisBoard
          tetrisBoard={tetrisBoard}
          currentPiece={currentPiece}
          animationInfo={animationInfo}
          setAnimationInfo={setAnimationInfo}
        />
        <LineClearText
          animationInfo={animationInfo}
          setAnimationInfo={setAnimationInfo}
        />
        <Stats
          score={score}
          lines={clearedLines}
          level={level}
          nextPieceName={nextPiece.name}
        />
      </div>
    </>
  );
}

export default App;
