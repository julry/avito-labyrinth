import { createContext, useEffect, useContext, useRef, useState } from 'react'
import { FTClient } from 'ft-client';
import WebApp from '@twa-dev/sdk';
import { uid } from 'uid';
import { SCREENS, NEXT_SCREENS } from "../constants/screens";
import { screens } from "../constants/screensComponents";
import { getUrlParam } from "../utils/getUrlParam";
import { useImagePreloader } from '../hooks/useImagePreloader';

const INITIAL_DAY_ACTIVITY = {
    completedAt: null,
    isCompleted: false,
    points: 0,
}

const INITIAL_ACTIVITY_DATA = {
    1: INITIAL_DAY_ACTIVITY,
    2: INITIAL_DAY_ACTIVITY,
    3: INITIAL_DAY_ACTIVITY,
};

const INITIAL_ENTER_DATA = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
}

const INITIAL_USER = {
    id: '',
    name: '',
    email: '',
    university: '',
    faculty: '',
    isTargeted: true,
    seenStartInfo: false,
    week1Points: 0,
    week2Points: 0,
    week3Points: 0,
    week4Points: 0,
    achieves: [],
    week1EnterPoints: INITIAL_ENTER_DATA,
    week2EnterPoints: INITIAL_ENTER_DATA,
    week3EnterPoints: INITIAL_ENTER_DATA,
    week4EnterPoints: INITIAL_ENTER_DATA,
    game1Week: INITIAL_ACTIVITY_DATA,
    game2Week: INITIAL_ACTIVITY_DATA,
    game3Week: INITIAL_ACTIVITY_DATA,
    game4Week: INITIAL_ACTIVITY_DATA,
};

const getMoscowTime = (date) => {
    const dateNow = date ?? new Date();
    const localOffset = dateNow.getTimezoneOffset();
    const utcPlus3Offset = -180;
    const totalOffset = utcPlus3Offset - localOffset;
    
    return new Date(dateNow.getTime() + totalOffset * 60 * 1000);
}

const getCurrentWeek = () => {
    return 1;
    const today = getMoscowTime();

    if (today < getMoscowTime(new Date(2025, 8, 15))) return 0;
    if (today < getMoscowTime(new Date(2025, 8, 22))) return 1;
    if (today < getMoscowTime(new Date(2025, 8, 29))) return 2;
    if (today < getMoscowTime(new Date(2025, 9, 6))) return 3;
    if (today < getMoscowTime(new Date(2025, 9, 13))) return 4;

    return 5;
}

export const CURRENT_WEEK = getCurrentWeek();

const INITIAL_STATE = {
    screen: SCREENS.INTRO_REG,
    points: 0,
    weekPoints: 0,
    user: INITIAL_USER,
    passedWeeks: [],
}

const ProgressContext = createContext(INITIAL_STATE);

const API_LINK = import.meta.env.VITE_API_URL;
const DEV_ID = import.meta.env.VITE_DEV_ID;

