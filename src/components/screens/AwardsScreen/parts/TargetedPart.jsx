import styled from 'styled-components';
import { useSizeRatio } from '../../../../hooks/useSizeRatio';
import { PurpleText } from '../../../shared/Texts';
import { CURRENT_WEEK, useProgress } from '../../../../contexts/ProgressContext';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '../../../shared/Button';

const SvgStyled = styled.div`
    position: absolute;
    inset: 0;
    z-index: 1;
    width: ${({$width})=> $width}px;
    height: ${({$height})=> $height}px;
`;

const Content = styled.div`
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${({$ratio})=> $ratio * 17}px ${({$ratio})=> $ratio * 14}px ${({$ratio})=> $ratio * 29}px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: var(--spacing_x2);
    margin-bottom: var(--spacing_x5);

    & button {
        padding-top: calc(var(--spacing_x1) * 2.6);
        font-size: var(--font_md);
    }
`;  

const PointsWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const PointImg = styled.div`
    position: absolute;
    top: ${({$ratio})=> $ratio * 8}px;
    left: ${({$ratio})=> $ratio * 93}px;
    width: ${({$ratio})=> $ratio * 145}px;
    height: ${({$ratio})=> $ratio * 88}px;
`;

const PointsTitle = styled.h3`
`;

const Points = styled.h3`
    font-size: ${({$ratio})=> $ratio * 73}px;
    font-weight: 900;
    margin-top: ${({$ratio})=> $ratio * -5}px;
    color: #FF4052;
`;

const InfoTitle = styled.p`
    margin-top: ${({$mt}) => $mt ?? 'var(--spacing_x5)'};
    font-weight: 500;
    text-align: center;
`;

const InfoRow = styled.div`
    display: flex;
    align-items: center;
    margin-top: var(--spacing_x2);
    gap: var(--spacing_x2);
    width: 100%;
    justify-content: flex-start;
    line-height: 100%;
    

    & > p:first-child {
        flex-shrink: 0;
        min-width: ${({$ratio})=> $ratio * 70}px;
        padding-top: ${({$ratio})=> $ratio * 6}px;
    }
`;

const ChancesInfoWrapper = styled.div`
    margin-top: ${({$mt})=> $mt}px;
    display: grid;
    grid-template-rows: auto repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
    grid-auto-flow: column;
    grid-row-gap: var(--spacing_x2);

    & p {
        grid-column: span 2;
    }
`;

const ChancesRow = styled(InfoRow)`
    margin-top: 0;
    gap: 0;

    &:first-of-type {
        grid-area: 2 / 1 / 3 / 2;
    }
    &:nth-of-type(2) {
        grid-area: 2 / 2 / 3 / 2;
    }
    &:nth-of-type(3) {
        grid-area: 3 / 1 / 4 / 2;
    }
    &:nth-of-type(4) {
        grid-area: 3 / 2 / 4 / 2;
    }
`;

