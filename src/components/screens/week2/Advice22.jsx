import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio"
import { InfoScreen } from "../../shared/InfoScreen";
import { RedStroke1Line } from "../../shared/RedStrokes";

export const Advice22 = () => {
    const { next, registrateAchieve } = useProgress();
    const ratio = useSizeRatio();

     const handleClick = () => {
        // registrateAchieve([3]);
        next();
    }

    return (
        <InfoScreen buttonText={"Продолжить путь"} onClick={handleClick}>
            <RedStroke1Line>Совет от Авито</RedStroke1Line>
            <p>
                Как еще обрести уверенность?{'\n\n'}
                Начни с выражения мыслей там, где точно нет риска осуждения — в личном дневнике, заметках на телефоне или голосовых сообщениях самому себе.{'\n\n'}
                Так ты привыкнешь открыто высказывать мнение и слышать свой голос. После этого можно постепенно переходить к общению с доверенными людьми, которые умеют слушать
            </p>
        </InfoScreen>
    )
}