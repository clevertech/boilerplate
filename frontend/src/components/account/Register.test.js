import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Register } from './Register';
Enzyme.configure({ adapter: new Adapter() });

const noop = () => {};

describe('<Register />', () => {
  test('should render <Register /> without errors', () => {
    const wrapper = Enzyme.shallow(<Register location={{ search: '' }} register={noop} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the success message', () => {
    const wrapper = Enzyme.shallow(<Register location={{ search: '?ok' }} register={noop} />);
    expect(wrapper).toMatchSnapshot();
  });

  // test('should submit the form', () => {
  //   const registerUser = jest.fn();
  //   const component = mountWrap(<Register location={{ search: '' }} register={registerUser} />);
  //   component
  //     .find('input')
  //     .at(0)
  //     .simulate('change', { target: { value: 'myusername' } });
  //   component
  //     .find('input')
  //     .at(1)
  //     .simulate('change', { target: { value: 'John' } });
  //   component
  //     .find('input')
  //     .at(2)
  //     .simulate('change', { target: { value: 'Smith' } });
  //   component
  //     .find('input')
  //     .at(3)
  //     .simulate('change', { target: { value: 'user@example.com' } });
  //   component
  //     .find('input')
  //     .at(4)
  //     .simulate('change', { target: { value: 'foobarbaz' } });
  //   component
  //     .find('input')
  //     .at(5)
  //     .simulate('change', { target: { value: 'foobarbaz' } });
  //   component.find('form').simulate('submit');
  //   expect(registerUser.mock.calls).toEqual([
  //     [
  //       {
  //         email: 'user@example.com',
  //         firstName: 'John',
  //         lastName: 'Smith',
  //         password: 'foobarbaz',
  //         repassword: 'foobarbaz',
  //         username: 'myusername'
  //       }
  //     ]
  //   ]);
  // });

  // test('should prevent to submit the form if passwords do not match', () => {
  //   const registerUser = jest.fn();
  //   const component = mountWrap(<Register location={{ search: '' }} register={registerUser} />);
  //   component
  //     .find('input')
  //     .at(0)
  //     .simulate('change', { target: { value: 'myusername' } });
  //   component
  //     .find('input')
  //     .at(1)
  //     .simulate('change', { target: { value: 'John' } });
  //   component
  //     .find('input')
  //     .at(2)
  //     .simulate('change', { target: { value: 'Smith' } });
  //   component
  //     .find('input')
  //     .at(3)
  //     .simulate('change', { target: { value: 'user@example.com' } });
  //   component
  //     .find('select')
  //     .at(0)
  //     .simulate('change', { target: { value: 'ES' } });
  //   component
  //     .find('input')
  //     .at(4)
  //     .simulate('change', { target: { value: 'aaa' } });
  //   component
  //     .find('input')
  //     .at(5)
  //     .simulate('change', { target: { value: 'bbb' } });
  //   component.find('form').simulate('submit');
  //   expect(registerUser.mock.calls).toEqual([]);
  // });
});