export const TargetedPart = () => {
    const [part, setPart] = useState(0);
    const { user } = useProgress();
    const ratio = useSizeRatio();

    return (
        <AnimatePresence key="targeted">
            {
                part === 0 ? (
                    <SvgStyled key="svg_0"
                        $width={357 * ratio} $height={540 * ratio}
                    >
                        <svg width="100%" height="100%" viewBox="0 0 357 540" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M61.9172 539.594C17.7725 539.594 8.13271 519.896 6.83805 509.949C-6.44626 407.883 4.18163 267.561 1.62696 254.154C-0.927711 240.747 1.62696 73.7692 1.62696 31.8182C1.62696 -10.1327 61.9172 0.99292 90.0185 2.29041C118.12 3.58783 289.311 -0.737 321.5 2.29041C359.93 5.90479 356.073 37.2284 353.078 67.1857C350.543 92.5486 353.078 240.1 353.078 271.82C353.078 315.28 363.315 482.372 350.71 519.231C348.69 525.138 343.399 529.337 334.241 531.303C280.773 542.781 109.029 539.594 61.9172 539.594Z" fill="white"/>
                        </svg>
                    </SvgStyled>
                ) : (
                    <SvgStyled 
                        key="svg_1"
                        $width={357 * ratio} $height={578 * ratio}
                    >
                        <svg width="100%" height="100%" viewBox="0 0 357 578" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M61.9172 577.565C17.7725 577.565 8.13271 556.481 6.83805 545.834C-6.44626 436.585 4.18163 286.389 1.62696 272.039C-0.927711 257.689 1.62696 78.9604 1.62696 34.0573C1.62696 -10.8458 61.9172 1.06287 90.0185 2.4516C118.12 3.84033 289.311 -0.788818 321.5 2.4516C359.93 6.32031 356.073 39.8482 353.078 71.9136C350.543 99.0612 353.078 256.996 353.078 290.948C353.078 337.466 363.315 516.316 350.71 555.77C348.69 562.093 343.399 566.586 334.241 568.691C280.773 580.977 109.029 577.565 61.9172 577.565Z" fill="white"/>
                        </svg>
                    </SvgStyled>
                )
            }
            <Content $ratio={ratio}>
                <ButtonWrapper>
                    <Button key="button_week" type={part === 0 ? 'main' : 'secondary'} onClick={() => setPart(0)}>
                        Еженедельные розыгрыши
                    </Button>
                    <Button key="button_main" type={part === 1 ? 'main' : 'secondary'} onClick={() => setPart(1)}>
                        Розыгрыш{'\n'}главного приза
                    </Button>
                </ButtonWrapper>
                <PointsWrapper>
                    <PointImg $ratio={ratio}>
                        <svg width="100%" height="100%" viewBox="0 0 145 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M37.4575 82.8452C37.3356 82.8452 37.2137 82.8452 50.2879 82.1927C63.3622 81.5402 89.6364 80.2352 102.958 79.5629C116.28 78.8907 115.853 78.8907 114.841 79.1977C113.829 79.5048 112.244 80.1189 110.665 80.6272C109.087 81.1354 107.563 81.5192 100.438 82.3695C93.3125 83.2197 80.6326 84.5247 73.8872 85.2737C67.1418 86.0227 66.7151 86.1763 73.7496 86.0251C80.7841 85.8738 95.2928 85.4133 110.241 84.9387" stroke="#FF4052" strokeWidth="1.93023" strokeLinecap="round"/>
                            <path d="M135.854 24.4011C135.854 24.4011 135.661 24.3512 135.468 24.3512C134.888 24.451 134.694 24.1017 134.549 23.5529C134.162 22.0561 133.727 20.6092 133.099 19.1623C132.519 17.8152 131.648 16.6677 130.536 15.7197C129.908 15.1709 129.28 14.6221 128.651 14.0234C128.168 13.5743 127.732 13.1752 127.104 13.0754C126.137 12.9756 126.524 12.0775 126.282 11.5786C126.04 11.0298 126.621 10.93 126.911 10.7803C127.201 10.6306 127.491 10.481 127.781 10.481C128.893 10.481 129.86 9.98204 130.682 9.23365C131.89 8.08611 132.76 6.739 133.389 5.14242C133.921 3.74542 134.404 2.39831 134.501 0.901527C134.549 0.45249 134.743 -0.0464327 135.226 0.00346026C135.758 0.0533532 136.435 0.00347244 136.725 0.701973C136.918 1.2508 137.063 1.84949 137.208 2.39831C137.692 4.29424 137.933 6.19019 138.465 8.08612C138.658 8.78462 138.997 9.43321 139.335 10.0319C140.012 11.2792 141.366 11.878 142.768 11.5287C143.348 11.379 143.831 11.5786 144.315 11.878C145.04 12.3769 145.088 12.8259 144.363 13.3249C143.396 13.9735 142.429 14.5722 141.366 15.121C138.804 16.4182 137.256 18.3641 137.208 21.4075C137.208 22.1559 137.015 22.9043 136.87 23.6527C136.773 24.1516 136.628 24.6007 135.854 24.4011ZM129.328 12.1274C131.745 14.1231 133.872 15.9692 135.323 18.6634C136.29 16.0191 138.223 14.5223 140.737 13.2251C139.287 13.0255 138.562 12.1773 137.74 11.4289C137.353 11.0797 137.015 10.5807 136.87 10.0319C136.531 8.93428 136.048 7.88654 135.903 6.739C135.854 6.48954 135.903 6.19017 135.468 6.04049C135.081 6.6891 134.694 7.38762 134.307 8.08612C133.196 9.98205 131.89 11.6285 129.328 12.1274Z" fill="#965EEB"/>
                            <path d="M4.49393 43.6852C4.49393 42.3121 4.02017 41.0338 3.40432 39.8027C2.97796 38.9031 2.40948 38.0508 1.60414 37.388C1.3199 37.1512 1.1304 36.9145 1.03565 36.5357C0.988279 36.2989 0.798803 36.1569 0.60931 36.0149C-0.00654321 35.5887 -0.0539224 35.352 0.514557 34.9732C1.3199 34.4051 2.12526 33.8369 2.97797 33.3634C3.83069 32.9373 4.39916 32.2271 4.82552 31.4221C5.2045 30.7119 5.58351 29.9543 5.82037 29.1494C6.00987 28.4392 6.76782 28.1078 7.43105 28.4392C7.81003 28.6286 7.81005 29.0547 7.85742 29.4335C7.95217 30.4278 8.09427 31.3747 8.37851 32.3217C8.80487 33.7895 9.94185 34.6891 11.0314 35.5887C11.5999 36.0622 11.5999 36.1096 11.2209 36.6778C11.0788 36.8671 10.9367 37.1512 10.6998 37.2932C8.56802 38.619 7.57318 40.7497 6.67309 42.975C6.48359 43.4485 6.53096 43.922 6.48358 44.4428C6.38884 45.2004 6.05723 45.6265 5.63087 45.6265C5.15714 45.6265 4.5413 44.9636 4.49393 44.3955C4.44655 44.1114 4.49393 43.8746 4.49393 43.6852ZM2.03051 35.9675C2.07788 36.0622 2.07787 36.2043 2.07787 36.2043C3.54644 37.0565 4.49392 38.3349 5.10977 39.8974C5.34664 40.5129 5.67825 40.5129 6.05724 39.8974C6.81521 38.761 7.57317 37.672 8.61538 36.7724C9.18386 36.2989 9.13649 35.9675 8.47327 35.5414C7.71529 35.0206 7.24156 34.3103 6.95731 33.5054C6.8152 33.1266 6.62571 32.8425 6.34147 32.5111C5.10976 33.8842 4.16231 35.6361 2.03051 35.9675Z" fill="#00AAFF"/>
                            <path d="M2.02979 35.9677C4.11421 35.6362 5.06166 33.8843 6.34074 32.5112C6.62498 32.8427 6.81447 33.1267 6.95659 33.5055C7.2882 34.3104 7.71457 35.0207 8.47254 35.5415C9.13577 35.9676 9.18314 36.2991 8.61466 36.7726C7.57244 37.6722 6.81449 38.7612 6.05652 39.8975C5.67753 40.4657 5.34592 40.4657 5.10905 39.8975C4.4932 38.335 3.54572 37.0567 2.07715 36.2044C2.07715 36.1571 2.07716 36.0624 2.02979 35.9677Z" fill="#00AAFF"/>
                            <path d="M16.8479 17.2782C16.8055 16.7172 17.23 16.5169 17.6545 16.3165C18.5035 15.996 18.5035 15.996 18.3337 15.1545C18.3337 15.0343 18.2913 14.9141 18.2913 14.7538C18.2064 13.712 18.3762 13.5117 19.4799 13.5117C20.0318 13.5117 20.2016 13.712 20.2441 14.1528C20.2865 14.5134 20.4139 14.9141 20.4139 15.2747C20.4139 15.7956 20.6261 16.0361 21.2205 15.996C21.5601 15.9559 21.8996 15.996 22.2393 16.036C22.9185 16.036 23.3855 16.597 23.2581 17.1981C23.2157 17.4786 23.0459 17.6789 22.7063 17.719C22.3242 17.7591 21.8997 17.8392 21.5176 17.8793C20.7959 17.9594 20.7959 17.9594 20.8808 18.6406C20.9233 18.881 20.9658 19.1214 21.0082 19.4019C21.0931 19.9629 20.8384 20.4838 20.3714 20.5639C19.862 20.6842 19.3526 20.3636 19.1403 19.8427C19.0554 19.6023 18.9705 19.3618 18.8856 19.1214C18.6734 18.1998 18.6733 18.1998 17.6545 18.1598C17.0602 17.9995 16.8479 17.7991 16.8479 17.2782Z" fill="#04E061"/>
                        </svg>
                    </PointImg>
                    <InfoTitle $mt={0}>Твои баллы:</InfoTitle>
                    <Points $ratio={ratio}>
                        {(part === 0 ? user[`week${CURRENT_WEEK > 4 ? 4 : CURRENT_WEEK}Points`] : user.pointsTarget) ?? 0}
                    </Points>
                </PointsWrapper>
                {
                    part === 0 ? (
                        <div>
                            <InfoTitle>
                                Чем больше баллов — тем выше шанс на победу
                            </InfoTitle>
                            <InfoRow $ratio={ratio}><PurpleText>+10 б.</PurpleText>за каждый пройденный уровень </InfoRow>
                            <InfoRow $ratio={ratio}><PurpleText>+10 б.</PurpleText>за ежедневный заход в игру</InfoRow>
                            <ChancesInfoWrapper $mt={ratio * 42}>
                                <InfoTitle>Если ты соберешь</InfoTitle>
                                <ChancesRow $ratio={ratio}>
                                    <PurpleText>{'>20 б.'}</PurpleText> = 1 шанс
                                </ChancesRow>
                                 <ChancesRow $ratio={ratio}>
                                     <PurpleText>{'>50 б.'}</PurpleText> = 2 шанса
                                </ChancesRow>
                                 <ChancesRow $ratio={ratio}>
                                     <PurpleText>{'>70 б.'}</PurpleText> = 3 шанса
                                </ChancesRow>
                                 <ChancesRow $ratio={ratio}>
                                     <PurpleText>{'>90 б.'}</PurpleText> = 4 шанса
                                </ChancesRow>
                            </ChancesInfoWrapper>
                            <InfoTitle $mt={25 * ratio + 'px'}>Максимум в неделю — 100 б.</InfoTitle>
                        </div>
                    ) : (
                        <div>
                            <InfoTitle>
                                Для участия в розыгрыше нужно пройти все уровни Глав I–IV. Копи баллы и увеличивай шансы на победу
                            </InfoTitle>
                            <InfoRow $ratio={ratio}><PurpleText>+10 б.</PurpleText>за регистрацию в игре </InfoRow>
                            <InfoRow $ratio={ratio}><PurpleText>+10 б.</PurpleText>за приглашение 1 друга со своего факультета (max 5)</InfoRow>
                            <InfoRow $ratio={ratio}><PurpleText>+10 б.</PurpleText>за подписку на Телеграм-канал @futru</InfoRow>
                            <InfoRow $ratio={ratio}><PurpleText>+5 б.</PurpleText>за каждое достижение в игре (max 9)</InfoRow>
                            <ChancesInfoWrapper $mt={ratio * 10}>
                                <InfoTitle>Если ты соберешь</InfoTitle>
                                <ChancesRow $ratio={ratio}>
                                    <PurpleText>{'>10 б.'}</PurpleText> = 1 шанс
                                </ChancesRow>
                                 <ChancesRow $ratio={ratio}>
                                     <PurpleText>{'>30 б.'}</PurpleText> = 2 шанса
                                </ChancesRow>
                                 <ChancesRow $ratio={ratio}>
                                     <PurpleText>{'>70 б.'}</PurpleText> = 3 шанса
                                </ChancesRow>
                                 <ChancesRow $ratio={ratio}>
                                     <PurpleText>{'>100 б.'}</PurpleText> = 4 шанса
                                </ChancesRow>
                            </ChancesInfoWrapper>
                            <InfoTitle>Максимум — 115 б.</InfoTitle>
                        </div>
                    )
                }
            </Content>
        </AnimatePresence>
    )
}