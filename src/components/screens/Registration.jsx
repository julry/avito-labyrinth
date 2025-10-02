import { useState } from "react";
import styled from "styled-components";
import { CURRENT_WEEK, useProgress } from "../../contexts/ProgressContext";
import { faculties, universities } from "../../constants/universities";
import { Select } from "../shared/Select";
import { FlexWrapper } from "../shared/ContentWrapper";
import { Input } from "../shared/Input";
import { emailRegExp } from "../../constants/regExp";
import { SCREENS } from "../../constants/screens";
import { BrightScreen } from "../shared/BrightScreen";
import { useSizeRatio } from "../../hooks/useSizeRatio";

const Wrapper = styled(BrightScreen)`
    height: ${({$ratio}) => $ratio * 606}px;
    min-height: ${({$ratio}) => $ratio * 606}px;
    width: ${({$ratio}) => $ratio * 357}px;
    overflow-x: hidden;
    overflow-y: auto;
    justify-content: center;

    & button {
        margin-top: auto;
    }
`;

const Content = styled(FlexWrapper)`
    z-index: 2;
    padding: 0;
    flex-grow: 1;
`;

const SelectStyled = styled(Select)`
    margin-top: var(--spacing_x2);
`;

const InputWrapper = styled.div`
    position: relative;
    width: 100%;

    & + & {
        margin-top: var(--spacing_x2);
    }
`;

const WrongText = styled.p`
    margin-top: var(--spacing_x2);
    color: var(--color-green);
    font-size: var(--font_xs);
`;

const InfoIconWrapper = styled.div`
    position: absolute;
    right: calc(var(--spacing_x2) * 1.5);
    top: calc(var(--spacing_x2) * 1.5);
`;

const InputRadioButton = styled.input`
    display: none;
`;

const RadioIconStyled = styled.div`
    position: relative;
    flex-shrink: 0;
    width: var(--spacing_x2);
    height: var(--spacing_x2);
    background-color: var(--color-white);
    box-shadow: inset 0 0 0 2px var(--color-white);
    border-radius: var(--border-radius-xs);
    margin-right: var(--spacing_x1);
    margin-top: calc(var(--spacing_x1) / 2);
    border-radius: 50%;
`;

const RadioButtonLabel = styled.label`
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    font-size: var(--font_xxs);
    color: var(--color-black);
    width: 100%;
    text-align: left;
    max-width: 300px;

    & ${InputRadioButton}:checked + ${RadioIconStyled} {
        background: var(--color-green);
    }
`;

const Link = styled.a`
    font-weight: 500;
`;


