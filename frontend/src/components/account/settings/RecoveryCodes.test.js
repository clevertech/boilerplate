import React from 'react';
import RecoveryCodes from './RecoveryCodes';

const email = 'user@example.com';

describe('<RecoveryCodes />', () => {
  test('should render <RecoveryCodes /> without errors', () => {
    const wrapper = shallow(<RecoveryCodes email={email} codes={['00000000', '11111111']} />);
    expect(wrapper).toMatchSnapshot();
  });
});
