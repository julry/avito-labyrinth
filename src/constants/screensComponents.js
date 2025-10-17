import { AchievesScreen } from "../components/screens/AchievesScreen";
import { AwardsScreen } from "../components/screens/AwardsScreen";
import { IntroRegistration } from "../components/screens/IntroRegistration";
import { IntroRules } from "../components/screens/IntroRules";
import { ProfileScreen } from "../components/screens/ProfileScreen";
import { Registration } from "../components/screens/Registration";
import { WaitingGameScreen } from "../components/screens/Waiting";
import { 
    Advice11, Advice12, Advice13, EndLevel11, EndLevel12, EndLevel13, 
    Game11, Game12, Game13, InfoWeek1, Lobby1, EndWeek1
 } from "../components/screens/week1";
 import { 
    Advice21, Advice22, Advice23, EndLevel21, EndLevel22, EndLevel23, 
    Game21, Game22, Game23, InfoWeek2, Lobby2, EndWeek2
 } from "../components/screens/week2";
 import { 
    Advice31, Advice32, Advice33, EndLevel31, EndLevel32, EndLevel33, 
    Game31, Game32, Game33, InfoWeek3, Lobby3, EndWeek3
 } from "../components/screens/week3";
 import { 
    Advice41, Advice42, Advice43, EndLevel41, EndLevel42, EndLevel43, 
    Game41, Game42, Game43, InfoWeek4, Lobby4, EndWeek4
 } from "../components/screens/week4";
import { SCREENS } from "./screens";

export const screens = {
    [SCREENS.INTROREG]: IntroRegistration,
    [SCREENS.INTRO_RULES]: IntroRules,
    [SCREENS.REG]: Registration,
    [SCREENS.ACHIEVES]: AchievesScreen,
    [SCREENS.AWARDS]: AwardsScreen,
    [SCREENS.PROFILE]: ProfileScreen,
    [SCREENS.WAITING]: WaitingGameScreen,
    [SCREENS.INTRO_RULES]: IntroRules,
    [SCREENS.ADVICE11]: Advice11,
    [SCREENS.ADVICE12]: Advice12,
    [SCREENS.ADVICE13]: Advice13,
    [SCREENS.LEVEL11]: Game11,
    [SCREENS.LEVEL12]: Game12,
    [SCREENS.LEVEL13]: Game13,
    [SCREENS.ENDLEVEL11]: EndLevel11,
    [SCREENS.ENDLEVEL12]: EndLevel12,
    [SCREENS.ENDLEVEL13]: EndLevel13,
    [SCREENS.INFOWEEK1]: InfoWeek1,
    [SCREENS.LOBBY1]: Lobby1,
    [SCREENS.ENDWEEK1]: EndWeek1,
    [SCREENS.ADVICE21]: Advice21,
    [SCREENS.ADVICE22]: Advice22,
    [SCREENS.ADVICE23]: Advice23,
    [SCREENS.LEVEL21]: Game21,
    [SCREENS.LEVEL22]: Game22,
    [SCREENS.LEVEL23]: Game23,
    [SCREENS.ENDLEVEL21]: EndLevel21,
    [SCREENS.ENDLEVEL22]: EndLevel22,
    [SCREENS.ENDLEVEL23]: EndLevel23,
    [SCREENS.INFOWEEK2]: InfoWeek2,
    [SCREENS.LOBBY2]: Lobby2,
    [SCREENS.ENDWEEK2]: EndWeek2,
    [SCREENS.ADVICE31]: Advice31,
    [SCREENS.ADVICE32]: Advice32,
    [SCREENS.ADVICE33]: Advice33,
    [SCREENS.LEVEL31]: Game31,
    [SCREENS.LEVEL32]: Game32,
    [SCREENS.LEVEL33]: Game33,
    [SCREENS.ENDLEVEL31]: EndLevel31,
    [SCREENS.ENDLEVEL32]: EndLevel32,
    [SCREENS.ENDLEVEL33]: EndLevel33,
    [SCREENS.INFOWEEK3]: InfoWeek3,
    [SCREENS.LOBBY3]: Lobby3,
    [SCREENS.ENDWEEK3]: EndWeek3,
    [SCREENS.ADVICE41]: Advice41,
    [SCREENS.ADVICE42]: Advice42,
    [SCREENS.ADVICE43]: Advice43,
    [SCREENS.LEVEL41]: Game41,
    [SCREENS.LEVEL42]: Game42,
    [SCREENS.LEVEL43]: Game43,
    [SCREENS.ENDLEVEL41]: EndLevel41,
    [SCREENS.ENDLEVEL42]: EndLevel42,
    [SCREENS.ENDLEVEL43]: EndLevel43,
    [SCREENS.INFOWEEK4]: InfoWeek4,
    [SCREENS.LOBBY4]: Lobby4,
    [SCREENS.ENDWEEK4]: EndWeek4,
};
