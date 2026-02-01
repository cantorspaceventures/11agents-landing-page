'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FounderModeContextType {
    isFounderMode: boolean;
    toggleFounderMode: () => void;
}

const FounderModeContext = createContext<FounderModeContextType | undefined>(undefined);

export const FounderModeProvider = ({ children }: { children: ReactNode }) => {
    const [isFounderMode, setIsFounderMode] = useState(false);

    const toggleFounderMode = () => {
        setIsFounderMode((prev) => !prev);
    };

    return (
        <FounderModeContext.Provider value={{ isFounderMode, toggleFounderMode }}>
            <div className={isFounderMode ? 'founder-mode' : ''} data-mode={isFounderMode ? 'founder' : 'sovereign'}>
                {children}
            </div>
        </FounderModeContext.Provider>
    );
};

export const useFounderMode = () => {
    const context = useContext(FounderModeContext);
    if (context === undefined) {
        throw new Error('useFounderMode must be used within a FounderModeProvider');
    }
    return context;
};
