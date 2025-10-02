import styled from "styled-components";
import { Modal } from "./Modal";
import { Block } from "../Block";
import { Button } from "../Button";

const ModalStyled = styled(Modal)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;


const ButtonStyled = styled(Button)`
    margin-top: auto;
    margin-bottom: var(--spacing_x6);
`;


export const CommonModal = ({ isOpen, onClose, children, isCollegue, isDisabledAnimation, isDarken = true, btnText = 'Далее', ...props }) => {
    return (
        <ModalStyled isDarken={isDarken} isDisabledAnimation={isDisabledAnimation} isOpen={isOpen} {...props}>
            <div>
                {children}
            </div>
            <ButtonStyled onClick={onClose}>{btnText}</ButtonStyled>
        </ModalStyled>
    )
}