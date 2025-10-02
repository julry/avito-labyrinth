import { SCREENS } from "../../constants/screens";
import { useProgress } from "../../contexts/ProgressContext";
import { Button } from "../shared/Button";

export const AwardsScreen = () => {
    const { next, passedWeeks } = useProgress();

    return (
        <div>
            <Button onClick={() => next(SCREENS[`LOBBY${passedWeeks?.length ?? 1}`])}>назад</Button>
        </div>
    )
};
