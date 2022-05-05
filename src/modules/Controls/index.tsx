import React, { useContext, useMemo } from 'react';

import { SequencesContext } from '../contexts';
import ViewModel from '../ViewModel';
import View from './View';

const Controls = (): JSX.Element => {
  const viewModel = useContext(SequencesContext) as ViewModel;

  return <View viewModel={viewModel} />;
};

export default Controls;
