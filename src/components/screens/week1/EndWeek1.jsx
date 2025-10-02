import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio"
import { BrightScreen } from "../../shared/BrightScreen";

export const EndWeek1 = () => {
    const { CURRENT_WEEK } = useProgress();
    const ratio = useSizeRatio();

    return (
        <BrightScreen>
            <p>Первый этап путешествия подошел к концу! </p>
            {CURRENT_WEEK > 1 ? (
                <p>Текст про продолжение</p>
            ): (
                <p>Возвращайся на следующей неделе — мы расскажем про отношение Авито к уникальности и инклюзивности, поделимся полезными советами и объявим результаты розыгрыша</p>
            )}
        </BrightScreen>
    )
}