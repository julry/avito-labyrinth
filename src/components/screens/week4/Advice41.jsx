import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio"
import { InfoScreen } from "../../shared/InfoScreen";

export const Advice41 = () => {
    const { next } = useProgress();
    const ratio = useSizeRatio();

    return (
        <InfoScreen buttonText={"Продолжить путь"} onClick={() => next()}>
            <p>Совет от Авито</p>
            <p>
                Чтобы меньше переживать, используй эту технику заземления.{'\n'}
                Плотно поставь стопы на пол — слегка напряги и расслабь ноги, плечи, чтобы стряхнуть напряжение — сосредоточь внимание на ощущении устойчивости.
            </p>
        </InfoScreen>
    )
}