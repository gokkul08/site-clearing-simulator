import Router from 'next/router';

class ControlsModel {
    readonly buttonText1: string = 'Left';
    readonly buttonText2: string = 'Right';
    readonly buttonText3: string = 'Advance';
    readonly buttonText4: string = 'Quit';

    constructor() {}

    handleLeftButton = (): void => {
        Router.push('/api/login');
    };

    handleRightButton = (): void => {
        Router.push('/api/login');
    };

    handleAdvanceButton = (): void => {
        Router.push('/api/login');
    };

    handleQuitButton = (): void => {
        Router.push('/api/login');
    };
}

export default ControlsModel;