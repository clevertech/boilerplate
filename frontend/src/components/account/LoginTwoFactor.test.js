import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { LoginTwoFactor } from './LoginTwoFactor';
Enzyme.configure({ adapter: new Adapter() });

const noop = () => {};

describe('<LoginTwoFactor />', () => {
  test('should render <LoginTwoFactor /> without errors', () => {
    const wrapper = Enzyme.shallow(
      <LoginTwoFactor twoFactor={{}} loginTwoFactor={noop} location={{}} loggedIn={false} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
