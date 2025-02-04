import { memo } from 'react';
import { cc } from '../utilities/helpers';

function CellComponent({ cellType, cellName, hidden, shimmer }) {
  return (
    <div
      className={cc(
        'cell',
        cellType,
        cellName,
        hidden && 'extra',
        shimmer && 'shimmer',
      )}
    ></div>
  );
}

export const Cell = memo(CellComponent);
