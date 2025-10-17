import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Button } from "../../shared/Button";
import { FlexWrapper } from "../../shared/ContentWrapper";
import bgImage from '../../../assets/images/awardsBg.svg';
import { BackHeader } from "../../shared/BackHeader";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { AnimatePresence, motion } from "framer-motion";
import {UntargetedPart} from './parts/UntargetedPart';
import { TargetedPart } from "./parts/TargetedPart";
import {SCREENS} from '../../../constants/screens';

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
    const { user, lastWeek, next } = useProgress();

    const handleClose = () => {
        if (typeof onClose === 'function') {
            onClose();
            return;
        }

        next(SCREENS[`LOBBY${lastWeek}`]);
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
