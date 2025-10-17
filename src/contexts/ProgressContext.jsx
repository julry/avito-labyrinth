import { createContext, useEffect, useContext, useRef, useState, useMemo } from 'react'
import { FTClient } from 'ft-client';
import WebApp from '@twa-dev/sdk';
import { uid } from 'uid';
import { SCREENS, NEXT_SCREENS } from "../constants/screens";
import { screens } from "../constants/screensComponents";
import { getUrlParam } from "../utils/getUrlParam";

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
    name: 'Test Teston',
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
    pointsTarget: 0,
    pointsUntarget: 0,
};

const getMoscowTime = (date) => {
    const dateNow = date ?? new Date();
    const localOffset = dateNow.getTimezoneOffset();
    const utcPlus3Offset = -180;
    const totalOffset = utcPlus3Offset - localOffset;
    
    return new Date(dateNow.getTime() + totalOffset * 60 * 1000);
}

const getCurrentWeek = () => {
    return 2;
    // const today = getMoscowTime();

    // if (today < getMoscowTime(new Date(2025, 8, 15))) return 0;
    // if (today < getMoscowTime(new Date(2025, 8, 22))) return 1;
    // if (today < getMoscowTime(new Date(2025, 8, 29))) return 2;
    // if (today < getMoscowTime(new Date(2025, 9, 6))) return 3;
    // if (today < getMoscowTime(new Date(2025, 9, 13))) return 4;

    // return 5;
}

export const CURRENT_WEEK = getCurrentWeek();

const INITIAL_STATE = {
    screen: SCREENS.INTROREG,
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
    const [totalPoints, setTotalPoints] = useState(INITIAL_STATE.totalPoints);
    const [user, setUser] = useState(INITIAL_STATE.user);
    const [newAchieve, setNewAchieve] = useState([]);
    const [tgError, setTgError] = useState({isError: false, message: ''});
    const screen = screens[currentScreen];
    const lastWeek = useMemo(() => Math.min((user?.passedWeeks?.length ?? 0) + 1, 4), [user?.passedWeeks]);

    const client = useRef();
    const recordId = useRef();
    const isDesktop = useRef(false);
    const tgInfo = useRef();

    const setUserBdData = (record = {}) => {
        recordId.current = record?.id;
        const { data = {}, scriptData = {}} = record ?? {};
        const points = data.isTargeted ? data.pointsTarget : data.pointsUntarget;

        setUserInfo(data);
        setTotalPoints(scriptData?.pointsTotal ?? points);
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

            const checkDay = getMoscowTime().getDay();

            if (CURRENT_WEEK > 0 && data.isTargeted && !data?.[`week${CURRENT_WEEK}EnterPoints`]?.[checkDay]) {
                await updateUser({
                    [`week${CURRENT_WEEK}Points`]: (data[`week${CURRENT_WEEK}Points`] ?? 0) + 10,
                    [`week${CURRENT_WEEK}EnterPoints`]: {
                        ...data[`week${CURRENT_WEEK}EnterPoints`], 
                        [checkDay]: 10,
                    }
                });
            }

            if (getUrlParam('screen')) {
                setCurrentScreen(getUrlParam('screen'));

                return;
            }

            if (CURRENT_WEEK > 4) {
                return;
            };

            if (!info.data.email) {
                setCurrentScreen(INITIAL_STATE.screen);
                return;
            } else if (!info.data.seenStartInfo) {
                setCurrentScreen(CURRENT_WEEK > 0 ? SCREENS.INTRO_RULES : SCREENS.WAITING);

                return;
            } else {
                setCurrentScreen(SCREENS[`LOBBY${lastWeek}`]);
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
        
        // if (window?.location?.hostname === 'localhost' || !!getUrlParam('screen')) {
        //     return client.current.findRecord('id', DEV_ID);
        // } else {
        //     console.log('webAppInitData', webAppInitData);
        // } 

        // if (
        //     WebApp?.platform?.toLowerCase()?.includes('web') || WebApp?.platform?.toLowerCase()?.includes('desktop')
        //     || webApp?.platform?.toLowerCase()?.includes('web') || webApp?.platform?.toLowerCase()?.includes('desktop')
        // ) {
        //         isDesktop.current = true;

        //         return {};
        // }
    
        // if (webAppInitData) {
        //     return client.current.getTgRecord(webAppInitData);
        // } else if (initData) {
        //     return client.current.getTgRecord(initData);
        // } else if (!window?.Telegram) {
        //     console.error('Telegram не определен')

        //     throw new Error('Telegram не определен')
        // } else if (!window?.Telegram?.WebApp) {
        //     console.error('Webapp не определен')

        //     throw new Error('Webapp не определен')
        // } else {
        //     console.error('В WebApp нет данных пользователя')

        //     throw new Error ('В WebApp нет данных пользователя');
        // }
    }

    const next = (customScreen) => {
        const nextScreen = customScreen ?? NEXT_SCREENS[currentScreen];

        if (!nextScreen) {
            return
        }

        setCurrentScreen(nextScreen);
    }

    const setUserInfo = (user) => {
        setUser(prev => ({ ...prev, ...user }));
    }

    const formatDate = (date) => new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date).replace(',', '');

    const endGame = async ({ week, level, addictiveData, achieve}) => {
        const newAchieves = [];
        const achieveCost = 5;
        const totalGamePoints = user?.isTargeted ? 10 : 0;
        if (user[`game${week}Week`]?.[level]?.isCompleted) return;

        const endTimeMsc = getMoscowTime();

        if (achieve !== undefined) {
            newAchieves.push(achieve);
        }

        if (newAchieves.length) { 
            setNewAchieve(prev => [...prev, ...newAchieves]);
        }

        const pointsName = user.isTargeted ? 'pointsTarget' : 'pointsUntarget';

        await updateUser(
            {
                [`week${week}Points`]: (user[`week${week}Points`] ?? 0) + totalGamePoints,
                [`game${week}Week`]: { ...user[`game${week}Week`], [level]: {
                    isCompleted: true,
                    completedAt: formatDate(endTimeMsc),
                }},
                [pointsName]: (user[pointsName] ?? 0) + achieveCost,
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

    const registrateAchieve = async (id) => {
        setNewAchieve(prev => [...prev, id]);
    };

    const registrateUser = async (args) => {
        const pointsName = user.isTargeted ? 'pointsTarget' : 'pointsUntarget';

        const data = {
            ...user,
            achieves: [],
            [pointsName]: (user[pointsName] ?? 0) + 10,
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
        next,
        setUserInfo,
        user,
        endGame,
        updateUser,
        registrateUser,
        totalPoints,
        isLoading,
        patchData,
        tgError,
        checkEmailRegistrated,
        registrateAchieve,
        setNewAchieve,
        newAchieve,
        updateTotalPoints,
        lastWeek,
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
