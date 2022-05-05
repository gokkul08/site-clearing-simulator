import Router from 'next/router';

import ViewModel from '../ViewModel';

jest.mock('next/router', () => ({ push: jest.fn() }));

describe('src/modules/Login/ViewModel', () => {
  describe('Login Button Content', () => {
    const viewModel = new ViewModel();

    it('Check for Login Button Text', () => {
      expect(viewModel.buttonText).toBe('Login/Register');
    });
  });

  describe('Login Button Clicked', () => {
    const viewModel = new ViewModel();

    viewModel.handleLoginButton();

    it('Check for Login Button Click Event', () => {
      expect(Router.push).toHaveBeenCalledWith('/api/login');
    });
  });
});
