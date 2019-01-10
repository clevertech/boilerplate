import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ResetPassword } from './ResetPassword';
Enzyme.configure({ adapter: new Adapter() });

const noop = () => {};

describe('<ResetPassword />', () => {
  test('should render <ResetPassword /> without errors', () => {
    const wrapper = Enzyme.shallow(
      <ResetPassword location={{ search: '' }} resetPassword={noop} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the reset message', () => {
    const wrapper = Enzyme.shallow(
      <ResetPassword location={{ search: '?reset' }} resetPassword={noop} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
