import styled from "styled-components";
import {useProgress, CURRENT_WEEK} from '../../../contexts/ProgressContext';
import { FlexWrapper } from "../../shared/ContentWrapper";
import bgImage from '../../../assets/images/awardsBg.svg';
import { BackHeader } from "../../shared/BackHeader";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import {UntargetedPart} from './parts/UntargetedPart';
import { TargetedPart } from "./parts/TargetedPart";
import {SCREENS} from '../../../constants/screens';
import {useEffect} from 'react';

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
    width: ${({$ratio}) => 357 * $ratio}px;
    height: ${({$ratio}) => 578 * $ratio}px;
    margin-top: ${({$ratio}) => 96 * $ratio}px;
`;

export const AwardsScreen = ({onClose}) => {
    const ratio = useSizeRatio();
    const { user, next, updateTotalPoints } = useProgress();
    
    useEffect(() => {
        updateTotalPoints().then(() => {})
    }, []);


    const handleClose = () => {
        if (typeof onClose === 'function') {
            onClose();
            return;
        }

        if (CURRENT_WEEK > 4 || user.gameProgress[12]?.isCompleted) {
            next(SCREENS.FINISH);

            return;
        }

        next(SCREENS[`LOBBY${user.currentWeek}`]);
    }

    return (
        <Wrapper>
            <BackHeader onBack={handleClose}/>
            <Content $ratio={ratio}>
                {user?.isTargeted ? <TargetedPart /> : <UntargetedPart />}
            </Content>
        </Wrapper>
    )
};
