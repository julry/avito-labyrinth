import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio"
import { FlexWrapper } from "./ContentWrapper";
import { Logo } from "./Logo";
import { Button } from "./Button";

const Wrapper = styled(FlexWrapper)`
    justify-content: center;
`;

const Content = styled(FlexWrapper)`
    padding: var(--spacing_x4) var(--spacing_x3) calc(var(--spacing_x6) + var(--spacing_x1) / 2);
`;

const LogoStyled = styled(Logo)`
    width: ${({$ratio}) => $ratio * 142}px;
    height: ${({$ratio}) => $ratio * 53}px;
`;

export const BrightScreen = ({buttonText, onClick, hasLogo = true, isDisabledButton, ...props}) => {
    const ratio = useSizeRatio();

    return (
        <Wrapper>
            <Content {...props}>
                {hasLogo && (
                    <LogoStyled $ratio={ratio}/>
                )}
                {props.children}
                <Button onClick={onClick} disabled={isDisabledButton}>{buttonText}</Button>
            </Content>
        </Wrapper>
    )
}