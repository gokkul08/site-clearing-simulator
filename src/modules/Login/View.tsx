import Router from 'next/router'
import Button from '@mui/material/Button';
import React from 'react';
import ViewModel from './ViewModel';

interface Props {
    viewModel: ViewModel;
}

const LoginView = ({ viewModel }: Props) => {
    return (
        <Button 
            variant="contained"
            onClick={viewModel.handleLoginButton}
        >
            {viewModel.buttonText}
        </Button>
    );
}

export default LoginView;