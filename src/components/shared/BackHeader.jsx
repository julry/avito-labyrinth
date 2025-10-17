import styled from "styled-components";
import { IconButton } from "./Button";

const Header = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: calc(var(--spacing_x7) + var(--spacing_x1) / 2);
    left: var(--spacing_x6);
`;

export const BackHeader = ({ className, onBack}) => (
    <Header className={className}>
        <IconButton onClick={onBack}>
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 18L7 18M7 18L14.6667 9M7 18L14.6667 27" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </IconButton>
    </Header>
)