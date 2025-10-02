import styled from "styled-components";
import { FlexWrapper } from "../shared/ContentWrapper";

const Wrapper = styled(FlexWrapper)`
    padding-top: var(--spacing_x8);
`;

export const WaitingGameScreen = () => {
    return (
        <Wrapper>
            <div>
                <p>
                    <b>Ты успешно зарегистрировался!</b>
                </p>
                <p>
                    Скоро старт игры — следи за уведомлениями в <Bold>TG-боте</Bold>.
                </p>
            </div>
        </Wrapper>
    )
};
