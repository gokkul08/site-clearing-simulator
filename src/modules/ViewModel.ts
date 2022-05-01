import Router from 'next/router';
import { action, makeObservable, observable } from 'mobx';
import React from 'react';

type GridInput = {
    value: string;
    direction: number;
    next: string | undefined;
    active: boolean;
    visited: boolean;
}

class ControlsModel {
    readonly buttonText1: string = 'Left';
    readonly buttonText2: string = 'Right';
    readonly buttonText3: string = 'Advance';
    readonly buttonText4: string = 'Quit';
    readonly uploadButtonText: string = 'Upload';
    sequences: number[] = [];
    sequencesText: string[] = ['LEFT', 'RIGHT', 'ADVANCE', 'QUIT'];
    isUploaded: Boolean = false;
    fileInput: string[] = [];
    gridInput: GridInput[] = [];
    constructor() {
        makeObservable(this, {
            sequences: observable,
            fileInput: observable,
            isUploaded: observable,
            gridInput: observable,
            handleLeftButton: action,
            handleRightButton: action,
            handleAdvanceButton: action,
            handleQuitButton: action,
            setUpload: action,
            setFileInput: action,
        });
    }

    setUpload = (state: Boolean): void => {
        this.isUploaded = state;
    }

    handleUploadButton = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        event.preventDefault();
        const fileReader = new FileReader()
        fileReader.onload = async (event) => {
            const text = event.target.result;
            this.setFileInput(text);
        }
        fileReader.readAsText(event.target.files[0]);
        this.setUpload(true);

    }
    
    setFileInput = (input: string | ArrayBuffer): void => {
         this.fileInput = (<string>input).split('\n');
         let formattedRowInput = this.fileInput.map((field) => {
             return field.split('');
         })
         let formattedTableOutput = [];
         formattedRowInput.forEach((row, index) => {
             let tableOutput = [];
             let mainIndex = index;
            row.forEach((element, index) => {
                let rowObj = {} as GridInput;
                rowObj.value = element;
                rowObj.direction = 2;
                rowObj.next = row[index+1];
                rowObj.active = false;
                rowObj.visited = false;
                if (mainIndex === 0 && index === 0) {
                    rowObj.active = true;
                }
                tableOutput.push(rowObj);
            });
            formattedTableOutput.push(tableOutput);
         })
         this.gridInput = formattedTableOutput;
    }
 
    handleSequencePush = (sequence: number): void => {
        this.sequences.push(sequence);
    }

    handleLeftButton = (): void => {
        this.handleSequencePush(0);
    };

    handleRightButton = (): void => {
        this.handleSequencePush(1);
    };

    handleAdvanceButton = (): void => {
        this.handleSequencePush(2);
    };

    handleQuitButton = (): void => {
        this.handleSequencePush(3);
    };

    get formattedInput(): any {
        let input = this.fileInput;
        return input.map((field) => {
            return field.split('');
        })
    }
}

export default ControlsModel;