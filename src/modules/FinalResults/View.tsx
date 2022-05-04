import Router from "next/router";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React from "react";
import ViewModel from "../ViewModel";
import { observer } from "mobx-react-lite";

interface Props {
  viewModel: ViewModel;
}

const FinalResults = ({ viewModel }: Props) => {
  const {
    totalCost,
    totalPendingCost,
    totalSquares,
    totalUnclearedSquares,
    totalVisitedSquares,
    preservedTreeRemoved,
  } = viewModel;
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Total Squares</TableCell>
            <TableCell>Total Uncleared Squares</TableCell>
            <TableCell>Total Cleared Squares</TableCell>
            <TableCell>Preserved Tree Removed</TableCell>
            <TableCell>Total Incurred Charges</TableCell>
            <TableCell>Total Pending Charges</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{totalSquares}</TableCell>
            <TableCell>{totalUnclearedSquares}</TableCell>
            <TableCell>{totalVisitedSquares}</TableCell>
            <TableCell>{preservedTreeRemoved}</TableCell>
            <TableCell>{totalCost}</TableCell>
            <TableCell>{totalPendingCost}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default observer(FinalResults);
