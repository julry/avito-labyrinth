import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio"
import { InfoScreen } from "../../shared/InfoScreen";

export const Advice33 = () => {
    const { next, registrateAchieve } = useProgress();
    const ratio = useSizeRatio();
    
    const handleClick = () => {
        // registrateAchieve([6]);
        next();
    }
    
    return (
        <InfoScreen buttonText={"Продолжить путь"} onClick={handleClick}>
            <p>Совет от Авито</p>
            <p>
                Придумай короткое поддерживающее напоминание и повторяй его, когда хочется промолчать из страха. Например: «Мой голос важен».{'\n\n'}
Со временем это станет внутренним противоядием против навязчивых фраз из детства. И всегда помни о том, какие ценности и интересы ты отстаиваешь.
            </p>
        </InfoScreen>
    )
}