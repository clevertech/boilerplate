import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ConfirmEmail } from './ConfirmEmail';
Enzyme.configure({ adapter: new Adapter() });

describe('<ConfirmEmail />', () => {
  test('should render <ConfirmEmail /> without errors', () => {
    const wrapper = Enzyme.shallow(
      <ConfirmEmail location={{ search: '' }} confirmEmail={() => ({})} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the success message', () => {
    const wrapper = Enzyme.shallow(
      <ConfirmEmail location={{ search: '?ok' }} confirmEmail={() => ({})} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