export function ProgressProvider(props) {
    const { children } = props
    const [isLoading, setIsLoading] = useState();
    const [currentScreen, setCurrentScreen] = useState();
    const [points, setPoints] = useState(INITIAL_STATE.points);
    const [totalPoints, setTotalPoints] = useState(INITIAL_STATE.points);
    const [weekPoints, setWeekPoints] = useState(INITIAL_STATE.weekPoints);
    const [user, setUser] = useState(INITIAL_STATE.user);
    const [passedWeeks, setPassedWeeks] = useState(INITIAL_STATE.passedWeeks);
    const [newAchieve, setNewAchieve] = useState([]);
    const [isJustEntered, setIsJustEntered] = useState(true);
    const [isShowWeekLobbyInfo, setIsShowWeekLobbyInfo] = useState(false);
    const [tgError, setTgError] = useState({isError: false, message: ''});
    const screen = screens[currentScreen];
  
    const client = useRef();
    const recordId = useRef();
    const isDesktop = useRef(false);
    const tgInfo = useRef();

    useImagePreloader([]);

    const setUserBdData = (record = {}) => {
        recordId.current = record?.id;
        const { data = {}, scriptData = {}} = record ?? {};
        const passedWeeksBd = data.passedWeeks ?? [];


        setUserInfo(data);
        setTotalPoints(scriptData?.pointsTotal ?? data.points);
        setPoints(data.points);
        setPassedWeeks(passedWeeksBd);
        setWeekPoints(data[`week${CURRENT_WEEK}Points`]);
    }

    const initProject = async () => {
        setIsLoading(true);
        try {
            const info = await loadRecord();

            if (isDesktop.current) {
                setCurrentScreen(SCREENS.DESKTOP);

                return;
            }

            if (!info) {
                setTgError({isError: true, message: ''});
            }

            tgInfo.current = info?.systemData ?? {};

            setUserBdData(info ?? {});

            const {data = {}} = info ?? {};
            let dataPoints = data?.points ?? 0;

            const checkDay = getMoscowTime().getDay();

            //уточнить куда начислять баллы за вход
            if (data.isTargeted && !data?.[`week${CURRENT_WEEK}EnterPoints`]?.[checkDay]) {
                await updateUser({
                    points: dataPoints + 50,
                    [`week${CURRENT_WEEK}Points`]: (data[`week${CURRENT_WEEK}Points`] ?? 0) + 50,
                    [`week${CURRENT_WEEK}EnterPoints`]: {
                        ...data[`week${CURRENT_WEEK}EnterPoints`], 
                        [checkDay]: 50,
                    }
                });
            }

            if (getUrlParam('screen')) {
                setCurrentScreen(getUrlParam('screen'));

                return;
            }

            if (!info.data.email) {
                setCurrentScreen(INITIAL_STATE.screen);
                return;
            } else if (!info.data.seenStartInfo) {
                setCurrentScreen(CURRENT_WEEK > 0 ? SCREENS.INTRO_RULES : SCREENS.WAITING);

                return;
            } else {
                setCurrentScreen(SCREENS.LOBBY);
            }
        } catch (e) {
            setTgError({isError: true, message: e.message});
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // client.current = new FTClient(
        //     API_LINK,
        //     ''
        // );

        initProject().catch((e) => console.log(e));

        if (WebApp) {
            WebApp.ready();
            WebApp.expand();
            WebApp.lockOrientation();
        }
    }, []);

    const loadRecord = () => {
        const webApp = window?.Telegram?.WebApp;
        let webAppInitData = webApp?.initData;
        let initData = WebApp.initData;

        return ({data: INITIAL_USER});
        
        if (window?.location?.hostname === 'localhost' || !!getUrlParam('screen')) {
            return client.current.findRecord('id', DEV_ID);
        } else {
            console.log('webAppInitData', webAppInitData);
        } 

        if (
            WebApp?.platform?.toLowerCase()?.includes('web') || WebApp?.platform?.toLowerCase()?.includes('desktop')
            || webApp?.platform?.toLowerCase()?.includes('web') || webApp?.platform?.toLowerCase()?.includes('desktop')
        ) {
                isDesktop.current = true;

                return {};
        }
    
        if (webAppInitData) {
            return client.current.getTgRecord(webAppInitData);
        } else if (initData) {
            return client.current.getTgRecord(initData);
        } else if (!window?.Telegram) {
            console.error('Telegram не определен')

            throw new Error('Telegram не определен')
        } else if (!window?.Telegram?.WebApp) {
            console.error('Webapp не определен')

            throw new Error('Webapp не определен')
        } else {
            console.error('В WebApp нет данных пользователя')

            throw new Error ('В WebApp нет данных пользователя');
        }
    }

    const next = (customScreen) => {
        const nextScreen = customScreen ?? NEXT_SCREENS[currentScreen]

        if (!nextScreen) {
            return
        }

        setCurrentScreen(nextScreen)
    }

    const setUserInfo = (user) => {
        setUser(prev => ({ ...prev, ...user }));
    }

    const readWeekLetter = (week) => {
        updateUser(({readenLetters: {...user.readenLetters, [`week${week}`]: true}})).catch(() => {});
    }

    const readLifehack = (week, day) => {
        updateUser(({lifehacks: [...user.lifehacks, `week${week}day${day}`]})).catch(() => {});
    }

    const addDayFinding = (id) => {
        updateUser(({findings: [...user.findings, id]})).catch(() => {});
    }

    const dropGame = async ({gameName, day, tries}) => {
        if (user[gameName][day].isCompleted) return;

        await updateUser(
            {
                [gameName]: { ...user[gameName], [day]: {
                    ...user[gameName][day],
                    tries,
                }},
            }
        );
    }
    
    const formatDate = (date) => new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date).replace(',', '');

    const endGame = async ({finishPoints, week, level, addictiveData, achieve}) => {
        const newAchieves = [];
        let totalGamePoints = 10;
        const achieveCost = 5;
        if (user[`game${week}Week`]?.[`level${level}`]?.isCompleted) return;

        if (week === CURRENT_WEEK) {
            setWeekPoints(prev => prev + finishPoints);
        }

        const endTimeMsc = getMoscowTime();

        if (achieve !== undefined) {
            newAchieves.push(achieve);
            totalGamePoints += achieveCost;
        }

        if (newAchieves.length) { 
            setNewAchieve(prev => [...prev, ...newAchieves]);
        }

        await updateUser(
            {
                [`week${week}Points`]: (user[`week${week}Points`] ?? 0) + totalGamePoints,
                [`game${week}Week`]: { ...user[`game${week}Week`], [`level${level}`]: {
                    isCompleted: true,
                    completedAt: formatDate(endTimeMsc),
                    // points: finishPoints
                }},
                //уточнить идут ли все пойнтсы в глобальные
                points: (user.points ?? 0) + totalGamePoints,
                achieves: newAchieves.length > 0 ? [...user.achieves, ...newAchieves] : user.achieves,
                ...addictiveData,
            }
        );

       await updateTotalPoints();
    }

    const updateTotalPoints = async () => {
        const data = await loadRecord();

        if (data?.scriptData.totalPoints) {
            setTotalPoints(data?.scriptData.totalPoints);
        }
    };

    const updateUser = async (changed) => {
        setUserInfo(changed);

        return patchData(changed);
    }

    const patchData = async (changed) => {
        if (!recordId.current) return;
        
        try {
            const result = await client.current.patchRecord(recordId.current, changed);

            return result;
        } catch (e) {
            console.log(e);

            return { isError: true };
        }
    }

    const registrateAchieve = async (id, week) => {
        setNewAchieve(prev => [...prev, id]);
        await updateUser({
            achieves: [...user.achieves, id], 
            //уточнить идут ли все пойнтсы в глобальные
            points: user.points + (user?.isTargeted ? 0 : 5),
            //уточнить в какую неделю идут пойнты за ачивы
            [`week${CURRENT_WEEK}Points`]: user.points + 5,
        });
    };

    const registrateUser = async (args) => {
        const data = {
            ...user,
            achieves: [],
            points: 0,
            passedWeeks: [],
            id: uid(),
            ...args,
        }

        setUser(data);

        try {
            const record = await client?.current.patchRecord(recordId.current, data);

            return record; 
        } catch (e) {
            return {isError: true}
        }
    };

    const checkEmailRegistrated = async (email) =>{
        const record = await client?.current.findRecord('email', email);

        return !!record?.id;
    };

    const state = {
        screen,
        currentScreen,
        points,
        next,
        setUserInfo,
        user,
        weekPoints,
        setWeekPoints,
        setPoints,
        passedWeeks,
        setPassedWeeks,
        endGame,
        updateUser,
        registrateUser,
        totalPoints,
        readWeekLetter,
        addDayFinding,
        isLoading,
        patchData,
        tgError,
        checkEmailRegistrated,
        registrateAchieve,
        setNewAchieve,
        newAchieve,
        dropGame,
        isJustEntered,
        setIsJustEntered,
        readLifehack,
        isShowWeekLobbyInfo,
        setIsShowWeekLobbyInfo,
        updateTotalPoints,
        tgInfo,
    }

    return (
        <ProgressContext.Provider value={state}>
            {children}
        </ProgressContext.Provider>
    )
}

export function useProgress() {
    return useContext(ProgressContext)
}
