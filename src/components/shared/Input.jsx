import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio";

const Wrapper = styled.input`
    padding: var(--spacing_x2) var(--spacing_x4);
    font-size: var(--font_sm);
    font-weight: 500;
    outline: none;
    border: 3px solid ${({$borderColor = 'blue'}) => 'var(--color-' + $borderColor + ')'};
    border-radius: var(--border-radius-xl);
    background: #ffffff;
    width: 100%;

    font-weight: 500;

    &::placeholder {
        color: rgba(0,0,0,0.3);
    }
`;

export const Input = ({isCorrect, ...props}) => {
    const ratio = useSizeRatio();

    const getBorderColor = () => {
        if (isCorrect === true) return 'green';
        if (isCorrect === false) return 'red';

        return 'blue'
    }
    return <Wrapper {...props} $ratio={ratio} $borderColor={getBorderColor()}/>
}