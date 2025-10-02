import styled from "styled-components";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSizeRatio } from "../../hooks/useSizeRatio";

const Wrapper = styled.div`
    position: relative;
    padding: var(--spacing_x2) var(--spacing_x4);
    font-size: var(--font_sm);
    font-weight: 500;
    outline: none;
    border: 3px solid ${({$borderColor = 'blue'}) => 'var(--color-' + $borderColor + ')'};
    border-radius: var(--border-radius-xl);
    text-align: left;
    cursor: pointer;
    width: 100%;
`; 

const Postfix = styled.div`
    position: absolute;
    top: 50%;
    right: var(--spacing_x2);
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({$ratio}) => $ratio * 20}px;
    height: ${({$ratio}) => $ratio * 20}px;
    transition: transform 0.3s;
    transform: translateY(-50%) ${({$isOpen}) => $isOpen ? 'rotate(180deg)' : ''};
`;

//TODO: ждет макеты
const List = styled(motion.ul)`
    position: absolute;
    background: white;
    border-radius: var(--border-radius-sm);
    padding-top: var(--spacing_x1);
    width: 100%;
    top: calc(100% - var(--spacing_x1));
    left: 0;
    transform-origin: top;
    z-index: ${({$zIndex}) => $zIndex ?? 20};
`;

const Option = styled(motion.li)`
    padding: var(--spacing_x2) var(--spacing_x4);
    font-size:var(--font_sm);
    text-align: left;
    cursor: pointer;
    list-style-type: none;
    border-top:  2px solid rgba(38, 61, 141, 0.3);
`;

export const Select = (props) => {
    const wrapperRef = useRef();
    const [isOpen, setIsOpen] = useState(false);
    const ratio = useSizeRatio();
    const {options, placeholder, value, zIndex} = props;

    const handleChoose = (id, name) => {
        props.onChoose?.(id, name);
    };

    return (
        <>
            <Wrapper ref={wrapperRef} className={props.className} onClick={() => setIsOpen(prev => !prev)} $ratio={ratio}>
                <span>{value ? value : placeholder}</span>
                <Postfix $isOpen={isOpen} $ratio={ratio}>
                    <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6L10 16L18 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Postfix>
                <AnimatePresence>
                {
                    isOpen && (
                        <List
                            $ratio={ratio}
                            initial={{ opacity: 0, scaleY: 0.5 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            exit={{ opacity: 0, scaleY: 0.5 }}
                            transition={{ duration: 0.3 }}
                            $zIndex={zIndex}
                        >
                            {options.map(({id, name}) => (
                                <Option 
                                    key={id} 
                                    onClick={() => handleChoose(id, name)} 
                                    $ratio={ratio}
                                >
                                    {name}
                                </Option>
                            ))}
                        </List>
                    )
                }
            </AnimatePresence>
            </Wrapper>
            
        </>
    )
}