jest.spyOn(global.console, 'error').mockImplementation(() => jest.fn());
jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {},
}));