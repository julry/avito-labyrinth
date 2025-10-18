import { useRef, useState } from "react";

export const useGame = ({onEndGame, initialPosition, maze, finalPosition}) => {
    const [playerPosition, setPlayerPosition] = useState(initialPosition);
    const [isFinished, setIsFinished] = useState(false);

    const isCurrentMoving = useRef(false);

    const isJunction = (x, y) => {
        let paths = 0;
    
        if (y - 1 > 0 && !maze[y - 1]?.[x].includes('b')) paths++; // Вверх
        if (y < maze.length - 1 && !maze[y][x].includes('b')) paths++; // Вниз
        if (x - 1 > 0 && !maze[y][x - 1].includes('r')) paths++; // Влево
        if (x < maze[0].length - 1 && !maze[y][x].includes('r')) paths++; // Вправо
        
        // Развилка - когда есть более 2 путей (включая тот, откуда пришли)
        return paths > 2;
    };

    const canMove = (x, y, dir) => {
        switch(dir) {
            case 'up':
                return y - 1 >= 0 && !maze[y - 1]?.[x].includes('b');
            case 'down':
                return y < maze.length - 1 && !maze[y][x].includes('b');
            case 'left':
                return x - 1 >= 0 && !maze[y][x - 1].includes('r');
            case 'right':
                return x < maze[0].length - 1 && !maze[y][x].includes('r')
            default:
                return false;
        }
    }

    const findAlternativeDirection = (x, y, blockedDirection) => {
        // Исключаем текущее направление (тупик) и противоположное направление
        const oppositeDirections = {
            'up': 'down',
            'down': 'up', 
            'left': 'right',
            'right': 'left'
        };
        
        // Пробуем направления в приоритетном порядке: вверх/вниз для горизонтальных стен, влево/вправо для вертикальных
        let priorityDirections = [];
        
        if (blockedDirection === 'left' || blockedDirection === 'right') {
            // Если уперлись в вертикальную стену, пробуем сначала вверх, потом вниз
            priorityDirections = ['up', 'down', 'left', 'right'];
        } else {
            // Если уперлись в горизонтальную стену, пробуем сначала влево, потом вправо
            priorityDirections = ['left', 'right', 'up', 'down'];
        }

            // Убираем заблокированное и противоположное направления
        const availableDirections = priorityDirections.filter(dir => 
            dir !== blockedDirection && 
            dir !== oppositeDirections[blockedDirection] && 
            canMove(x, y, dir)
        );
        
        return availableDirections.length > 0 ? availableDirections[0] : null;
    }
    const asyncChangePosition = (x, y) => {
        return new Promise((resolve) => {
            changePosition(x, y);
            // Предполагаем, что changePosition завершает анимацию за 100мс
            // Если у вас есть callback на завершение анимации, используйте его вместо setTimeout
            setTimeout(resolve, 100);
        });
    };

    const movePlayer = async (direction) => {
            if (isFinished || isCurrentMoving.current) return;

            let tries = 0;
            let isMoving = true;
            let newX = playerPosition.x;
            let newY = playerPosition.y;
            let currentDirection = direction;

            while(true) {
                if (newX === finalPosition.x && newY === finalPosition.y) {
                        setTimeout(() => onEndGame?.(), 150);
                        isCurrentMoving.current = false;
                     break;
                }

                isCurrentMoving.current = true;

                switch(currentDirection) {
                    case 'up':
                        if (canMove(newX, newY, 'up')) {
                            newY--;
                        } else isMoving = false;
                        // newY--;
                        // if (newY < 0 || maze[newY][newX].includes('b')) {
                        //     canMove = false;
                        // }
                        break;
                    case 'down':
                        if (canMove(newX, newY, 'down')) {
                            newY++;
                        } else isMoving = false;
                        // if (newY >= (maze.length - 1) || maze[newY][newX].includes('b')) {
                        //     canMove = false;
                        // }
                        // newY++;
                        break;
                    case 'left':
                        if (canMove(newX, newY, 'left')) {
                            newX--;
                        } else isMoving = false;
                        // newX--;
                        // if (newX < 0 || maze[newY][newX].includes('r')) {
                        //     canMove = false;
                        // }
                        break;
                    case 'right':
                        if (canMove(newX, newY, 'right')) {
                            newX++;
                        } else isMoving = false;
                        // if (newX >= (maze[0].length - 1) || maze[newY][newX].includes('r')) {
                        //     canMove = false;
                        // }
                        // newX++;
                        break;
                    default:
                        return;
                }

                if (isMoving) {
                    tries++;
                    await asyncChangePosition(newX, newY);
                    // if (maze[newX][newY].includes('exit')) break;
                } else if (tries > 0) {
                    const alternativeDirection = findAlternativeDirection(newX, newY, currentDirection);
                    if (alternativeDirection) {
                        // Меняем направление и продолжаем движение
                        currentDirection = alternativeDirection;
                        isMoving = true;
                       
                        continue; // Пробуем снова с новым направлением
                    } else {
                        // Нет доступных направлений - полный тупик, выходим
                        isCurrentMoving.current = false;
                        break;
                    }
                } else {
                    isCurrentMoving.current = false;
                    break;
                }

                if (isJunction(newX, newY)) {
                    isCurrentMoving.current = false;
                    break;
                }
            }
    };

    const changePosition = (newX, newY) => {
        setPlayerPosition({ x: newX, y: newY });

        if (newX === finalPosition.x && newY === finalPosition.y) {
            setIsFinished(true);
            setTimeout(() => onEndGame?.(), 150);
        }
    };

    const restartGame = () => {
        setPlayerPosition(initialPosition);
        setIsFinished(false);
    };

    return { movePlayer, playerPosition, restartGame }
}