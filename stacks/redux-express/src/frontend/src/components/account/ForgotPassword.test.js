import React from 'react';
import { ForgotPassword } from './ForgotPassword';

const noop = () => {};

describe('<ForgotPassword />', () => {
  test('should render <ForgotPassword /> without errors', () => {
    const wrapper = shallow(<ForgotPassword location={{ search: '' }} forgotPassword={noop} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the sent message', () => {
    const wrapper = shallow(
      <ForgotPassword location={{ search: '?sent' }} forgotPassword={noop} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
