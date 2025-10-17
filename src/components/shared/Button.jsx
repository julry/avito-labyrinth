import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio";

const Wrapper = styled.button`
    background: ${({$type}) => 'var(--btn-bg-' + $type + ')'};
    color: ${({$type}) => 'var(--btn-color-' + $type + ')'};
    font-size: var(--font_xl); 

    padding: ${({$ratio}) => $ratio * 15}px 0 ${({$ratio}) => $ratio * 19}px;
    width: 100%;
    max-width: var(--content-width);
    height: ${({$ratio}) => $ratio * 58}px;
    border-radius: var(--border-radius-xl);

    text-align: center;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;

    &:disabled {
        background: var(--btn-bg-disabled);
        color: var(--btn-color-disabled);
    }
`;

const IconWrapper = styled(Wrapper)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({$ratio}) => $ratio * 48}px;
    height: ${({$ratio}) => $ratio * 48}px;
    padding: 0;
    border-radius: var(--border-radius-md);

    & svg:first-of-type {
        width: ${({$ratio, $svgWidth}) => $ratio * $svgWidth}px;
        height: ${({$ratio, $svgHeight}) => $ratio * $svgHeight}px;
    }
`;

export const Button = ({type = 'main', ...props}) => {
    const ratio = useSizeRatio();

    return <Wrapper {...props} $type={type} $ratio={ratio}/>
}

export const IconButton = ({icon = {}, type = 'main', ...props}) => {
    const ratio = useSizeRatio();
    const {width = 36, height = 36} = icon;

    return <IconWrapper {...props} $svgWidth={width} $svgHeight={height} $type={type} $ratio={ratio} />
}

export const BackButton = styled(IconButton)`
    width: auto;
    padding: 0 var(--spacing_x2);
`;