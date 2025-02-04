import { Modal } from './Modal';
import { CONTROLS } from '../utilities/config';

const keyMappings = {
  ArrowLeft: '←',
  ArrowRight: '→',
  ArrowUp: '↑',
  ArrowDown: '↓',
  ' ': 'Space',
  Escape: 'Esc',
};

export function TetrisModal({ didGameStart, didPlayerLose, areControlsShown }) {
  const startGameModal = (
    <>
      <h1 className='modal-title'>Tetris</h1>
      <p className='modal-subtitle flash'>Press Any Key To Start.</p>
    </>
  );

  const pauseModal = (
    <>
      <h1 className='modal-title'>Game Paused</h1>
      <p className='modal-subtitle flash'>Press Esc. To Resume.</p>
    </>
  );

  const loseModal = (
    <>
      <h1 className='modal-title danger'>You Lost</h1>
      <p className='modal-subtitle flash'>Press Any Key To Restart</p>
    </>
  );

  const controlsModal = (
    <ul className='controls-list'>
      {Object.entries(CONTROLS).map(([control, keys]) => {
        return (
          <li key={control}>
            <p>{control.split('_').join(' ')}</p>
            <div className='keys'>
              {keys.map((key) => (
                <div className='key' key={key}>
                  {keyMappings[key] || key}
                </div>
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <Modal>
      {areControlsShown
        ? controlsModal
        : didGameStart
          ? didPlayerLose
            ? loseModal
            : pauseModal
          : startGameModal}
    </Modal>
  );
}
