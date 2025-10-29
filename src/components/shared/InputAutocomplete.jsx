import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { useMemo, useState } from "react";
import { faculties } from "../../constants/universities";
import {motion, AnimatePresence} from 'framer-motion';
import { Input } from "./Input";

const Wrapper = styled.div`
    position: relative;
    width: 100%;
`;

const InputStyled = styled(Input)`
    position: relative;
    z-index: 2;
    text-overflow: ellipsis;
`;

const List = styled(motion.ul)`
    position: absolute;
    background: white;
    border-radius: var(--border-radius-md);
    padding: var(--spacing_x7) calc(1.5 * var(--spacing_x1)) 0;
    width: calc(100% - var(--spacing_x1));
    top: calc(100% - var(--spacing_x7));
    left: calc(var(--spacing_x1) / 2);
    transform-origin: top;
    z-index: ${({$zIndex}) => $zIndex ?? 20};
    border: 3px solid var(--color-blue);
    z-index: 1;
`;

const Option = styled(motion.li)`
    padding: var(--spacing_x2) 0;
    font-size:var(--font_sm);
    text-align: left;
    cursor: pointer;
    list-style-type: none;
    font-weight: 500;
    border-bottom:  2px solid var(--color-blue);

    &:last-child {
        border-bottom: 0;
    }
`;

const UNIV_TO_SIZE = {
    'u1': 'md',
    'u2': 'xl',
    'u3': 'xl',
    'u4': 'xl',
}
const UNIV_TO_PLACEHOLDER = {
    'u1': 'md',
    'u2': 'xl',
    'u3': 'xl',
    'u4': 'xl',
}

export const InputAutocomplete = ({ onPick, univId, ...props }) => {
    const [value, setValue] = useState('');
    const [isOtherPicked, setIsOtherPicked] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const initialFaculties = useMemo(() => faculties.filter(({university}) => university === univId), [univId]);

    const options = useMemo(() => 
        initialFaculties.filter(({name, shortName}) => name?.toLowerCase()?.includes(value?.toLowerCase()) || shortName?.toLowerCase()?.includes(value?.toLowerCase()))
    , [value, initialFaculties])

    const ratio = useSizeRatio();

    const handleChange = (e) => {
        const textValue = e.target.value;
        setValue(textValue);
        if (options.length) setIsOtherPicked(false);
        if (!isOtherPicked) onPick({id: 'other', name: textValue})
    }

    const handlePickOther = () => {
        onPick(value);
        setIsOtherPicked(true);
    }

    const handlePick = (fac) => {
        onPick(fac);
        setValue(fac.name);
    }
    return (
        <Wrapper>
            <InputStyled
                size={UNIV_TO_SIZE[univId]}
                value={value}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props} 
            />
            <AnimatePresence>
                {
                    isFocused && value.length > 0 && !isOtherPicked && (
                        <List
                            $ratio={ratio}
                            initial={{ opacity: 0, scaleY: 0.5 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            exit={{ opacity: 0, scaleY: 0.5 }}
                            transition={{ duration: 0.3 }}
                        >
                            {options.length > 0 ? options.map(({id, name}) => (
                                <Option 
                                    key={id} 
                                    onClick={() => handlePick({id, name})} 
                                    $ratio={ratio}
                                >
                                    {name}
                                </Option>
                            )) : (
                                <Option 
                                    key={'other'} 
                                    onClick={handlePickOther} 
                                    $ratio={ratio}
                                >
                                    Другое
                                </Option>
                            )}

                        </List>
                    )
                }
            </AnimatePresence>
        </Wrapper>
    )
}