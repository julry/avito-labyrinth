import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio"
import { FlexWrapper } from "./ContentWrapper";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { Block } from "./Block";
import { useProgress } from "../../contexts/ProgressContext";

const Wrapper = styled(FlexWrapper)`
    justify-content: center;
    background-color: var(--color-purple);
    align-items: center;
`;

const Content = styled(FlexWrapper)`
    height: auto;
    padding: var(--spacing_x4) 0 calc(var(--spacing_x6) + var(--spacing_x1) / 2);
    margin-bottom: calc(var(--spacing_x2) * 2.25);
    gap: var(--spacing_x4);
    font-size: var(--font_sm);
`;

const LogoStyled = styled(Logo)`
    position: absolute;
    left: 50%;
    bottom: var(--spacing_x5);
    transform: translateX(-50%);
    width: ${({$ratio}) => $ratio * 142}px;
    height: ${({$ratio}) => $ratio * 53}px;
`;

export const InfoScreen = ({buttonText, onClick, hasLogo = true, isDisabledButton, ...props}) => {
    const { next } = useProgress();
    const ratio = useSizeRatio();

    return (
        <Wrapper {...props}>
            <Content>
                <Block>
                    {props.children}
                </Block>
                <Button onClick={() => next()} disabled={isDisabledButton}>{buttonText}</Button>
            </Content>
            {hasLogo && (
                <LogoStyled $ratio={ratio}/>
            )}
        </Wrapper>
    )
}