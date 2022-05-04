import Router from 'next/router'
import { Button, styled, Container, Typography, Table, TableCell, TableBody, TableContainer, TableRow, Paper } from '@mui/material';
import React from 'react';
import ViewModel from '../ViewModel';
import { observer } from 'mobx-react-lite';

interface Props {
    viewModel: ViewModel;
}

const Input = styled('input')({
    display: 'none',
  });

const SiteMapView = ({ viewModel }: Props) => {
    if (viewModel.fileInput.length > 0) {
        if (viewModel.isUploaded) {
            return (
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {
                                viewModel.gridInput.map((row, index) => (
                                    <TableRow>
                                        {row.map((element, index) => (
                                            <TableCell
                                                sx={{ 
                                                    color: element.active ? 'red' : 'black',
                                                    background: element.visited ? 'blue' : 'white', 
                                                }}
                                            >
                                                {element.value}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }
    }
    return (
        <Container>
            <Typography>
                {viewModel.uploadMessage}
            </Typography>
            <label htmlFor="contained-button-file1">
                <Input accept=".txt" id="contained-button-file1" type="file" onChange={(e) => viewModel.handleUploadButton(e)}/>
                <Button variant="contained" component="span" sx={{ mt: 8, ml: 24, }}>
                {viewModel.buttonText5}
                </Button>
            </label>
        </Container>
    );
}

export default observer(SiteMapView);