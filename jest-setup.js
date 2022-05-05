import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';

jest.spyOn(global.console, 'error').mockImplementation(() => jest.fn());
jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {},
}));

Enzyme.configure({ adapter: new Adapter() });