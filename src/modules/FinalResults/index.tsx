import React, { useContext, useMemo } from 'react';
import View from './View';
import ViewModel from '../ViewModel';
import { SequencesContext } from '../contexts';

const FinalResults = (): JSX.Element => {
    const viewModel = useContext(SequencesContext) as ViewModel;

    return (
        <View viewModel={viewModel} />
    );
};

export default FinalResults;