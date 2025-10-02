import { useSizeRatio } from "../../../hooks/useSizeRatio"
import { InfoScreen } from "../../shared/InfoScreen";
import { useProgress } from '../../../contexts/ProgressContext';

export const EndLevel13 = () => {
    const { next } = useProgress();
    const ratio = useSizeRatio();

    const handleClick = () => {
        next();
    }

    return (
        <InfoScreen buttonText={"Вперёд"} onClick={handleClick}>
            <p>Ты вышел на новый уровень!</p>
            <p>
                «Я всего лишь стажер, лучше промолчу…» Нет! В Авито мы ценим мнение каждого вне зависимости от должности. Благодаря этому все сотрудники чувствуют себя полноценными членами команды
            </p>
        </InfoScreen>
    )
}