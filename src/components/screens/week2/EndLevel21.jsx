import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio"
import { InfoScreen } from "../../shared/InfoScreen";

export const EndLevel21 = () => {
    const { next } = useProgress();
    const ratio = useSizeRatio();

    return (
        <InfoScreen buttonText={"Вперёд"} onClick={() => next()}>
            <p>Ты прошел первый этап!</p>
            <p>
                Иногда высказать свое мнение так же страшно, как пройти темный лабиринт с монстрами.
                Но в Авито мы создаем открытую среду: сотрудники свободно делятся мнениями и критикой — мы не обижаемся и знаем, что это путь к развитию.
            </p>
        </InfoScreen>
    )
}