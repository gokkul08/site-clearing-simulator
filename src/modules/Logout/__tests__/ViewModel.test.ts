import ViewModel from '../ViewModel';
import Router from 'next/router';

jest.mock('next/router', () => ({push: jest.fn()}));

describe('src/modules/Logout/ViewModel', () => {

    describe('Logout Button Content', () => {
        const viewModel = new ViewModel();

        it('Check for Logout Button Text', () => {
            expect(viewModel.buttonText).toBe('Logout');
        })
    });

    describe('Logout Button Clicked', () => {
        const viewModel = new ViewModel();

        viewModel.handleLogoutButton();

        it('Check for Logout Button Click Event', () => {
            expect(Router.push).toHaveBeenCalledWith('/api/logout');
        })
    });

});