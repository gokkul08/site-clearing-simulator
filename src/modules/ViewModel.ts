import Router from 'next/router';
import { action, computed, makeObservable, observable } from 'mobx';
import React from 'react';

interface GridInput {
    value: string,
    direction: number,
    next: number[] | undefined,
    active: boolean,
    visited: boolean,
}

interface SimulatorOutput {
    plain: number,
    rocky: number,
    tree: number,
    preservedTree: number,
    revisited: number,
}

interface FormattedBill {
    name: string,
    count: number,
    fuel: number,
    consumed_fuel: number,
}

class ControlsModel {
    readonly buttonText1: string = 'Left';
    readonly buttonText2: string = 'Right';
    readonly buttonText3: string = 'Advance';
    readonly buttonText4: string = 'Quit';
    readonly buttonText5: string = 'Upload';
    readonly uploadMessage: string = 'Kindly Upload Sitemap to begin simulation';
    readonly defaultCostMessage: string = 'Simulation is yet to start';
    sequences: number[] = [];
    sequencesText: string[] = ['LEFT', 'RIGHT', 'ADVANCE', 'QUIT'];
    isUploaded: boolean = false;
    fileInput: string[] = [];
    gridInput: GridInput[][] = [];
    activeNode: number[] = [0,0];
    simulatorOutput: SimulatorOutput = {
        plain: 0,
        rocky: 0,
        tree: 0,
        preservedTree: 0,
        revisited: 0,
    };

    constructor() {
        makeObservable(this, {
            sequences: observable,
            fileInput: observable,
            isUploaded: observable,
            gridInput: observable,
            activeNode: observable,
            simulatorOutput: observable,
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
            setPlainCount: action,
            setRockyCount: action,
            setTreeCount: action,
            setPreservedTreeCount: action,
            setRevisitedCount: action,
            formattedBill: computed,
            totalVisitedSquares: computed,
            totalSquares: computed,
            totalUnclearedSquares: computed,
            totalCost: computed,
            totalPendingCost: computed,
            preservedTreeRemoved: computed,
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

    setPlainCount = (): void => {
        this.simulatorOutput.plain ++;
    }

    setRockyCount = (): void => {
        this.simulatorOutput.rocky ++;
    }

    setTreeCount = (): void => {
        this.simulatorOutput.tree ++;
    }

    setPreservedTreeCount = (): void => {
        this.simulatorOutput.preservedTree ++;
    }

    setRevisitedCount = (): void => {
        this.simulatorOutput.revisited ++;
    }

    handleUploadButton = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        event.preventDefault();
        this.sequences = [];
        this.simulatorOutput = {
            plain: 0,
            rocky: 0,
            tree: 0,
            preservedTree: 0,
            revisited: 0,
        };
        this.gridInput = [];
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
            const value = this.gridInput[this.activeNode[0]][this.activeNode[1]].value;
            const visited = this.gridInput[this.activeNode[0]][this.activeNode[1]].visited;

            if (visited === true) {
                this.setRevisitedCount();
            }
            this.setGridValuesVisited(this.activeNode, true);
            if (value === 'o') {
                this.setPlainCount();
            }
            else if (value === 'r') {
                this.setRockyCount();
            }
            else if (value === 't') {
                this.setTreeCount();
            }
            else if (value === 'T') {
                this.setPreservedTreeCount();
                this.handleQuitButton();
            }
            console.log(this.simulatorOutput);
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
        this.activeNode = [0,0];
    };

    get formattedInput(): any {
        let input = this.fileInput;
        return input.map((field) => {
            return field.split('');
        })
    }

    get preservedTreeRemoved(): string {
        return this.simulatorOutput.preservedTree > 0 ? 'Yes, Check with legal team' : 'No';
    }

    get totalCost(): number {
        return (this.simulatorOutput.plain * 1) + (this.simulatorOutput.rocky * 2) + (this.simulatorOutput.tree * 2) + (this.simulatorOutput.revisited * 1) + (this.simulatorOutput.preservedTree * 2);
    }

    get totalVisitedSquares(): number {
        return this.simulatorOutput.plain + this.simulatorOutput.rocky + this.simulatorOutput.tree + this.simulatorOutput.preservedTree;
    }

    get totalSquares(): number {
        if (this.gridInput[0]) {
            return this.gridInput.length * this.gridInput[0].length;
        }
        return 0;
    }

    get totalUnclearedSquares(): number {
        return this.totalSquares - this.totalVisitedSquares;
    }

    get totalPendingCost(): number {
        return this.totalUnclearedSquares * 3;
    }

    get formattedBill(): FormattedBill[] {
        return [
            {
                name: 'Plain',
                count: this.simulatorOutput.plain,
                fuel: 1,
                consumed_fuel: this.simulatorOutput.plain * 1,
            },
            {
                name: 'Rocky',
                count: this.simulatorOutput.rocky,
                fuel: 2,
                consumed_fuel: this.simulatorOutput.rocky * 2,
            },
            {
                name: 'Tree',
                count: this.simulatorOutput.tree,
                fuel: 2,
                consumed_fuel: this.simulatorOutput.tree * 2,
            },
            {
                name: 'Preserved Tree',
                count: this.simulatorOutput.preservedTree,
                fuel: 2,
                consumed_fuel: this.simulatorOutput.preservedTree * 2,
            },
            {
                name: 'Revisited Area',
                count: this.simulatorOutput.revisited,
                fuel: 1,
                consumed_fuel: this.simulatorOutput.revisited * 1,
            },
        ];
    }
}

export default ControlsModel;