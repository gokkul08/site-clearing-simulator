import Router from 'next/router'
import { Button, styled, Container, Typography } from '@mui/material';
import React from 'react';
import ViewModel from '../ViewModel';
import { observer } from 'mobx-react-lite';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Props {
    viewModel: ViewModel;
}

const Input = styled('input')({
    display: 'none',
  });

const SiteMapView = ({ viewModel }: Props) => {
    if (viewModel.fileInput.length > 0) {
        let rows = viewModel.formattedInput;
        console.log(viewModel.gridInput);
        if (viewModel.isUploaded) {
            return (
                <TableContainer component={Paper}>
                    <Table>
                        {/* <TableHead>
                            <TableRow>
                                {rows[0].map((element, index) => (
                                    <TableCell>{index}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead> */}
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
    // if (viewModel.isUploaded) {
    //     return (
    //         <Container>
    //             <ul>
    //             {viewModel.fileInput.map((sequence, index) => (
    //                 <Typography key={index} variant="h6">
    //                     {sequence}
    //                 </Typography>
    //             ))}
    //             </ul>
    //         </Container>
    //     )
    // }
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