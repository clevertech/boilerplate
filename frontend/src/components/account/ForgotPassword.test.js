import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ForgotPassword } from './ForgotPassword';
Enzyme.configure({ adapter: new Adapter() });

const noop = () => {};

describe('<ForgotPassword />', () => {
  test('should render <ForgotPassword /> without errors', () => {
    const wrapper = Enzyme.shallow(
      <ForgotPassword location={{ search: '' }} forgotPassword={noop} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the sent message', () => {
    const wrapper = Enzyme.shallow(
      <ForgotPassword location={{ search: '?sent' }} forgotPassword={noop} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
