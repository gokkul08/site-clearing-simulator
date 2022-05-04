import React from "react";
import { Typography, Chip, Stack, styled, rgbToHex } from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  FastForward,
  Close,
} from "@mui/icons-material";

const StyledChip = styled(Chip)({
  margin: "5px",
  backgroundColor: "#a6d5f9",
});

const SequencesItem = ({ key, title }) => {
  if (title === "RIGHT")
    return <StyledChip icon={<ArrowForward />} label={title} key={key} />;
  if (title === "ADVANCE")
    return <StyledChip icon={<FastForward />} label={title} key={key} />;
  if (title === "QUIT")
    return <StyledChip icon={<Close />} label={title} key={key} />;
  return <StyledChip icon={<ArrowBack />} label={title} key={key} />;
};

export default SequencesItem;
