import styled from "styled-components";

import { FlexWrapper } from "../ContentWrapper";
import {useGame} from "./useGame";
import {GameController} from "./GameController";
import { motion } from "framer-motion";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { BackHeader } from "../BackHeader";
import { useState } from "react";
import { SkipModal } from "../modals";
import { useProgress } from "../../../contexts/ProgressContext";
import { SCREENS } from "../../../constants/screens";

import week1GameBg from '../../../assets/images/week1GameBg.svg';
import week2GameBg from '../../../assets/images/week2GameBg.svg';
import week3GameBg from '../../../assets/images/week3GameBg.svg';

//TODO: добавить 4

const WEEK_TO_BG = {
    1: week1GameBg,
    2: week2GameBg,
    3: week3GameBg,
};

const Wrapper = styled(FlexWrapper)`
    background-color: var(--color-purple);
    background-image: url(${({$bg}) => $bg});
    background-size: cover;
    background-repeat: no-repeat;
`;

const WrapperInner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: ${({$boardSize}) => $boardSize.width}px;
    height: ${({$boardSize}) => $boardSize.height}px;
    margin-top: calc( var(--spacing_x7) + var(--spacing_x4) + 4 * var(--spacing_x3));
`;

const Field = styled(FlexWrapper)`
    position: relative;
    border-radius: 20px;
    width: 100%;
    height: 100%;
`;

const BoardBg = styled.div`
    position: absolute;
    left: 50%;
    top: calc(50% - var(--spacing_x1));
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    z-index: 1;
`;

const Row = styled.div`
    display: flex;
    position: relative;
    z-index: 6;
    text-align: center;
`;

const Cell = styled.div`
    position: relative;
    z-index: 3;
    width: ${({$cellWidth}) => $cellWidth}px;
    height: ${({$cellHeight}) => $cellHeight}px;
`;

const Player = styled(motion.div)`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: ${({$top}) => $top}px;
    left: ${({$left}) => $left}px;
    width: ${({$cellWidth}) => $cellWidth}px;
    height: ${({$cellHeight}) => $cellHeight}px;
    transition: transform 100ms;
    z-index: 13;

    & svg {
        width: ${({$ratio}) => $ratio * 28}px;
        height: ${({$ratio}) => $ratio * 27}px;
    }
`;

const FinalPoints = styled.div`
    position: absolute;
    top: ${({$top}) => $top}px;
    left: ${({$left}) => $left}px;
    width: ${({$cellWidth}) => $cellWidth}px;
    height: ${({$cellHeight}) => $cellHeight}px;
    z-index: 12;
