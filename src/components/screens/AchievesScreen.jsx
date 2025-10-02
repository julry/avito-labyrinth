import { achievements } from "../../constants/achievements";
import { useProgress } from "../../contexts/ProgressContext"
import { FlexWrapper } from "../shared/ContentWrapper";

export const AchievesScreen = () => {
    const { user } = useProgress();
    const achieves = [...new Set(user.achieves ?? [])];

    return (
        <FlexWrapper>
            {achieves.map((index) => (
                <div key={`achieve_${index}`}>
                    {achievements.find(({id}) => id === +index)}
                </div>
            ))}
        </FlexWrapper>
    )
}