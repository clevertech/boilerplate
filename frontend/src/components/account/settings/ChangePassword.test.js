import React from 'react';
import { ChangePassword } from './ChangePassword';

const noop = () => {};

describe('<ChangePassword />', () => {
  test('should render <ChangePassword /> without errors', () => {
    const wrapper = shallow(<ChangePassword location={{ search: '' }} changePassword={noop} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the success message', () => {
    const wrapper = shallow(<ChangePassword location={{ search: '?ok' }} changePassword={noop} />);
    expect(wrapper).toMatchSnapshot();
  });

  // test('should submit the form', () => {
  //   const changePassword = jest.fn();
  //   const component = Enzyme.mount(
  //     <ChangePassword location={{ search: '' }} changePassword={changePassword} />
  //   );
  //   component
  //     .find('input')
  //     .at(0)
  //     .simulate('change', { target: { value: 'oldpass' } });
  //   component
  //     .find('input')
  //     .at(1)
  //     .simulate('change', { target: { value: 'newpass' } });
  //   component.find('form').simulate('submit');
  //   expect(changePassword.mock.calls).toEqual([
  //     [{ oldPassword: 'oldpass', newPassword: 'newpass' }]
  //   ]);
  //   expect(component).toMatchSnapshot();
  // });
});
