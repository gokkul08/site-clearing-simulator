import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';

import { SequencesContext } from '../contexts';
import ViewModel from '../ViewModel';
import View from './View';

const SiteMap = (): JSX.Element => {
  const viewModel = useContext(SequencesContext) as ViewModel;
  return <View viewModel={viewModel} />;
};

export default observer(SiteMap);
