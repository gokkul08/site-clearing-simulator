import Router from "next/router";
import React from "react";
import ViewModel from "../ViewModel";
import Link from 'next/link';
import { Box, Button, styled, Container, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useFetchUser } from '../../core/hooks/useFetchUser';

interface Props {
  viewModel: ViewModel;
}


const Simulations = ({ viewModel }: Props) => {
  const { user } = useFetchUser();
  const id = user && user.sub.split('|')[1];
  return (
    <Box>
      <Typography>
        <Link href={`/simulations/${id}`} passHref>
         <a target="_blank" rel="noopener noreferrer">{viewModel.linkText}</a>
        </Link>
      </Typography>
    </Box>
  );
};

export default observer(Simulations);
