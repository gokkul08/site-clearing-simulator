import ViewModel from '../ViewModel';
import Router from 'next/router';

jest.mock('next/router', () => ({push: jest.fn()}));

describe('src/modules/ViewModel', () => {

    describe('Quit Button', () => {
        const viewModel = new ViewModel();

        it('Quit Button Text should be as described', () => {
            expect(viewModel.buttonText4).toBe('Quit');
        });

        it('Quit Button is clicked without arguments', () => {
            viewModel.handleQuitButton();

            expect(viewModel.isUploaded).toBe(false);
            expect(viewModel.simulationButtonState).toBe(false);
            expect(viewModel.fileInput).toStrictEqual([]);
            expect(viewModel.activeNode).toStrictEqual([0, 0]);
        });

        it('Quit Button is clicked arguments', () => {
            viewModel.handleQuitButton(true);

            expect(viewModel.sequences).toContain(3);
        });
    });

    describe('Save Simulation Button', () => {
        const viewModel = new ViewModel();

        it('Save Simulation Button Text should be as described', () => {
            expect(viewModel.buttonText6).toBe('Save Simulation');
        });

        it('Save Simulation Button is clicked', () => {
            viewModel.handleSaveSimulation();

            expect(viewModel.simulationButtonState).toBe(true);
        });
    });

    describe('Left Button', () => {
        const viewModel = new ViewModel();

        it('Left Button Text should be as described', () => {
            expect(viewModel.buttonText1).toBe('Left');
        });

        it('Left Button is clicked', () => {
            const text: string = 'ootooooooo\noooooooToo\nrrroootToo\nrrrroooooo\nrrrrrtoooo';
            viewModel.setFileInput(text);
            viewModel.handleLeftButton();

            expect(viewModel.sequences).toContain(0)

            expect(viewModel.gridInput[0][0].direction).toBe(1);

            viewModel.handleAdvanceButton();
            expect(viewModel.gridInput[0][0].direction).toBe(1);
            expect(viewModel.activeNode[0]).toBe(-1);
            expect(viewModel.activeNode[1]).toBe(0);

        });
    });

    describe('Right Button', () => {
        const viewModel = new ViewModel();

        it('Right Button Text should be as described', () => {
            expect(viewModel.buttonText2).toBe('Right');
        });

        it('Right Button is clicked', () => {
            const text: string = 'ootooooooo\noooooooToo\nrrroootToo\nrrrroooooo\nrrrrrtoooo';
            viewModel.setFileInput(text);
            viewModel.handleRightButton();

            expect(viewModel.sequences).toContain(1)

            expect(viewModel.gridInput[0][0].direction).toBe(3);

            viewModel.handleAdvanceButton();
            expect(viewModel.gridInput[0][0].direction).toBe(3);
            expect(viewModel.activeNode[0]).toBe(1);
            expect(viewModel.activeNode[1]).toBe(0);

        });
    });
});