`;

export function LabyrinthGame({
        isFirst, 
        week, 
        boardSize,
        boardSvg,
        finalPosition={x: 1, y: 10}, 
        initialPosition = {x: 6, y: 6}, 
        maze,
        cellHeight,
        cellWidth,
        finalSvg,
        level,
        achieve
}) {
    const ratio = useSizeRatio();
    const { next, endGame } = useProgress();
    const [isSkipping, setIsSkipping] = useState(false);

    const handleEndGame = () => {
        // endGame({week, level, achieve});
        next();
    }

    const { movePlayer, playerPosition } = useGame({finalPosition, initialPosition, maze, onEndGame: handleEndGame});

    return (
        <>
            <Wrapper $bg={`${WEEK_TO_BG[week]}`}>
                <BackHeader onBack={() => setIsSkipping(true)}/>
                <GameController
                    active={!isSkipping}
                    onMoveUp={() => movePlayer('up')}
                    onMoveDown={() => movePlayer('down')}
                    onMoveLeft={() => movePlayer('left')}
                    onMoveRight={() => movePlayer('right')}
                >
                    {(ref) => (
                        <WrapperInner ref={ref} $ratio={ratio} $boardSize={boardSize}>
                             <Field $ratio={ratio}>
                                <BoardBg $ratio={ratio}>
                                    {boardSvg}
                                </BoardBg>
                                {maze.map((row, y) => (
                                    <Row key={y}>
                                        {row.map((cell, x) => (
                                            <Cell 
                                                key={`${x}-${y}`} 
                                                $ratio={ratio}
                                                $cellHeight={cellHeight}
                                                $cellWidth={cellWidth}
                                                $isBottom={cell.includes?.('b')}
                                                $isRight={cell.includes?.('r')}
                                            >
                                                {/* {cell} */}
                                            </Cell>
                                        )
                                        )}
                                    </Row>
                                ))}
                                <Player 
                                    $ratio={ratio}
                                    $top={initialPosition.y * cellHeight} 
                                    $left={initialPosition.x * cellWidth}
                                    $cellHeight={cellHeight}
                                    $cellWidth={cellWidth}
                                    style={{transform: `translate(${(playerPosition.x - initialPosition.x) * cellWidth}px, ${(playerPosition.y - initialPosition.y) * cellHeight}px)`}}
                                >
                                    <svg viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <ellipse cx="14.022" cy="13.6879" rx="11.8531" ry="11.5045" fill="white"/>
                                        <path d="M7.32661 24.4751C7.26698 24.4204 7.15251 24.4252 7.09288 24.3704C7.02118 24.0296 6.78746 23.9249 6.50375 23.9942C6.47721 23.365 6.07904 23.4391 5.67847 23.456C5.5592 23.3465 5.49956 23.2917 5.38029 23.1821C5.36823 22.8961 5.24414 22.6722 4.89838 22.6295C4.59296 22.184 4.06347 21.8625 3.81286 21.3574C4.09175 21.1738 4.311 20.9354 4.07245 20.7162C3.53331 20.166 4.10313 20.0847 4.37961 19.8439C4.65608 19.603 4.9567 19.9341 5.29763 19.8624C5.73197 20.6462 6.55483 21.1272 7.20842 21.6726C9.34569 23.416 11.7329 24.2893 14.4821 24.2307C15.3977 24.192 16.4374 24.3774 17.2764 23.8836C18.5612 23.0846 20.0298 22.5643 21.1881 21.4841C23.6715 19.2021 24.8719 16.4013 24.732 13.084C24.5728 9.30924 22.5638 6.52922 19.3844 4.54336C18.6785 4.11477 18.0893 3.73856 18.0507 2.82346C19.2211 2.02925 20.3156 2.15498 21.5535 2.96221C24.616 4.8957 26.4509 7.62578 27.1727 11.1477C27.9662 15.0103 27.0236 18.4878 24.6288 21.5109C23.3777 23.1107 21.6496 24.2721 19.7329 25.0405C17.647 25.8733 15.5369 26.1342 13.36 26.1687C12.7732 25.8497 12.1769 25.3019 11.3999 25.9076C11.2258 25.8577 11.0541 25.8649 10.8228 25.8174C10.3981 25.2623 9.871 24.9981 9.18671 25.0842C8.95782 25.0939 8.78616 25.1011 8.55967 25.1679C8.35905 24.4889 7.89886 24.451 7.32661 24.4751Z" fill="#FF4052"/>
                                        <path d="M1.19945 16.483C0.346985 13.9406 0.64386 11.4644 1.51537 9.0212C2.23692 7.10001 3.42831 5.44546 4.92031 4.12203C6.02621 3.15866 7.24894 2.24766 8.78436 1.95372C9.6379 1.80313 10.365 1.37143 11.2161 1.16364C13.0876 0.683647 14.8236 1.06881 16.6169 1.45155C17.368 1.59176 17.7903 2.0896 17.8813 2.8879C16.2194 2.90069 14.4954 2.80149 12.8383 2.92867C9.75543 3.23057 7.29786 4.76662 5.39389 7.19604C4.57894 8.26173 4.11216 9.42736 3.53093 10.5978C2.63464 11.094 2.64189 11.2655 3.34788 11.6941C3.41717 11.9776 3.37199 12.266 3.15515 12.5616C2.88833 13.0313 2.3902 13.4533 3.04137 13.9415C3.22752 14.2775 3.30162 14.6754 3.14441 15.0258C2.56976 14.9928 2.35532 15.3456 2.20053 15.7532C2.16743 16.3275 1.7741 16.516 1.19945 16.483Z" fill="#FF4052"/>
                                        <path d="M1.19979 16.4829C1.71722 16.5184 2.11055 16.3299 2.31533 15.7483C2.46771 15.2835 2.68214 14.9307 3.25921 15.0209C3.78937 16.7174 4.48636 18.2923 5.24059 19.8648C4.95688 19.9341 4.59908 19.6054 4.3226 19.8462C4.10094 20.0275 3.47631 20.1684 4.01545 20.7186C4.254 20.9377 3.97993 21.2358 3.75586 21.3598C2.88302 21.0528 2.61551 20.1474 2.18599 19.4779C1.57756 18.6442 1.1908 17.6292 1.19979 16.4829Z" fill="#FF4052"/>
                                        <path d="M11.23 25.972C11.9498 25.3687 12.5462 25.9165 13.1901 26.2331C12.5179 26.6053 11.8739 26.2886 11.23 25.972Z" fill="#FF4052"/>
                                        <path d="M9.07257 25.0891C9.75685 25.0029 10.2839 25.2672 10.7086 25.8222C10.0767 25.7916 9.44486 25.7609 9.07257 25.0891Z" fill="#FF4052"/>
                                        <path d="M7.32671 24.4751C7.89655 24.3937 8.35917 24.4888 8.50256 25.1703C7.93031 25.1944 7.57491 24.923 7.32671 24.4751Z" fill="#FF4052"/>
                                        <path d="M5.62109 23.4585C6.02167 23.4416 6.47948 23.4223 6.44637 23.9966C6.10061 23.9539 5.75484 23.9112 5.62109 23.4585Z" fill="#FF4052"/>
                                        <path d="M6.44688 23.9966C6.78782 23.9249 6.96431 24.032 7.03601 24.3728C6.69749 24.5017 6.51858 24.3373 6.44688 23.9966Z" fill="#FF4052"/>
                                        <path d="M4.84375 22.689C5.18951 22.7317 5.31119 22.8985 5.32566 23.2417C5.03712 23.1965 4.85581 22.975 4.84375 22.689Z" fill="#FF4052"/>
                                        <path d="M3.64515 10.5929C3.66203 10.9932 3.73613 11.3911 3.46206 11.6892C2.75607 11.2606 2.74885 11.089 3.64515 10.5929Z" fill="#FF4052"/>
                                        <path d="M3.26974 12.5568C3.51793 13.0047 3.25111 13.4743 3.15596 13.9367C2.50478 13.4485 3.00291 13.0264 3.26974 12.5568Z" fill="#FF4052"/>
                                        <path d="M12.8889 19.084C13.6684 18.5354 13.4105 17.8588 13.5605 17.3368C13.7128 16.872 13.7484 16.3548 14.3206 16.3306C14.9501 16.3041 15.582 16.3348 16.1163 16.7706C16.2355 16.8801 16.3024 17.1065 16.3097 17.2781C16.079 18.6056 15.8508 19.9903 15.0382 21.1132C14.6046 21.7045 14.1564 21.9525 13.2932 21.8743C11.2163 21.5609 10.8608 21.2894 10.4879 19.2425C10.4017 18.5586 10.0891 17.9415 10.1173 17.2528C10.1456 16.564 10.4197 16.266 11.104 16.1798C11.5618 16.1605 11.8527 16.2628 11.9889 16.7727C12.1895 17.4518 12.5642 18.1809 12.8889 19.084Z" fill="#FF4052"/>
                                        <path d="M19.5059 14.2213C18.4186 14.2671 17.9391 13.7717 17.8908 12.6278C17.8498 11.6555 18.6293 11.107 20.1743 11.0418C21.0899 11.0032 21.7459 11.6057 21.7273 12.5233C21.6539 13.5004 20.8244 14.2229 19.5059 14.2213Z" fill="#FF4052"/>
                                        <path d="M6.86925 10.9153C7.66557 10.7671 8.36433 11.0242 8.91553 11.8604C9.283 12.4178 9.07099 12.8278 8.80175 13.2403C8.53493 13.7099 6.71821 14.1303 6.25077 13.9208C5.66888 13.7162 5.28935 12.8727 5.30798 11.9552C5.44347 11.0901 5.61031 10.9684 6.86925 10.9153Z" fill="#FF4052"/>
                                    </svg>
                                </Player>
                                <FinalPoints 
                                    $ratio={ratio}
                                    $top={finalPosition.y * cellHeight} 
                                    $left={finalPosition.x * cellWidth}
                                    $cellHeight={cellHeight}
                                    $cellWidth={cellWidth}
                                >
                                    {finalSvg}
                                </FinalPoints>
                            </Field>
                        </WrapperInner>
                    )}
                </GameController>
            </Wrapper>
            <SkipModal isOpen={isSkipping} onClose={() => setIsSkipping(false)} onExit={() => next(SCREENS[`LOBBY${week}`])} />
        </>
    )
}