import React from 'react';

import ViewModel from '../ViewModel';

jest.mock('next/router', () => ({ push: jest.fn() }));

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

  describe('Upload Button', () => {
    const viewModel = new ViewModel();

    it('Upload Button Text should be as described', () => {
      expect(viewModel.buttonText5).toBe('Upload');
    });

    it('Upload Button is clicked', async () => {
      const event = {
        target: {
          files: [
            {
              name: 'sitemap.txt',
              lastModified: 1651432945028,
              size: 54,
              type: 'text/plain',
            },
          ],
        },
        nativeEvent: undefined,
        currentTarget: {
          value: 'C:\\fakepath\\sitemap.txt',
        },
        bubbles: true,
        cancelable: false,
        defaultPrevented: true,
        eventPhase: 0,
        isTrusted: false,
        preventDefault: function (): void {},
        isDefaultPrevented: function (): boolean {
          throw new Error('Function not implemented.');
        },
        stopPropagation: function (): void {
          throw new Error('Function not implemented.');
        },
        isPropagationStopped: function (): boolean {
          throw new Error('Function not implemented.');
        },
        persist: function (): void {
          throw new Error('Function not implemented.');
        },
        timeStamp: 0,
        type: '',
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      Object.defineProperty(global, 'FileReader', {
        writable: true,
        value: jest.fn().mockImplementation(() => ({
          readAsDataURL: jest.fn(),
          readAsText: jest.fn(),
          onload: jest.fn(),
        })),
      });

      const text = 'ootooooooo\noooooooToo\nrrroootToo\nrrrroooooo\nrrrrrtoooo';

      await viewModel.handleUploadButton(event);
      viewModel.setFileInput(text);
      expect(viewModel.fileInputText).toBe('');
      expect(viewModel.sequences).toStrictEqual([]);
      expect(viewModel.isUploaded).toBe(true);
      expect(viewModel.simulationButtonState).toBe(true);
    });

    it('Different String Inputs Provided - Empty', () => {
      const text = '';
      viewModel.setFileInput(text);
      expect(viewModel.isUploaded).toBe(false);
      expect(viewModel.validFileInput).toBe(false);
    });

    it('Different String Inputs Provided - Invalid', () => {
      const text = 'ootoooooo\noooooooToo\nrrroootToo\nrrrroooooo\nrrrrrtoooo';
      viewModel.setFileInput(text);
      expect(viewModel.isUploaded).toBe(false);
      expect(viewModel.validFileInput).toBe(false);
    });
  });

  describe('Left Button', () => {
    const viewModel = new ViewModel();

    it('Left Button Text should be as described', () => {
      expect(viewModel.buttonText1).toBe('Left');
    });

    it('Left Button is clicked', () => {
      const text = 'ootooooooo\noooooooToo\nrrroootToo\nrrrroooooo\nrrrrrtoooo';
      viewModel.setFileInput(text);
      viewModel.handleLeftButton();

      expect(viewModel.sequences).toContain(0);

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
      const text = 'ootooooooo\noooooooToo\nrrroootToo\nrrrroooooo\nrrrrrtoooo';
      viewModel.setFileInput(text);
      viewModel.handleRightButton();

      expect(viewModel.sequences).toContain(1);

      expect(viewModel.gridInput[0][0].direction).toBe(3);

      viewModel.handleAdvanceButton();
      expect(viewModel.gridInput[0][0].direction).toBe(3);
      expect(viewModel.activeNode[0]).toBe(1);
      expect(viewModel.activeNode[1]).toBe(0);
    });
  });

  describe('Advance Button', () => {
    const viewModel = new ViewModel();

    it('Advance Button Text should be as described', () => {
      expect(viewModel.buttonText3).toBe('Advance');
    });

    it('Advance Button is clicked', () => {
      const text = 'troooooooo\noooooooToo\nrrroootToo\nrrrroooooo\nrrrrrtoooo';
      viewModel.setFileInput(text);
      viewModel.handleAdvanceButton();

      expect(viewModel.sequences).toContain(2);

      expect(viewModel.gridInput[0][0].direction).toBe(2);

      viewModel.handleAdvanceButton();
      expect(viewModel.gridInput[0][0].direction).toBe(2);
      expect(viewModel.activeNode[0]).toBe(0);
      expect(viewModel.activeNode[1]).toBe(2);
    });

    it('Advance Button is clicked with Left Turn', () => {
      const text = 'tToooooooo\noooooooToo\nrrroootToo\nrrrroooooo\nrrrrrtoooo';
      viewModel.setFileInput(text);
      viewModel.handleAdvanceButton();

      expect(viewModel.sequences).toContain(2);

      expect(viewModel.gridInput[0][0].direction).toBe(2);

      viewModel.handleAdvanceButton();
      viewModel.handleAdvanceButton();
      expect(viewModel.gridInput[0][0].direction).toBe(2);
      expect(viewModel.activeNode[0]).toBe(0);
      expect(viewModel.activeNode[1]).toBe(5);

      viewModel.handleLeftButton();
      viewModel.handleLeftButton();
      expect(viewModel.gridInput[0][0].direction).toBe(2);
      expect(viewModel.activeNode[0]).toBe(0);
      expect(viewModel.activeNode[1]).toBe(5);
    });

    it('Advance Button is clicked with Right Turn', () => {
      const text = 'TToooooooo\noooooooToo\nrrroootToo\nrrrroooooo\nrrrrrtoooo';
      viewModel.setFileInput(text);
      viewModel.handleRightButton();
      viewModel.handleRightButton();
      viewModel.handleAdvanceButton();

      expect(viewModel.sequences).toContain(1);
      expect(viewModel.sequences).toContain(2);

      expect(viewModel.gridInput[0][0].direction).toBe(2);
      expect(viewModel.activeNode[0]).toBe(0);
      expect(viewModel.activeNode[1]).toBe(4);
    });

    it('Advance Button is clicked with Different Combinations - Right', () => {
      const text = 'TToooooooo\noooooooToo\nrrroootToo\nrrrroooooo\nrrrrrtoooo';
      viewModel.setFileInput(text);
      viewModel.handleAdvanceButton();
      viewModel.handleAdvanceButton();
      viewModel.handleRightButton();
      viewModel.handleRightButton();
      viewModel.handleRightButton();
      viewModel.handleRightButton();
      viewModel.handleAdvanceButton();

      expect(viewModel.sequences).toContain(1);
      expect(viewModel.sequences).toContain(2);
      expect(viewModel.activeNode[0]).toBe(0);
      expect(viewModel.activeNode[1]).toBe(7);
      expect(viewModel.gridInput[0][7].direction).toBe(2);
    });

    it('Advance Button is clicked with Different Combinations - Left', () => {
      const text = 'rrrroooooo\noooooooToo\nrrroootToo\nrrrroooooo\nrrrrrtoooo';
      viewModel.setFileInput(text);
      viewModel.handleAdvanceButton();
      viewModel.handleLeftButton();
      viewModel.handleLeftButton();
      viewModel.handleAdvanceButton();

      expect(viewModel.sequences).toContain(0);
      expect(viewModel.sequences).toContain(2);
      expect(viewModel.activeNode[0]).toBe(0);
      expect(viewModel.activeNode[1]).toBe(7);
      expect(viewModel.gridInput[0][7].direction).toBe(0);
      viewModel.handleAdvanceButton();
      viewModel.handleRightButton();
      expect(viewModel.sequences).toContain(1);
      expect(viewModel.activeNode[0]).toBe(0);
      expect(viewModel.activeNode[1]).toBe(6);
      expect(viewModel.gridInput[0][7].direction).toBe(0);
    });

    it('Advance Button is clicked with Different Combinations - Left Directions', () => {
      const text = 'rrrroooooo\noooooooToo\nrrroootToo\nrrrroooooo\nrrrrrtoooo';
      viewModel.setFileInput(text);
      viewModel.handleAdvanceButton();
      viewModel.handleLeftButton();
      viewModel.handleLeftButton();
      viewModel.handleLeftButton();
      viewModel.handleAdvanceButton();

      expect(viewModel.sequences).toContain(0);
      expect(viewModel.sequences).toContain(2);
      expect(viewModel.activeNode[0]).toBe(1);
      expect(viewModel.activeNode[1]).toBe(7);
      expect(viewModel.gridInput[0][0].direction).toBe(2);
    });

    it('Advance Button is clicked with Different Combinations - Left Directions Down', () => {
      const text = 'rrrroooooo\noooooooToo\nrrroootToo\nrrrroooooo\nrrrrrtoooo';
      viewModel.setFileInput(text);
      viewModel.handleAdvanceButton();
      viewModel.handleLeftButton();
      viewModel.handleLeftButton();
      viewModel.handleLeftButton();
      viewModel.handleLeftButton();
      viewModel.handleAdvanceButton();

      expect(viewModel.sequences).toContain(0);
      expect(viewModel.sequences).toContain(2);
      expect(viewModel.activeNode[0]).toBe(1);
      expect(viewModel.activeNode[1]).toBe(9);
      expect(viewModel.gridInput[0][0].direction).toBe(2);
    });
  });

  describe('Bill Simulations', () => {
    const viewModel = new ViewModel();

    it('Check Bill Simulations', () => {
      const text = 'troooooooo\noooooooToo\nrrroootToo\nrrrroooooo\nrrrrrtoooo';

      viewModel.setFileInput(text);
      viewModel.handleAdvanceButton();

      expect(viewModel.sequences).toContain(2);
      expect(viewModel.simulatorOutput.tree).toBe(1);
      expect(viewModel.formattedBill).toStrictEqual([
        { consumed_fuel: 0, count: 0, fuel: 1, name: 'Plain' },
        { consumed_fuel: 0, count: 0, fuel: 2, name: 'Rocky' },
        { consumed_fuel: 2, count: 1, fuel: 2, name: 'Tree' },
        { consumed_fuel: 0, count: 0, fuel: 2, name: 'Preserved Tree' },
        { consumed_fuel: 0, count: 0, fuel: 1, name: 'Revisited Area' },
      ]);
      expect(viewModel.totalCost).toBe(2);
      expect(viewModel.totalVisitedSquares).toBe(1);
      expect(viewModel.totalSquares).toBe(50);
      expect(viewModel.totalUnclearedSquares).toBe(49);
      expect(viewModel.totalPendingCost).toBe(147);
      expect(viewModel.preservedTreeRemoved).toBe('No');
    });

    it('Check Bill Simulations - Preserved Tree', () => {
      const viewModel = new ViewModel();
      const text = 'Troooooooo\noooooooToo\nrrroootToo\nrrrroooooo\nrrrrrtoooo';

      viewModel.setFileInput(text);
      viewModel.handleAdvanceButton();

      expect(viewModel.sequences).toContain(2);
      expect(viewModel.simulatorOutput.preservedTree).toBe(1);
      expect(viewModel.formattedBill).toStrictEqual([
        { consumed_fuel: 0, count: 0, fuel: 1, name: 'Plain' },
        { consumed_fuel: 0, count: 0, fuel: 2, name: 'Rocky' },
        { consumed_fuel: 0, count: 0, fuel: 2, name: 'Tree' },
        { consumed_fuel: 2, count: 1, fuel: 2, name: 'Preserved Tree' },
        { consumed_fuel: 0, count: 0, fuel: 1, name: 'Revisited Area' },
      ]);
      expect(viewModel.totalCost).toBe(2);
      expect(viewModel.totalVisitedSquares).toBe(1);
      expect(viewModel.totalSquares).toBe(50);
      expect(viewModel.totalUnclearedSquares).toBe(49);
      expect(viewModel.totalPendingCost).toBe(147);
      expect(viewModel.preservedTreeRemoved).toBe('Yes, Check with legal team');
    });
  });

  describe('Set Sequence Simulaiton', () => {
    const viewModel = new ViewModel();

    it('Handle Set Sequences', () => {
      viewModel.setSequences('0,1,2,1');

      expect(viewModel.sequences).toStrictEqual([0, 1, 2, 1]);
    });

    it('Handle Simulator Output', () => {
      viewModel.setSimulatorOutput(0, 1, 1, 0, 0);

      expect(viewModel.simulatorOutput).toStrictEqual({
        plain: 0,
        rocky: 1,
        tree: 1,
        revisited: 0,
        preservedTree: 0,
      });
    });
  });
});
