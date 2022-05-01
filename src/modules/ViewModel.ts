import Router from 'next/router';
import { action, makeObservable, observable } from 'mobx';

class ControlsModel {
    readonly buttonText1: string = 'Left';
    readonly buttonText2: string = 'Right';
    readonly buttonText3: string = 'Advance';
    readonly buttonText4: string = 'Quit';
    sequences: number[] = [];
    sequencesText: string[] = ['LEFT', 'RIGHT', 'ADVANCE', 'QUIT'];

    constructor() {
        makeObservable(this, {
            sequences: observable,
            handleLeftButton: action,
            handleRightButton: action,
            handleAdvanceButton: action,
            handleQuitButton: action,
        });
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
}

export default ControlsModel;