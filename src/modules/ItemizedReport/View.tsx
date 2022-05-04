import Router from 'next/router'
import { Table,TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import React from 'react';
import ViewModel from '../ViewModel';
import { observer } from 'mobx-react-lite';

interface Props {
    viewModel: ViewModel;
}

const ItemizedReport = ({ viewModel }: Props) => {
        const tableOutput = viewModel.formattedBill;
            return (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Activity</TableCell>
                                <TableCell>Count</TableCell>
                                <TableCell>Fuel Cost</TableCell>
                                <TableCell>Fuel Consumed</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                tableOutput.map((row) => (
                                    <TableRow
                                        key={row.name}
                                    >
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.count}</TableCell>
                                        <TableCell>{row.fuel}</TableCell>
                                        <TableCell>{row.consumed_fuel}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            );
}

export default observer(ItemizedReport);