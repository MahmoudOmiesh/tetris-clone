import { Modal } from './Modal';

export function TetrisModal({ didGameStart, didPlayerLose }) {
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

  return (
    <Modal>
      {didGameStart ? (didPlayerLose ? loseModal : pauseModal) : startGameModal}
    </Modal>
  );
}
