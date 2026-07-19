import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    screen: 'splash',
    activeTab: 'home',
    prevTab: 'home',
    xp: 100,
    xpMax: 300,
    level: 1,
    streak: 5,
    entries: 14,
    day: 8,
    totalDays: 14,
    mealType: 'Lunch',
    mealText: '',
    symptoms: [],
    severity: 3,
    reward: { xp: 10, clue: 'No symptoms after breakfast today' },
    fbStars: 0,
    fbLike: '',
    fbHelp: '',
    fbUse: '',
    fbSuggest: '',
    fbSent: false,
    detectiveName: 'Anna',
    // Tutorial & Guide state
    showGuide: true,
    tutorialStep: 0,
    tutorialCompleted: false,
    // Calendar state
    startDate: null,
    completedDays: [],
  });

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const go = (screen, tab) => {
    setState((prev) => ({
      ...prev,
      screen,
      activeTab: tab || prev.activeTab,
    }));
  };

  const nav = (tab) => {
    const screenMap = {
      home: 'home',
      investigate: 'log',
      case: 'casefile',
      profile: 'profile',
    };
    setState((prev) => ({
      ...prev,
      activeTab: tab,
      screen: screenMap[tab] || 'home',
    }));
  };

  const selectMealType = (type) => {
    setState((prev) => ({ ...prev, mealType: type }));
  };

  const toggleSymptom = (name) => {
    setState((prev) => {
      if (name === 'None') {
        return { ...prev, symptoms: ['None'] };
      }
      let arr = prev.symptoms.filter((x) => x !== 'None');
      arr = arr.includes(name) ? arr.filter((x) => x !== name) : [...arr, name];
      return { ...prev, symptoms: arr };
    });
  };

  const setSeverity = (n) => {
    setState((prev) => ({ ...prev, severity: n }));
  };

  const submitLog = () => {
    setState((prev) => {
      const real = prev.symptoms.filter((x) => x !== 'None');
      const noSym = real.length === 0;
      const meal = (prev.mealType || 'your meal').toLowerCase();
      const clue = noSym
        ? `No symptoms after ${meal} today`
        : `${real[0]} after ${meal}`;
      return {
        ...prev,
        screen: 'reward',
        xp: Math.min(prev.xpMax, prev.xp + 10),
        entries: prev.entries + 1,
        reward: { xp: 10, clue },
      };
    });
  };

  const continueReward = () => {
    setState((prev) => ({
      ...prev,
      screen: 'home',
      activeTab: 'home',
      mealText: '',
      symptoms: [],
      severity: 3,
    }));
  };

  const setFbStars = (n) => {
    setState((prev) => ({ ...prev, fbStars: n }));
  };

  const setFbHelp = (v) => {
    setState((prev) => ({ ...prev, fbHelp: v }));
  };

  const setFbUse = (v) => {
    setState((prev) => ({ ...prev, fbUse: v }));
  };

  const submitFeedback = () => {
    setState((prev) => ({ ...prev, fbSent: true }));
  };

  const back = () => {
    setState((prev) => {
      // Map screens to their parent/return screen
      const backMap = {
        log: 'home',
        evidence: prev.activeTab === 'case' ? 'casefile' :
                  prev.activeTab === 'profile' ? 'profile' : 'home',
        feedback: prev.activeTab === 'case' ? 'casefile' : 'profile',
        solved: 'profile',
      };

      const targetScreen = backMap[prev.screen];

      if (targetScreen) {
        return { ...prev, screen: targetScreen };
      }

      // Default: go to home
      return { ...prev, screen: 'home', activeTab: 'home' };
    });
  };

  const dismissGuide = () => {
    setState((prev) => ({ ...prev, showGuide: false }));
  };

  const nextTutorialStep = () => {
    setState((prev) => ({ ...prev, tutorialStep: prev.tutorialStep + 1 }));
  };

  const completeTutorial = () => {
    setState((prev) => ({ ...prev, tutorialCompleted: true, showGuide: false }));
  };

  const markDayComplete = (dayNumber) => {
    setState((prev) => {
      const completed = new Set(prev.completedDays);
      completed.add(dayNumber);
      return { ...prev, completedDays: Array.from(completed) };
    });
  };

  const setStartDate = (date) => {
    setState((prev) => ({ ...prev, startDate: date }));
  };

  const value = {
    state,
    updateState,
    go,
    nav,
    selectMealType,
    toggleSymptom,
    setSeverity,
    submitLog,
    continueReward,
    setFbStars,
    setFbHelp,
    setFbUse,
    submitFeedback,
    back,
    dismissGuide,
    nextTutorialStep,
    completeTutorial,
    markDayComplete,
    setStartDate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
