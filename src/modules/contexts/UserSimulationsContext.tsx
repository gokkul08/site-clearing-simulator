import React from 'react';
import { createContext } from 'react';

import ViewModel from '../ViewModel';

export const UserSimulationsContext = createContext<ViewModel | undefined>(undefined);

interface UserSimulationsProviderProps {
    value: ViewModel;
    children?: React.ReactNode;
}

export const UserSimulationsContextProvider: React.FC<UserSimulationsProviderProps> = ({
    children,
    value,
}) => {
    return (
        <UserSimulationsContext.Provider value={value}>
            {children}
        </UserSimulationsContext.Provider>
    );
};