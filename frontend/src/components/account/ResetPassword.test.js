import { shallow } from 'enzyme';
import React from 'react';
import { ResetPassword } from './ResetPassword';

const noop = () => {};

describe('<ResetPassword />', () => {
  test('should render <ResetPassword /> without errors', () => {
    const wrapper = shallow(<ResetPassword location={{ search: '' }} resetPassword={noop} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the reset message', () => {
    const wrapper = shallow(<ResetPassword location={{ search: '?reset' }} resetPassword={noop} />);
    expect(wrapper).toMatchSnapshot();
  });
});
