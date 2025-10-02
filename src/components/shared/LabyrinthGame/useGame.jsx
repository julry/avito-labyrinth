import { useState } from "react";
import { COLUMNS_SIZE, ROWS_SIZE } from "./constants";

export const useGame = ({onEndGame, initialPosition, maze, finalPosition}) => {
    const [playerPosition, setPlayerPosition] = useState(initialPosition);
    const [isFinished, setIsFinished] = useState(false);

    const movePlayer = (direction) => {
            if (isFinished) return;

            let canMove = true;
            let newX = playerPosition.x;
            let newY = playerPosition.y;

            switch(direction) {
                case 'up':
                    newY--;
                    if (newY < 0 || maze[newY][newX].includes('b')) {
                        canMove = false;
                    }
                    break;
                case 'down':
                    if (newY >= (ROWS_SIZE - 1) || maze[newY][newX].includes('b')) {
                        canMove = false;
                    }
                    newY++;
                    break;
                case 'left':
                    newX--;
                    if (newX < 0 || maze[newY][newX].includes('r')) {
                        canMove = false;
                    }
                    break;
                case 'right':
                    if (newX >= (COLUMNS_SIZE - 1) || maze[newY][newX].includes('r')) {
                        canMove = false;
                    }
                    newX++;
                    break;
                default:
                    return;
            }

            if (canMove) {
                changePosition(newX, newY);
            }
    };

    const changePosition = (newX, newY) => {
        setPlayerPosition({ x: newX, y: newY });

        if (newX === finalPosition.x && newY === finalPosition.y) {
            setIsFinished(true);
            onEndGame?.();
        }
    };

    const restartGame = () => {
        setPlayerPosition(initialPosition);
        setIsFinished(false);
    };

    return { movePlayer, playerPosition, restartGame }
}