import Router from 'next/router';
import { action, computed, makeObservable, observable } from 'mobx';
import React from 'react';
import { SimulatorOutput, FormattedBill } from '../ViewModel';

class UserBoardModel {
    readonly selectText: string = 'Select Simulation';
    sequences: number[] = [];
    sequencesText: string[] = ['LEFT', 'RIGHT', 'ADVANCE', 'QUIT'];
    fileInput: string[] = [];
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
            simulatorOutput: observable,
        });
    }

}

export default UserBoardModel;