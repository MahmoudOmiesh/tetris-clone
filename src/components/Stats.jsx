import { memo } from 'react';
import { cc } from '../utilities/helpers';

export function StatsComponent({ nextPieceName, score, lines, level }) {
  return (
    <div className='column'>
      <div className='next clipped-border'>
        <h1>NEXT</h1>
        <div className='nextpiece' data-piece-name={nextPieceName}>
          <div className={cc('cell', 'piece', nextPieceName)}></div>
          <div className={cc('cell', 'piece', nextPieceName)}></div>
          <div className={cc('cell', 'piece', nextPieceName)}></div>
          <div className={cc('cell', 'piece', nextPieceName)}></div>
        </div>
      </div>
      <ul className='stats clipped-border'>
        <li>
          <h1 className='stat'>level</h1>
          <p className='stat-value'>{level}</p>
        </li>
        <li>
          <h1 className='stat'>lines</h1>
          <p className='stat-value'>{lines}</p>
        </li>
        <li>
          <h1 className='stat'>score</h1>
          <p className='stat-value'>{score}</p>
        </li>
      </ul>
    </div>
  );
}

export const Stats = memo(StatsComponent);
