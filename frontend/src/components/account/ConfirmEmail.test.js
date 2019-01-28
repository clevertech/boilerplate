import React from 'react';
import { ConfirmEmail } from './ConfirmEmail';

describe('<ConfirmEmail />', () => {
  test('should render <ConfirmEmail /> without errors', () => {
    const wrapper = shallow(<ConfirmEmail location={{ search: '' }} confirmEmail={() => ({})} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render the success message', () => {
    const wrapper = shallow(
      <ConfirmEmail location={{ search: '?ok' }} confirmEmail={() => ({})} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
