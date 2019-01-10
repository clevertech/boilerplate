import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Login } from './Login';
Enzyme.configure({ adapter: new Adapter() });

const noop = () => {};

describe('<Login />', () => {
  test('should render <Login /> without errors', () => {
    const wrapper = Enzyme.shallow(<Login login={noop} loggedIn={false} location={{}} />);
    expect(wrapper).toMatchSnapshot();
  });
});
