import Router from 'next/router'
import React from 'react';
import ViewModel from '../ViewModel';
import { Box, Button, styled, Container } from '@mui/material';
import { observer } from 'mobx-react-lite';

interface Props {
    viewModel: ViewModel;
}

const FixedButton = styled(Button)({
    minWidth: '120px',
})

const Controls = ({ viewModel }: Props) => {
    return (
        <Box sx={{ '& button': { m: 1 }, mt: 2, }}>
            <div>
                <FixedButton variant="contained" size="large" onClick={viewModel.handleLeftButton} disabled={!viewModel.isUploaded}>{viewModel.buttonText1}</FixedButton>
                <FixedButton variant="contained" size="large" onClick={viewModel.handleRightButton} disabled={!viewModel.isUploaded}>{viewModel.buttonText2}</FixedButton>
            </div>
            <div>
                <FixedButton variant="contained" size="large" onClick={viewModel.handleAdvanceButton} disabled={!viewModel.isUploaded}>{viewModel.buttonText3}</FixedButton>
                <FixedButton variant="contained" size="large" onClick={() => viewModel.handleQuitButton(true)} disabled={!viewModel.isUploaded}>{viewModel.buttonText4}</FixedButton>
            </div>
    </Box>
    );
}

export default observer(Controls);