export const Registration = () => {
    const ratio = useSizeRatio();
    const { next, checkEmailRegistrated, registrateUser } = useProgress();
    const [univ, setUniv] = useState({});
    const [fac, setFac] = useState({});
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isNetworkError, setIsNetworkError] = useState(false);
    const [isAgreed, setIsAgreed] = useState(true);
    const [isMailsAgreed, setIsMailsAgreed] = useState(true);
    const [isNameCorrect, setIsNameCorrect] = useState();
    const [isSurnameCorrect, setIsSurnameCorrect] = useState();
    const [isEmailFieldCorrect, setIsEmailFieldCorrect] = useState();
    const [isAlreadyHas, setIsAlreadyHas] = useState(false);

    const handleClick = async () => {
        setIsNetworkError(false);

        if (isSending) return;
        setIsSending(true);

        const hasEmail = await checkEmailRegistrated(email);

        if (hasEmail) {
            setIsAlreadyHas(true);
            setIsSending(false);

            return;
        }

        const isTargeted = fac.id !== undefined && fac.name !== 'Другое';
        
        const regRes = await registrateUser({ 
            name: `${name.trim()} ${surname.trim()}`, 
            email: email.trim(), 
            university: univ.name.trim(), 
            universityId: univ.id, 
            isAddsAgreed: isMailsAgreed,
            faculty: fac.name !== 'Другое' ? fac.name : '', 
            facultyId: fac.name !== 'Другое' ? fac.id : undefined,
            isTargeted,
        });

        setIsSending(false);

        if (regRes?.isError) {
            setIsNetworkError(true);
            return;
        }

        if (CURRENT_WEEK < 1) {
            next(SCREENS.WAITING);

            return;
        }

        next(SCREENS.INTRO_RULES);
    }

    const handlePickUniversity = (id, name) => {
        if (univ?.id === id) return;

        setUniv({ id, name });
        setFac({});
    }

    const handleBlur = () => {
        setIsEmailFieldCorrect(!!email.match(emailRegExp));
    };

    const handleNameBlur = () => setIsNameCorrect(name.length > 1);
    const handleSurnameBlur = () => setIsSurnameCorrect(surname.length > 1);

    const handleChange = (e) => {
        if (isSending) return;
        setIsAlreadyHas(false);
        setIsEmailFieldCorrect();
        setEmail(e.target.value);
    };

    const btnDisabled = !isSurnameCorrect || !isEmailFieldCorrect || !isNameCorrect || !isAgreed || !univ?.id || (univ.id !== 'other' && !fac);

    const getIcon = (isCorrect) => {
        if (typeof isCorrect !== "boolean") return;

        if (isCorrect) return (
            <InfoIconWrapper>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 10L7.5 14.5L17 5" stroke="#2DE500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </InfoIconWrapper>
        )

        return (
            <InfoIconWrapper>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 5L15.5 15.5M15.5 5L5 15.5" stroke="#ED3125" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </InfoIconWrapper>
        )
    }

    return (
        <Wrapper 
            $ratio={ratio} 
            onClick={handleClick} 
            buttonText={"Готово"} 
            isDisabledButton={btnDisabled}
            hasLogo={false}
        >
            <h3>РЕГИСТРАЦИЯ</h3>
            <Content>
                 <InputWrapper>
                        <Input
                            type="text"
                            id="name"
                            value={name}
                            isCorrect={isNameCorrect}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={handleNameBlur}
                            placeholder="Имя"
                            autoComplete="name"
                        />
                        {getIcon(isNameCorrect)}
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            type="text"
                            id="surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            onBlur={handleSurnameBlur}
                            placeholder="Фамилия"
                            autoComplete="surname"
                            isCorrect={isSurnameCorrect}
                        />
                        {getIcon(isSurnameCorrect)}
                    </InputWrapper>
                    <InputWrapper>
                        <Input
                            isCorrect={isEmailFieldCorrect}
                            type="email"
                            id="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={handleChange}
                            autoComplete="email"
                            onBlur={handleBlur}
                        />
                        {getIcon(isEmailFieldCorrect)}
                    </InputWrapper>
                    <SelectStyled
                        value={univ.name}
                        options={universities}
                        onChoose={handlePickUniversity}
                        placeholder="Вуз"
                        initialTop={99}
                    />
                    <SelectStyled
                        value={fac.name}
                        options={faculties.filter(({ university }) => university === univ.id || university === 'all')}
                        onChoose={(id, name) => setFac({name, id})}
                        placeholder="Факультет"
                        zIndex={19}
                        initialTop={169}
                    />
                   
                    {isAlreadyHas && (
                        <WrongText>Ой! Эта почта уже зарегистрирована. Попробуй ввести снова.</WrongText>
                    )}
                    <RadioButtonLabel>
                        <InputRadioButton
                            type="checkbox"
                            value={isAgreed}
                            checked={isAgreed}
                            onChange={() => setIsAgreed((prevAgreed) => !prevAgreed)}
                        />
                        <RadioIconStyled />
                        <span>
                            Я даю согласие на{"\u00A0"}
                            <Link
                                href={"https://fut.ru/personal_data_agreement"}
                                target="_blank"
                                rel="noreferrer"
                            >
                                обработку
                            </Link>{" "}
                            и{"\u00A0"}
                            <Link
                                href={"https://fut.ru/personal_data_transfer_agreement"}
                                target="_blank"
                                rel="noreferrer"
                            >
                                передачу
                            </Link>{" "}
                            моих персональных данных и соглашаюсь с {"\u00A0"}
                            <Link
                                href={'https://fut.ru/personal-data'}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Политикой обработки персональных данных
                            </Link>, а также с {"\u00A0"}
                            <Link
                                href={'https://worklifealfa.fut.ru/agreement.pdf'}
                                target="_blank"
                                rel="noreferrer"
                            >правилами проведения акции</Link>.
                        </span>
                    </RadioButtonLabel>
                    <RadioButtonLabel>
                        <InputRadioButton
                            type="checkbox"
                            value={isMailsAgreed}
                            checked={isMailsAgreed}
                            onChange={() => setIsMailsAgreed((prevAgreed) => !prevAgreed)}
                        />
                        <RadioIconStyled />
                        <span>
                            Хочу ловить{"\u00A0"}
                            <Link
                                href={"https://fut.ru/adv_messages_agreement"}
                                target="_blank"
                                rel="noreferrer"
                            >
                                персональные стажировки от топ‑компаний в рекламной рассылке
                            </Link>.
                        </span>
                    </RadioButtonLabel>
                    {isNetworkError && (
                        <WrongText>Ой! Что-то пошло не так, попробуй позже.</WrongText>
                    )}
            </Content>

        </Wrapper>
    )
}