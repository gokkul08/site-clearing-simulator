import React from 'react';
import { createContext } from 'react';

import ViewModel from '../ViewModel';

export const SequencesContext = createContext<ViewModel | undefined>(undefined);

interface SequenceProviderProps {
  value: ViewModel;
  children?: React.ReactNode;
}

export const SequencesContextProvider: React.FC<SequenceProviderProps> = ({
  children,
  value,
}) => {
  return (
    <SequencesContext.Provider value={value}>
      {children}
    </SequencesContext.Provider>
  );
};
