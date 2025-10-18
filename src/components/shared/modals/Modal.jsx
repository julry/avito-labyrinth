import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
    position: absolute;
    inset: 0;
    z-index: 1000;
    will-change: opacity;
    background: rgba(100, 88, 144, 0.5);
    backdrop-filter: blur(4.1px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Modal = ({ isDarken, isOpen, isDisabledAnimation, ...props }) => (
    <AnimatePresence>
        {isOpen && (
            <Wrapper
                {...props}
                $isDarken={isDarken}
                initial={{
                    opacity: isDisabledAnimation ? 1 : 0,
                }}
                animate={!isDisabledAnimation && { opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            />
        )}
    </AnimatePresence>
)