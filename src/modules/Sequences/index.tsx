import React, { useContext } from 'react';
import View from './View';
import ViewModel from '../ViewModel';
import { observer } from 'mobx-react-lite';
import { SequencesContext } from '../contexts';

const Sequences = () => {
    const viewModel = useContext(SequencesContext) as ViewModel;
    return (
        <View viewModel = {viewModel}/>
    );
}

export default observer(Sequences);