import Router from 'next/router'
import React from 'react';
import ViewModel from './ViewModel';
import { Box, Button, styled } from '@mui/material';

interface Props {
    viewModel: ViewModel;
}

const FixedButton = styled(Button)({
    minWidth: '120px',
})

const Controls = ({ viewModel }: Props) => {
    return (
        <Box sx={{ '& button': { m: 1 }, mt: 5, }}>
            <div>
                <FixedButton variant="contained" size="large">{viewModel.buttonText1}</FixedButton>
                <FixedButton variant="contained" size="large">{viewModel.buttonText2}</FixedButton>
            </div>
            <div>
                <FixedButton variant="contained" size="large">{viewModel.buttonText3}</FixedButton>
                <FixedButton variant="contained" size="large">{viewModel.buttonText4}</FixedButton>
            </div>
    </Box>
    );
}

export default Controls;