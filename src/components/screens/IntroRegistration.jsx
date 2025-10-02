import { useState } from "react";
import { useProgress } from "../../contexts/ProgressContext";
import { BrightScreen } from "../shared/BrightScreen";


export const IntroRegistration = () => {
    const [stage, setStage] = useState(0);
    const { next } = useProgress();

    const handleClick = () => {
        if (stage < 2) {
            setStage(prev => prev + 1);

            return;
        }
        next();
    }

    const STAGE_TO_BTN_TEXT = {
        0: 'Готов',
        1: 'В путь!',
        2: 'Далее'
    }

    const getContent = () => {};

    return (
        <BrightScreen buttonText={STAGE_TO_BTN_TEXT[stage]} onClick={handleClick}>
            {getContent}
        </BrightScreen>
    )
};
