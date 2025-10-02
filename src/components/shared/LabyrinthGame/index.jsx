import styled from "styled-components";

import { FlexWrapper } from "../ContentWrapper";
import {useGame} from "./useGame";
import {GameController} from "./GameController";
import { CELL_SIZE, COLUMNS_SIZE, ROWS_SIZE, testLayout } from "./constants";
import { motion } from "framer-motion";
import { useSizeRatio } from "../../../hooks/useSizeRatio";

const WrapperInner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
`

const Field = styled.div`
    position: relative;
    border: 2px solid purple;
    overflow: hidden;
    border-radius: 20px;
    width: ${({$ratio}) => $ratio * CELL_SIZE * COLUMNS_SIZE}px;
    height: ${({$ratio}) => $ratio * CELL_SIZE * ROWS_SIZE}px;
`;

const Row = styled.div`
    display: flex;
`;

const Cell = styled.div`
    position: relative;
    width: ${({$ratio}) => $ratio * CELL_SIZE}px;
    height: ${({$ratio}) => $ratio * CELL_SIZE}px;

    /* &::after {
        content: '';
        position: absolute;
        top: -1px;
        left: 0px;
        width: 2px;
        height: ${({$ratio}) => $ratio * CELL_SIZE}px;
        border-radius: 20px;
        background-color: ${({$isRight}) => $isRight ? 'purple' : 'transparent'};
    }
     &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: -1px;
        width: ${({$ratio}) => $ratio * CELL_SIZE}px;
        height: 2px;
        border-radius: 20px;
        background-color: ${({$isBottom}) => $isBottom ? 'purple' : 'transparent'};
    } */
`;

const Player = styled(motion.div)`
    position: absolute;
    top: ${({$top}) => $top}px;
    left: ${({$left}) => $left}px;
    background: red;
    width: ${({$ratio}) => $ratio * CELL_SIZE}px;
    height: ${({$ratio}) => $ratio * CELL_SIZE}px;
`;

const FinalPoints = styled.div`
    position: absolute;
    top: ${({$top}) => $top}px;
    left: ${({$left}) => $left}px;
    width: ${({$ratio}) => $ratio * CELL_SIZE}px;
    height: ${({$ratio}) => $ratio * CELL_SIZE}px;
    background: gray;
`;

export function LabyrinthGame({isFirst, week, finalPosition={x: 1, y: 10}, initialPosition = {x: 6, y: 6}, maze = testLayout}) {
    const ratio = useSizeRatio();

    const isGameActive = true;
    const { movePlayer, playerPosition } = useGame({finalPosition, initialPosition, maze});

 
    return (
        <>
            <FlexWrapper>
                {/* <BackHeader onInfoClick={() => setIsRulesModal(true)} onBack={() => setIsSkipping(true)}/> */}
                <GameController
                    active={isGameActive}
                    onMoveUp={() => movePlayer('up')}
                    onMoveDown={() => movePlayer('down')}
                    onMoveLeft={() => movePlayer('left')}
                    onMoveRight={() => movePlayer('right')}
                >
                    {(ref) => (
                        <WrapperInner ref={ref} $ratio={ratio}>
                             <Field $ratio={ratio}>
                                {maze.map((row, y) => (
                                    <Row key={y}>
                                        {row.map((cell, x) => (
                                            <Cell 
                                                key={`${x}-${y}`} 
                                                $ratio={ratio}
                                                $isBottom={cell.includes?.('b')}
                                                $isRight={cell.includes?.('r')}
                                            />
                                        )
                                        )}
                                    </Row>
                                ))}
                                <Player 
                                    $ratio={ratio}
                                    $top={initialPosition.y * CELL_SIZE * ratio} 
                                    $left={initialPosition.x * CELL_SIZE * ratio}
                                    animate={{
                                        x: (playerPosition.x - initialPosition.x) * CELL_SIZE * ratio,
                                        y: (playerPosition.y - initialPosition.y) * CELL_SIZE * ratio
                                    }}
                                />
                                <FinalPoints 
                                    $ratio={ratio}
                                    $top={finalPosition.y * CELL_SIZE * ratio} 
                                    $left={finalPosition.x * CELL_SIZE * ratio}
                                />
                            </Field>
                        </WrapperInner>
                    )}
                </GameController>
            </FlexWrapper>
            
        </>
    )
}