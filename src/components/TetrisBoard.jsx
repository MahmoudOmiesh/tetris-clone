import { GRID_COLUMNS, GRID_EXTRA_ROWS, GRID_ROWS } from '../utilities/config';
import { cc } from '../utilities/helpers';
import { Cell } from './Cell';

function getTetrisBoardStyles() {
  return {
    '--extra-rows': GRID_EXTRA_ROWS,
    gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`,
    gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
    aspectRatio: `${GRID_COLUMNS} / ${GRID_ROWS}`,
  };
}

export function TetrisBoard({ tetrisBoard, animationInfo, setAnimationInfo }) {
  return (
    <div
      className={cc('tetris-grid', animationInfo.bounce && 'bounce')}
      style={getTetrisBoardStyles()}
      onAnimationEnd={() =>
        setAnimationInfo((prevInfo) => ({ ...prevInfo, bounce: false }))
      }
    >
      {tetrisBoard.map((row, r) =>
        row.map((cellInfo, c) => (
          <Cell
            cellType={cellInfo.type}
            cellName={cellInfo.name}
            hidden={cellInfo.type === 'blank' && r < GRID_EXTRA_ROWS}
            shimmer={
              animationInfo.shimmerCoords?.some(
                ({ r: _r, c: _c }) => r === _r && c === _c,
              ) || false
            }
            key={`${r}${c}`}
          />
        )),
      )}
    </div>
  );
}
