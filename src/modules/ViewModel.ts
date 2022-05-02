import Router from 'next/router';
import { action, makeObservable, observable } from 'mobx';
import React from 'react';

interface GridInput {
    value: string,
    direction: number,
    next: number[] | undefined,
    active: boolean,
    visited: boolean,
}

class ControlsModel {
    readonly buttonText1: string = 'Left';
    readonly buttonText2: string = 'Right';
    readonly buttonText3: string = 'Advance';
    readonly buttonText4: string = 'Quit';
    readonly buttonText5: string = 'Upload';
    readonly uploadMessage: string = 'Kindly Upload Sitemap to begin simulation';
    sequences: number[] = [];
    sequencesText: string[] = ['LEFT', 'RIGHT', 'ADVANCE', 'QUIT'];
    isUploaded: boolean = false;
    fileInput: string[] = [];
    gridInput: GridInput[] = [];
    activeNode: number[] = [0,0];
    constructor() {
        makeObservable(this, {
            sequences: observable,
            fileInput: observable,
            isUploaded: observable,
            gridInput: observable,
            activeNode: observable,
            handleLeftButton: action,
            handleRightButton: action,
            handleAdvanceButton: action,
            handleQuitButton: action,
            setUpload: action,
            setFileInput: action,
            setActiveNode: action,
            setGridValuesDirection: action,
            setGridValuesVisited: action,
            setGridValuesActive: action,
            setGridValuesNext: action,
        });
    }

    setUpload = (state: boolean): void => {
        this.isUploaded = state;
    }

    setActiveNode = (arg1: number, arg2: number): void => {
        this.activeNode = [arg1, arg2];
    }

    setGridValuesDirection = (arg: number[], direction: number): void => {
        const positionX = arg[0];
        const positionY = arg[1];
        if (positionX === -1 || positionY === -1 || positionX === this.gridInput.length) {
            this.handleQuitButton()
        }
        else {
            if (this.gridInput[positionX][positionY]) {
                this.gridInput[positionX][positionY].direction = direction;
            }
        }
    }

    setGridValuesVisited = (arg: number[], visited: boolean): void => {
        const positionX = arg[0];
        const positionY = arg[1];
        if (positionX === -1 || positionY === -1 || positionX === this.gridInput.length) {
            this.handleQuitButton()
        }
        else {
            if (this.gridInput[positionX][positionY]) {
                this.gridInput[positionX][positionY].visited = visited;
            }
        }
    }

    setGridValuesActive = (arg: number[], active: boolean): void => {
        const positionX = arg[0];
        const positionY = arg[1];
        if (positionX === -1 || positionY === -1) {
            this.handleQuitButton()
        }
        else {
            if (this.gridInput[positionX][positionY]) {
                this.gridInput[positionX][positionY].active = active;
            }
        }
    }

    setGridValuesNext = (arg: number[], next: number[]): void => {
        const positionX = arg[0];
        const positionY = arg[1];
        if (positionX === -1 || positionY === -1) {
            this.handleQuitButton()
        }
        else {
            if (this.gridInput[positionX][positionY]) {
                this.gridInput[positionX][positionY].next = next;
            }
        }
    }

    handleUploadButton = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        event.preventDefault();
        this.sequences = [];
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
            row.forEach((element, index, array) => {
                let rowObj = {} as GridInput;
                rowObj.value = element;
                rowObj.direction = 2;
                rowObj.next = [mainIndex, index+1];
                rowObj.active = false;
                rowObj.visited = false;
                if (mainIndex === 0 && index === 0) {
                    rowObj.active = true;
                }
                // if (index === array.length - 1) {
                //     rowObj.next = [];
                // }
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
        const direction = this.gridInput[this.activeNode[0]][this.activeNode[1]].direction;
        const activeDirection: number = direction - 1;
        if (activeDirection > 0) {
            this.setGridValuesDirection(this.activeNode, activeDirection);
            if (activeDirection === 1) {
                this.setGridValuesNext(this.activeNode, [this.activeNode[0] - 1, this.activeNode[1]]);
            }
            else if (activeDirection === 2) {
                this.setGridValuesNext(this.activeNode, [this.activeNode[0], this.activeNode[1] + 1]);
            }
            else if (activeDirection === 3) {
                this.setGridValuesNext(this.activeNode, [this.activeNode[0] + 1, this.activeNode[1]]);
            }
        }
        else {
            this.setGridValuesDirection(this.activeNode, 3);
            this.setGridValuesNext(this.activeNode, [this.activeNode[0], this.activeNode[1] - 1]);
        }
    };

    handleRightButton = (): void => {
        this.handleSequencePush(1);
        const direction = this.gridInput[this.activeNode[0]][this.activeNode[1]].direction;
        const activeDirection: number = direction + 1;
        if (activeDirection > 3) {
            this.setGridValuesDirection(this.activeNode, 0);
            this.setGridValuesNext(this.activeNode, [this.activeNode[0], this.activeNode[1] - 1]);
        }
        else {
            this.setGridValuesDirection(this.activeNode, activeDirection);
            if (activeDirection === 1) {
                this.setGridValuesNext(this.activeNode, [this.activeNode[0] - 1, this.activeNode[1]]);
            }
            else if (activeDirection === 2) {
                this.setGridValuesNext(this.activeNode, [this.activeNode[0], this.activeNode[1] + 1]);
            }
            else if (activeDirection === 3) {
                this.setGridValuesNext(this.activeNode, [this.activeNode[0] + 1, this.activeNode[1]]);
            }
        }
    };

    handleAdvanceButton = (): void => {
        this.handleSequencePush(2);
        if (this.gridInput[this.activeNode[0]][this.activeNode[1]]) {
            const direction = this.gridInput[this.activeNode[0]][this.activeNode[1]].direction;
            const next = this.gridInput[this.activeNode[0]][this.activeNode[1]].next;
            this.setGridValuesVisited(this.activeNode, true);
            this.setGridValuesActive(this.activeNode, false);
            if(next[0] >= this.gridInput.length) {
                this.handleQuitButton();
            }
            else {
                this.setGridValuesActive(next, true);
                if (direction === 0) {
                    this.setGridValuesNext([next[0], next[1]], [next[0], next[1] - 1]);
                }
                else if (direction === 1) {
                    this.setGridValuesNext([next[0], next[1]], [next[0] - 1, next[1]]);
                }
                else if (direction === 2) {
                    this.setGridValuesNext([next[0], next[1]], [next[0], next[1] + 1]);
                }
                else if (direction === 3) {
                    this.setGridValuesNext([next[0], next[1]], [next[0] + 1, next[1]]);
                }
                this.setGridValuesDirection([next[0], next[1]], direction);
                this.setActiveNode(next[0], next[1]);
            }
        }
        else {
            this.handleQuitButton();
        }

    };

    handleQuitButton = (fromButton?: boolean): void => {
        if (fromButton) {
            this.handleSequencePush(3);
        }
        this.setUpload(false);
        this.fileInput = [];
        this.gridInput = [];
        this.activeNode = [0,0];
    };

    get formattedInput(): any {
        let input = this.fileInput;
        return input.map((field) => {
            return field.split('');
        })
    }
}

export default ControlsModel;