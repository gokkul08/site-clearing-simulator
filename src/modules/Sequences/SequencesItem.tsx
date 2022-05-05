import {
  ArrowBack,
  ArrowForward,
  Close,
  FastForward,
} from '@mui/icons-material';
import { Chip, rgbToHex, Stack, styled, Typography } from '@mui/material';
import React from 'react';

const StyledChip = styled(Chip)({
  margin: '5px',
  backgroundColor: '#a6d5f9',
});

const SequencesItem = ({ key, title }) => {
  if (title === 'RIGHT')
    return <StyledChip icon={<ArrowForward />} label={title} key={key} />;
  if (title === 'ADVANCE')
    return <StyledChip icon={<FastForward />} label={title} key={key} />;
  if (title === 'QUIT')
    return <StyledChip icon={<Close />} label={title} key={key} />;
  return <StyledChip icon={<ArrowBack />} label={title} key={key} />;
};

export default SequencesItem;
