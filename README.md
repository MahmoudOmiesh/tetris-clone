# Tetris Clone

A clone of the classic tetris game built using **React** . The game includes scoring, level progression, animations and sound effects.

Try it out [here.](https://sage-tapioca-b51a38.netlify.app/)

<img align="left" src="https://github.com/MahmoudOmiesh/tetris-clone/blob/main/photos/gameplay.png">
<img align="right" src="https://github.com/MahmoudOmiesh/tetris-clone/blob/main/photos/pause.png">
![](https://github.com/MahmoudOmiesh/tetris-clone/blob/main/photos/controls.png)
![](https://github.com/MahmoudOmiesh/tetris-clone/blob/main/photos/lose.png)


## Key Features

- **Classic Tetris Gameplay:** Full Tetris gameplay with piece movement, rotation, and dropping.
- **Efficient:**
    - Uses `useReducer` for efficient state management
    - Users `useCallback` and `useMemo` to minimize re-renders.
- **Scoring and Levels :** Score points and progress through levels by clearing lines. 
- **Dynamic Difficulty Scaling:** The game gets harder as you progress through levels.
- **Sound Effects:** moving, rotating, dropping and clearing lines have sound effects implemented with the `use-sound` library
- **Pause and Resume:** Pause the game at any time and resume when ready.


## Project Structure

- **`App.jsx`:** The main component that manages the game state and renders
- **`useTetrisBoard`:** A custom hook that manages the tetris board state, including placing new pieces, moving and rotating pieces and line clearing.
- **`useTetris`:** A custom hook that ties together the board with game logic, including collision detection, scoring, leveling and sound effects. 
- **`useInterval`:** A utility hook for running intervals, used for the game loop.
- **`collision.js`:** A utility file used for detecting collision between cells and board or cells and other cells.
- **`movement.js`:** A utility file used for getting the coordinated of pieces after moving, rotating or dropping.
