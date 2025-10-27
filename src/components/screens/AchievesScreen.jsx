import { achievements } from "../../constants/achievements";
import { useProgress } from "../../contexts/ProgressContext"
import { FlexWrapper } from "../shared/ContentWrapper";
import styled from 'styled-components';
import bgImage from '../../assets/images/achievesBg.svg';
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { BackHeader } from '../shared/BackHeader';
import { useState } from "react";
import {Block} from '../shared/Block';
import {Modal} from '../shared/modals/Modal';
import {BlueText} from '../shared/Texts';
import { NewAchieveModal } from "../shared/modals";
import { RedStroke1Line } from "../shared/RedStrokes";
import { SCREENS } from "../../constants/screens";

const Wrapper = styled(FlexWrapper)`
    position: fixed;
    inset: 0;
    background: url(${() => '"' + bgImage + '"'}) no-repeat 0 0;
    background-color: var(--color-purple);
    background-size: cover;
    z-index: 35;
`;

const Content = styled.div`
    position: relative;
    width: ${({ $ratio }) => 357 * $ratio}px;
    height: ${({ $ratio }) => 550 * $ratio}px;
    margin-top: ${({ $ratio }) => 96 * $ratio}px;
    flex-shrink: 0;
    padding: ${({ $ratio }) => 17 * $ratio}px ${({ $ratio }) => 14 * $ratio}px ${({ $ratio }) => 19 * $ratio}px;
`;

const SvgStyled = styled.div`
    position: absolute;
    inset: 0;
    z-index: 1;
`;

const ContentWrapper = styled(FlexWrapper)`
    position: relative;
    overflow-y: auto;
    z-index: 2;
`;

const Achieve = styled.div`
    display: flex;
    font-weight: 500;
    padding: ${({ $ratio }) => 5.5 * $ratio}px ${({ $ratio }) => 6 * $ratio}px;
    gap: ${({ $ratio }) => 15 * $ratio}px;
    align-items: center;
    background: ${({ $isOpened }) => $isOpened ? 'var(--color-blue)' : '#BDBDBD'};
    cursor: ${({ $isOpened }) => $isOpened ? 'pointer' : 'auto'};
    color: #ffffff;
    width: 100%;
    border-radius: var(--border-radius-md);

    & + & {
        margin-top: var(--spacing_x2);
    }
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ $ratio }) => 39 * $ratio}px;
    height: ${({ $ratio }) => 39 * $ratio}px;
    background: #ffffff;
    border-radius: ${({ $ratio }) => 11 * $ratio}px;

    & svg {
        width: ${({ $ratio }) => 24 * $ratio}px;
        height: ${({ $ratio }) => 24 * $ratio}px;
    }
`;


const BlockStyled = styled(Block)`
    margin: 0 auto;
    max-width:  ${({ $ratio }) => $ratio * 334}px;

    & > div {
        gap: 0;
        padding: ${({ $ratio }) => $ratio * 14}px  ${({ $ratio }) => $ratio * 17}px var(--spacing_x5);
    }
`;

const SvgWrapper = styled.div`
    width: ${({ $ratio }) => $ratio * 82}px;
    height: ${({ $ratio }) => $ratio * 82}px;

    & svg {
        width: ${({ $ratio }) => $ratio * 74}px;
        height: ${({ $ratio }) => $ratio * 74}px;
    }
`;

const AchieveTextStyled = styled.p`
    margin-top: ${({ $ratio }) => $ratio * 18}px;
    font-weight: 500;
`;

const AchieveDescStyled = styled.p`
    margin-top: ${({ $ratio }) => $ratio * 6}px;
`;

const BlockFirst = styled(Block)`
    margin-top: var(--spacing_x7);
    & > div {
        padding: var(--spacing_x4) var(--spacing_x5) var(--spacing_x4);
    }
`;

