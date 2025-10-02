import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio";

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: var(--spacing_x3);
    gap: var(--spacing_x2);
    text-align: center;

    background: #EFF3FF;
    border-radius: var(--border-radius-lg);
    padding: var(--spacing_x3);
    padding-top: ${({$hasCloseIcon}) => $hasCloseIcon ? 'var(--spacing_x6)' : 'var(--spacing_x3)'};
    color: var(--color-black);
    width: var(--content-width);
`;


export const Block = ({hasCloseIcon, onClose, children, ...props}) => {
    const ratio = useSizeRatio();

    return (
        <Wrapper {...props} $hasCloseIcon={hasCloseIcon} $ratio={ratio}>
            {children}
        </Wrapper>
    )
}