import Button from '@mui/material/Button';
import Router from 'next/router';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const LoginView = ({ viewModel }: Props) => {
  return (
    <Button variant="contained" onClick={viewModel.handleLoginButton}>
      {viewModel.buttonText}
    </Button>
  );
};

export default LoginView;
