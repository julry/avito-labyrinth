import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio"
import { InfoScreen } from "../../shared/InfoScreen";

export const EndLevel22 = () => {
    const { next } = useProgress();
    const ratio = useSizeRatio();

    const handleClick = () => {
        next();
    }

    return (
        <InfoScreen buttonText={"Вперёд"} onClick={handleClick}>
            <p>Второй этап пройден!</p>
            <p>
                Мы знаем, как волнительно и потеряно можно почувствовать себя в новом коллективе.{'\n\n'}
                Не переживай: в Авито у каждого новичка есть наставник, который поможет адаптироваться и смело общаться с коллегами
            </p>
        </InfoScreen>
    )
}