import { useState } from "react"
import { Lobby } from "./Lobby";
import { CommonModal, LetterModal } from "../shared/modals";
import { useProgress } from "../../contexts/ProgressContext";
import { IconButton } from "../shared/Button";
import styled from "styled-components";

const IconButtonStyled = styled(IconButton)`
    position: absolute;
    left: var(--spacing_x6);
    top: var(--spacing_x8);
    z-index: 1001;
    user-select: none;
`;

const CommonModalStyled = styled(CommonModal)`
    background: 'rgba(36, 38, 50, 0.4)';
    backdrop-filter: blur(3px);

    @supports not (backdrop-filter: blur(3px)) {
        background: 'rgba(36, 38, 50, 0.7)';
    }
`

export const IntroRules = () => {
    const [part, setPart] = useState(0);
    const { user, next, updateUser, setNewAchieve } = useProgress();

    const getText = () => {
        if (part === 0) return (
            <>
            </>
            
        )
        if (part === 1) return (
            <>
            </>
        )

        if (part === 2) return (
            <>
            </>
        )

        if (part === 3) {
            return (
               <>
               </>
            )
        }
    };

    const handleNext = () => {
        setPart(prev => prev + 1);
    };

    const handleFinish = () => {
        handleNext();
    }

    const handleClose = () => {
        // updateUser({ 
        //     seenStartInfo: true, 
        //     readenLetters: {...user.readenLetters, week1: true}, 
        //     achieves: [...user.achieves, 0],
        //     points: (user?.points ?? 0) + 5,
        //     week1Points: (user?.week1Points ?? 0) + 5
        // });
        // setNewAchieve(prev => [...prev, 0]);
        next();
    };

    return (
        <div>
            <Lobby week={1} isDisabled/>
        </div>
    );
};
