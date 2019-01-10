import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import RecoveryCodes from './RecoveryCodes';
Enzyme.configure({ adapter: new Adapter() });

const email = 'user@example.com';

describe('<RecoveryCodes />', () => {
  test('should render <RecoveryCodes /> without errors', () => {
    const wrapper = Enzyme.shallow(
      <RecoveryCodes email={email} codes={['00000000', '11111111']} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