export const AchievesScreen = ({ onClose, initialShown, isFirst }) => {
    const ratio = useSizeRatio();
    const [shownAchieve, setShownAchieve] = useState(initialShown);
    const [shownFirstAchieve, setShownFirstAchieve] = useState(isFirst ? achievements[0] : null);
    const { user, next } = useProgress();
    const achieves = [...new Set(user.achieves ?? [])];
    
    const handleOpenAchieve = (achieve, isOpen) => {
        if (!isOpen) return;

        setShownAchieve(achieve);
    }

    const handleClose = () => {
        if (typeof onClose === 'function') {
            onClose();
            return;
        }

        next(SCREENS[`LOBBY${user.currentWeek}`]);
    }

    const getAchieve = (isOpen, achieve) => (
        <Achieve $ratio={ratio} key={`achieve_${achieve.id}`} $isOpened={isOpen} onClick={() => handleOpenAchieve(achieve, isOpen)}>
            <IconWrapper $ratio={ratio}>
                {isOpen ? (achieve.icon()) : (
                    <>
                        <svg viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.1953 16.5606H15.0531V21.5H10.1953V16.5606ZM12.9002 2.5C13.8938 2.5 14.7679 2.64968 15.5223 2.94904C16.2767 3.22969 16.9115 3.61325 17.4268 4.09971C17.942 4.56746 18.3284 5.11004 18.586 5.72747C18.862 6.32619 19 6.93427 19 7.5517C19 8.16913 18.9264 8.71172 18.7792 9.17947C18.6504 9.62851 18.448 10.0401 18.172 10.4143C17.896 10.7885 17.5372 11.1627 17.0955 11.5369C16.6723 11.8924 16.1755 12.2947 15.6051 12.7437C15.2923 12.9682 15.0531 13.2021 14.8875 13.4453C14.7403 13.6886 14.6667 14.0441 14.6667 14.5118V15.1292H10.6369V14.5118C10.6369 13.9505 10.6921 13.4547 10.8025 13.0244C10.9314 12.594 11.1062 12.2011 11.327 11.8456C11.5662 11.4714 11.8514 11.1253 12.1826 10.8072C12.5322 10.4705 12.937 10.1056 13.397 9.7127C13.8754 9.30108 14.2527 8.98301 14.5287 8.75849C14.8047 8.51526 14.9427 8.18784 14.9427 7.77622C14.9427 7.40202 14.7863 7.07459 14.4735 6.79394C14.1607 6.49458 13.6638 6.3449 12.983 6.3449C12.2838 6.3449 11.6858 6.52265 11.189 6.87814C10.7105 7.21492 10.3977 7.66396 10.2505 8.22526H6C6.1288 7.40202 6.39561 6.64426 6.80042 5.95199C7.20524 5.24102 7.70205 4.63294 8.29087 4.12777C8.89809 3.6226 9.58811 3.22969 10.3609 2.94904C11.1522 2.64968 11.9986 2.5 12.9002 2.5Z" fill="#BDBDBD" />
                        </svg>

                    </>
                )}
            </IconWrapper>
            {isOpen ? (
                <p>{achieve?.title}</p>
            ) : (
                <p>Достижение не открыто</p>
            )}
        </Achieve>
    );

    return (
        <Wrapper>
            <BackHeader onBack={handleClose} />
            <Content $ratio={ratio}>
                <SvgStyled>
                    <svg width="100%" height="100%" viewBox="0 0 357 550" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M61.9172 549.586C17.7725 549.586 8.13271 529.524 6.83805 519.392C-6.44626 415.436 4.18163 272.516 1.62696 258.861C-0.927711 245.205 1.62696 75.1353 1.62696 32.4075C1.62696 -10.3203 61.9172 1.01135 90.0185 2.33282C118.12 3.6543 289.311 -0.75061 321.5 2.33282C359.93 6.01416 356.073 37.9178 353.078 68.4299C350.543 94.2625 353.078 244.546 353.078 276.854C353.078 321.118 363.315 491.304 350.71 528.847C348.69 534.863 343.399 539.139 334.241 541.142C280.773 552.833 109.029 549.586 61.9172 549.586Z" fill="white" />
                    </svg>
                </SvgStyled>
                <ContentWrapper>
                    {achievements.map((achieve) => (
                        getAchieve(achieves.includes(achieve.id), achieve)
                    ))}
                </ContentWrapper>
            </Content>
             <Modal isOpen={shownAchieve !== undefined} $ratio={ratio} onClick={() => setShownAchieve()}>
                <BlockStyled $ratio={ratio} onClick={e => e.stopPropagation()}>
                    <SvgWrapper $ratio={ratio}>{shownAchieve?.icon?.()}</SvgWrapper>
                    <BlueText $ratio={ratio}>{shownAchieve?.title}</BlueText>
                    <AchieveTextStyled $ratio={ratio}>{shownAchieve?.text}</AchieveTextStyled>
                    <AchieveDescStyled $ratio={ratio}>{shownAchieve?.desc}</AchieveDescStyled>
                </BlockStyled>
            </Modal>
            <NewAchieveModal isOpen={shownFirstAchieve} onClose={() => setShownFirstAchieve()} achieveId={0}>
                    <BlockFirst>
                        <RedStroke1Line $ratio={ratio}>Это твое первое достижение</RedStroke1Line>
                        <p>{shownFirstAchieve?.desc}</p>
                    </BlockFirst>
            </NewAchieveModal>
        </Wrapper>
    )
}