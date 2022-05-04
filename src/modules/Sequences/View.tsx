import Router from "next/router";
import Button from "@mui/material/Button";
import React from "react";

import ViewModel from "../ViewModel";
import SequencesItem from "./SequencesItem";
import { observer } from "mobx-react-lite";
import { Typography, Container, Stack, styled } from "@mui/material";

interface Props {
  viewModel: ViewModel;
}

const StyledUL = styled("ul")({
  display: "flex",
  flexFlow: "wrap",
});

const SequencesView = ({ viewModel }: Props) => {
  const { sequences } = viewModel;

  if (sequences.length === 0) {
    return (
      <Container>
        <Typography>No Sequences found!</Typography>
      </Container>
    );
  }

  return (
    <Container style={{ overflow: "auto" }}>
      <Typography>Sequences</Typography>
      <StyledUL>
        {sequences.map((sequence, index) => (
          <Stack direction="row" spacing={1}>
            <SequencesItem
              key={index}
              title={viewModel.sequencesText[sequence]}
            />
          </Stack>
        ))}
      </StyledUL>
    </Container>
  );
};

export default observer(SequencesView);
