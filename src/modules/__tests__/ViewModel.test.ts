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

        it('Save Simulation Button is clicked without arguments', () => {
            viewModel.handleSaveSimulation();

            expect(viewModel.simulationButtonState).toBe(true);
        });
    });
});